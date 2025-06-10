const { Document, Department, User } = require('../models');
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');

const createDocumentValidation = [
  body('title').trim().isLength({ min: 3 }),
  body('documentType').trim().isLength({ min: 2 }),
  body('fileUrl').isURL(),
  body('departmentId').optional().isInt(),
  body('expiryDate').optional().isDate()
];

const getDocuments = async (req, res) => {
  try {
    const { departmentId, documentType, expiring, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const where = { isCurrentVersion: true };
    if (departmentId) where.departmentId = departmentId;
    if (documentType) where.documentType = documentType;
    
    if (expiring) {
      const days = parseInt(expiring);
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + days);
      
      where.expiryDate = {
        [Op.lte]: futureDate,
        [Op.gte]: new Date()
      };
    }

    if (req.user.role === 'staff' || req.user.role === 'nurse') {
      where.departmentId = req.user.departmentId;
    } else if (req.user.role === 'department_head') {
      where.departmentId = req.user.departmentId;
    }

    const documents = await Document.findAndCountAll({
      where,
      include: [
        { model: Department, as: 'department', attributes: ['id', 'name'] },
        { model: User, as: 'uploader', attributes: ['id', 'name'] }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      documents: documents.rows,
      pagination: {
        total: documents.count,
        page: parseInt(page),
        pages: Math.ceil(documents.count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDocument = async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id, {
      include: [
        { model: Department, as: 'department', attributes: ['id', 'name'] },
        { model: User, as: 'uploader', attributes: ['id', 'name'] }
      ]
    });

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({ document });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDocument = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const documentData = {
      ...req.body,
      uploadedBy: req.user.id
    };

    const document = await Document.create(documentData);
    
    const fullDocument = await Document.findByPk(document.id, {
      include: [
        { model: Department, as: 'department', attributes: ['id', 'name'] },
        { model: User, as: 'uploader', attributes: ['id', 'name'] }
      ]
    });

    res.status(201).json({ document: fullDocument });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDocument = async (req, res) => {
  try {
    const [updated] = await Document.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const document = await Document.findByPk(req.params.id, {
      include: [
        { model: Department, as: 'department', attributes: ['id', 'name'] },
        { model: User, as: 'uploader', attributes: ['id', 'name'] }
      ]
    });

    res.json({ document });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const deleted = await Document.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExpiringDocuments = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + parseInt(days));

    const documents = await Document.findAll({
      where: {
        expiryDate: {
          [Op.lte]: futureDate,
          [Op.gte]: new Date()
        },
        isCurrentVersion: true
      },
      include: [
        { model: Department, as: 'department', attributes: ['id', 'name'] },
        { model: User, as: 'uploader', attributes: ['id', 'name'] }
      ],
      order: [['expiryDate', 'ASC']]
    });

    res.json({ documents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  getExpiringDocuments,
  createDocumentValidation
};