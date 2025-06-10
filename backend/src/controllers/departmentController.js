const { Department, User } = require('../models');
const { body, validationResult } = require('express-validator');

const createDepartmentValidation = [
  body('name').trim().isLength({ min: 2 }),
  body('code').trim().isLength({ min: 2 }).isAlphanumeric(),
  body('description').optional().trim()
];

const updateDepartmentValidation = [
  body('name').optional().trim().isLength({ min: 2 }),
  body('description').optional().trim(),
  body('headUserId').optional().isInt(),
  body('isActive').optional().isBoolean()
];

const getDepartments = async (req, res) => {
  try {
    const { includeInactive = false } = req.query;
    
    const where = {};
    if (!includeInactive) {
      where.isActive = true;
    }

    const departments = await Department.findAll({
      where,
      include: [
        { model: User, as: 'head', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'users', attributes: ['id', 'name', 'role'] }
      ],
      order: [['name', 'ASC']]
    });

    res.json({ departments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDepartment = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id, {
      include: [
        { model: User, as: 'head', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'users', attributes: ['id', 'name', 'role'] }
      ]
    });

    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    res.json({ department });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDepartment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const department = await Department.create(req.body);
    res.status(201).json({ department });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Department code already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const [updated] = await Department.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Department not found' });
    }

    const department = await Department.findByPk(req.params.id, {
      include: [
        { model: User, as: 'head', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'users', attributes: ['id', 'name', 'role'] }
      ]
    });

    res.json({ department });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const deleted = await Department.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Department not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  createDepartmentValidation,
  updateDepartmentValidation
};