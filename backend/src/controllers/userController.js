const { User, Department } = require('../models');
const { body, validationResult } = require('express-validator');
const AuthService = require('../services/authService');

const createUserValidation = [
  body('email').isEmail().normalizeEmail(),
  body('name').trim().isLength({ min: 2 }),
  body('role').isIn(['admin', 'quality_manager', 'department_head', 'staff', 'nurse']),
  body('password').isLength({ min: 6 })
];

const updateUserValidation = [
  body('name').optional().trim().isLength({ min: 2 }),
  body('role').optional().isIn(['admin', 'quality_manager', 'department_head', 'staff', 'nurse']),
  body('isActive').optional().isBoolean()
];

const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, department, role } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (department) where.departmentId = department;
    if (role) where.role = role;

    const users = await User.findAndCountAll({
      where,
      include: ['department'],
      attributes: { exclude: ['password'] },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['name', 'ASC']]
    });

    res.json({
      users: users.rows,
      pagination: {
        total: users.count,
        page: parseInt(page),
        pages: Math.ceil(users.count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: ['department'],
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await AuthService.createUser(req.body);
    res.status(201).json({ user });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const [updated] = await User.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = await User.findByPk(req.params.id, {
      include: ['department'],
      attributes: { exclude: ['password'] }
    });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  createUserValidation,
  updateUserValidation
};