const { Alert, User, Department } = require('../models');
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');

const createAlertValidation = [
  body('alertType').trim().isLength({ min: 2 }),
  body('title').trim().isLength({ min: 3 }),
  body('message').trim().isLength({ min: 5 }),
  body('priority').optional().isIn(['low', 'medium', 'high', 'critical'])
];

const getAlerts = async (req, res) => {
  try {
    const { isRead, priority, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (isRead !== undefined) where.isRead = isRead === 'true';
    if (priority) where.priority = priority;

    if (req.user.role === 'staff' || req.user.role === 'nurse') {
      where[Op.or] = [
        { targetUserId: req.user.id },
        { targetDepartmentId: req.user.departmentId }
      ];
    } else if (req.user.role === 'department_head') {
      where[Op.or] = [
        { targetUserId: req.user.id },
        { targetDepartmentId: req.user.departmentId }
      ];
    }

    const alerts = await Alert.findAndCountAll({
      where,
      include: [
        { model: User, as: 'targetUser', attributes: ['id', 'name'] },
        { model: Department, as: 'targetDepartment', attributes: ['id', 'name'] }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      alerts: alerts.rows,
      pagination: {
        total: alerts.count,
        page: parseInt(page),
        pages: Math.ceil(alerts.count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAlert = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const alert = await Alert.create(req.body);
    
    const fullAlert = await Alert.findByPk(alert.id, {
      include: [
        { model: User, as: 'targetUser', attributes: ['id', 'name'] },
        { model: Department, as: 'targetDepartment', attributes: ['id', 'name'] }
      ]
    });

    res.status(201).json({ alert: fullAlert });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const [updated] = await Alert.update(
      { isRead: true },
      { where: { id: req.params.id } }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Alert not found' });
    }

    res.json({ message: 'Alert marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    const where = { isRead: false };
    
    if (req.user.role === 'staff' || req.user.role === 'nurse') {
      where[Op.or] = [
        { targetUserId: req.user.id },
        { targetDepartmentId: req.user.departmentId }
      ];
    } else if (req.user.role === 'department_head') {
      where[Op.or] = [
        { targetUserId: req.user.id },
        { targetDepartmentId: req.user.departmentId }
      ];
    }

    const [updated] = await Alert.update(
      { isRead: true },
      { where }
    );

    res.json({ message: `${updated} alerts marked as read` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAlerts,
  createAlert,
  markAsRead,
  markAllAsRead,
  createAlertValidation
};