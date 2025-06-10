const { Incident, Department, User } = require('../models');
const { body, validationResult } = require('express-validator');

const createIncidentValidation = [
  body('incidentType').trim().isLength({ min: 2 }),
  body('title').trim().isLength({ min: 3 }),
  body('description').trim().isLength({ min: 10 }),
  body('departmentId').isInt(),
  body('severity').optional().isIn(['low', 'medium', 'high', 'critical'])
];

const getIncidents = async (req, res) => {
  try {
    const { status, severity, departmentId, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (severity) where.severity = severity;
    if (departmentId) where.departmentId = departmentId;

    if (req.user.role === 'staff' || req.user.role === 'nurse') {
      where.departmentId = req.user.departmentId;
    } else if (req.user.role === 'department_head') {
      where.departmentId = req.user.departmentId;
    }

    const incidents = await Incident.findAndCountAll({
      where,
      include: [
        { model: Department, as: 'department', attributes: ['id', 'name'] },
        { model: User, as: 'reporter', attributes: ['id', 'name'] },
        { model: User, as: 'assignee', attributes: ['id', 'name'] }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      incidents: incidents.rows,
      pagination: {
        total: incidents.count,
        page: parseInt(page),
        pages: Math.ceil(incidents.count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIncident = async (req, res) => {
  try {
    const incident = await Incident.findByPk(req.params.id, {
      include: [
        { model: Department, as: 'department', attributes: ['id', 'name'] },
        { model: User, as: 'reporter', attributes: ['id', 'name'] },
        { model: User, as: 'assignee', attributes: ['id', 'name'] }
      ]
    });

    if (!incident) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    res.json({ incident });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createIncident = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const incidentData = {
      ...req.body,
      reportedBy: req.user.id
    };

    const incident = await Incident.create(incidentData);
    
    const fullIncident = await Incident.findByPk(incident.id, {
      include: [
        { model: Department, as: 'department', attributes: ['id', 'name'] },
        { model: User, as: 'reporter', attributes: ['id', 'name'] },
        { model: User, as: 'assignee', attributes: ['id', 'name'] }
      ]
    });

    res.status(201).json({ incident: fullIncident });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateIncident = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    if (updateData.status === 'resolved' || updateData.status === 'closed') {
      updateData.resolvedAt = new Date();
    }

    const [updated] = await Incident.update(updateData, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    const incident = await Incident.findByPk(req.params.id, {
      include: [
        { model: Department, as: 'department', attributes: ['id', 'name'] },
        { model: User, as: 'reporter', attributes: ['id', 'name'] },
        { model: User, as: 'assignee', attributes: ['id', 'name'] }
      ]
    });

    res.json({ incident });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteIncident = async (req, res) => {
  try {
    const deleted = await Incident.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getIncidents,
  getIncident,
  createIncident,
  updateIncident,
  deleteIncident,
  createIncidentValidation
};