const { ChecklistTemplate, ChecklistItem, ChecklistEntry, ChecklistResponse, Department, User } = require('../models');
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');

const createTemplateValidation = [
  body('title').trim().isLength({ min: 3 }),
  body('frequency').isIn(['daily', 'weekly', 'monthly', 'quarterly', 'annually']),
  body('departmentId').isInt(),
  body('items').isArray({ min: 1 }),
  body('items.*.itemText').trim().isLength({ min: 3 }),
  body('items.*.itemType').optional().isIn(['checkbox', 'text', 'number', 'file_upload', 'signature'])
];

const getTemplates = async (req, res) => {
  try {
    const { departmentId, frequency, isActive } = req.query;
    
    const where = {};
    if (departmentId) where.departmentId = departmentId;
    if (frequency) where.frequency = frequency;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const templates = await ChecklistTemplate.findAll({
      where,
      include: [
        { model: Department, as: 'department', attributes: ['id', 'name', 'code'] },
        { model: ChecklistItem, as: 'items', order: [['itemOrder', 'ASC']] },
        { model: User, as: 'creator', attributes: ['id', 'name'] }
      ],
      order: [['title', 'ASC']]
    });

    res.json({ templates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTemplate = async (req, res) => {
  try {
    const template = await ChecklistTemplate.findByPk(req.params.id, {
      include: [
        { model: Department, as: 'department', attributes: ['id', 'name', 'code'] },
        { model: ChecklistItem, as: 'items', order: [['itemOrder', 'ASC']] },
        { model: User, as: 'creator', attributes: ['id', 'name'] }
      ]
    });

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    res.json({ template });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTemplate = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { items, ...templateData } = req.body;
    templateData.createdBy = req.user.id;

    const template = await ChecklistTemplate.create(templateData);

    const checklistItems = items.map((item, index) => ({
      ...item,
      templateId: template.id,
      itemOrder: index + 1
    }));

    await ChecklistItem.bulkCreate(checklistItems);

    const fullTemplate = await ChecklistTemplate.findByPk(template.id, {
      include: [
        { model: Department, as: 'department', attributes: ['id', 'name', 'code'] },
        { model: ChecklistItem, as: 'items', order: [['itemOrder', 'ASC']] }
      ]
    });

    res.status(201).json({ template: fullTemplate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTemplate = async (req, res) => {
  try {
    const { items, ...templateData } = req.body;

    const [updated] = await ChecklistTemplate.update(templateData, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Template not found' });
    }

    if (items) {
      await ChecklistItem.destroy({ where: { templateId: req.params.id } });
      
      const checklistItems = items.map((item, index) => ({
        ...item,
        templateId: req.params.id,
        itemOrder: index + 1
      }));

      await ChecklistItem.bulkCreate(checklistItems);
    }

    const template = await ChecklistTemplate.findByPk(req.params.id, {
      include: [
        { model: Department, as: 'department', attributes: ['id', 'name', 'code'] },
        { model: ChecklistItem, as: 'items', order: [['itemOrder', 'ASC']] }
      ]
    });

    res.json({ template });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEntries = async (req, res) => {
  try {
    const { status, departmentId, userId, dueDate } = req.query;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (departmentId) where.departmentId = departmentId;
    if (userId) where.userId = userId;
    if (dueDate) {
      where.dueDate = {
        [Op.lte]: new Date(dueDate)
      };
    }

    if (req.user.role === 'staff' || req.user.role === 'nurse') {
      where.userId = req.user.id;
    } else if (req.user.role === 'department_head') {
      where.departmentId = req.user.departmentId;
    }

    const entries = await ChecklistEntry.findAndCountAll({
      where,
      include: [
        { model: ChecklistTemplate, as: 'template', attributes: ['id', 'title', 'frequency'] },
        { model: User, as: 'user', attributes: ['id', 'name'] },
        { model: Department, as: 'department', attributes: ['id', 'name'] }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['dueDate', 'ASC']]
    });

    res.json({
      entries: entries.rows,
      pagination: {
        total: entries.count,
        page: parseInt(page),
        pages: Math.ceil(entries.count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEntry = async (req, res) => {
  try {
    const entry = await ChecklistEntry.findByPk(req.params.id, {
      include: [
        { 
          model: ChecklistTemplate, 
          as: 'template',
          include: [{ model: ChecklistItem, as: 'items', order: [['itemOrder', 'ASC']] }]
        },
        { 
          model: ChecklistResponse, 
          as: 'responses',
          include: [{ model: User, as: 'completedByUser', attributes: ['id', 'name'] }]
        },
        { model: User, as: 'user', attributes: ['id', 'name'] },
        { model: Department, as: 'department', attributes: ['id', 'name'] }
      ]
    });

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    if (req.user.role === 'staff' || req.user.role === 'nurse') {
      if (entry.userId !== req.user.id) {
        return res.status(403).json({ error: 'Access denied' });
      }
    }

    res.json({ entry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEntry = async (req, res) => {
  try {
    const { responses, ...entryData } = req.body;

    const [updated] = await ChecklistEntry.update(entryData, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    if (responses && Array.isArray(responses)) {
      for (const response of responses) {
        await ChecklistResponse.upsert({
          ...response,
          entryId: req.params.id,
          completedBy: req.user.id,
          completedAt: new Date()
        });
      }
    }

    const entry = await ChecklistEntry.findByPk(req.params.id, {
      include: [
        { 
          model: ChecklistTemplate, 
          as: 'template',
          include: [{ model: ChecklistItem, as: 'items', order: [['itemOrder', 'ASC']] }]
        },
        { model: ChecklistResponse, as: 'responses' }
      ]
    });

    res.json({ entry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  getEntries,
  getEntry,
  updateEntry,
  createTemplateValidation
};