const { ChecklistEntry, Document, Alert, Incident, Department, User } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

const getDashboardStats = async (req, res) => {
  try {
    const { departmentId } = req.query;
    
    let whereClause = {};
    if (req.user.role === 'department_head' || req.user.role === 'staff' || req.user.role === 'nurse') {
      whereClause.department_id = req.user.department_id;
    } else if (departmentId) {
      whereClause.department_id = departmentId;
    }

    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      pendingChecklists,
      overdueChecklists,
      completedThisMonth,
      expiringDocuments,
      unreadAlerts,
      openIncidents,
      complianceRate
    ] = await Promise.all([
      ChecklistEntry.count({
        where: { ...whereClause, status: 'pending' }
      }),
      ChecklistEntry.count({
        where: { ...whereClause, status: 'overdue' }
      }),
      ChecklistEntry.count({
        where: {
          ...whereClause,
          status: 'completed',
          completion_date: { [Op.gte]: thirtyDaysAgo }
        }
      }),
      Document.count({
        where: {
          ...whereClause,
          expiry_date: {
            [Op.lte]: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000),
            [Op.gte]: today
          }
        }
      }),
      Alert.count({
        where: req.user.role === 'admin' || req.user.role === 'quality_manager' 
          ? { is_read: false }
          : {
              is_read: false,
              [Op.or]: [
                { target_user_id: req.user.id },
                { target_department_id: req.user.department_id }
              ]
            }
      }),
      Incident.count({
        where: { ...whereClause, status: { [Op.in]: ['open', 'investigating'] } }
      }),
      ChecklistEntry.findOne({
        attributes: [
          [
            sequelize.literal(`
              CASE 
                WHEN COUNT(*) = 0 THEN 0 
                ELSE ROUND((COUNT(CASE WHEN status = 'completed' THEN 1 END) * 100.0 / COUNT(*)), 2)
              END
            `),
            'rate'
          ]
        ],
        where: {
          ...whereClause,
          created_at: { [Op.gte]: thirtyDaysAgo }
        },
        raw: true
      })
    ]);

    const departmentStats = await Department.findAll({
      attributes: [
        'id',
        'name',
        [
          sequelize.literal(`(
            SELECT COUNT(*) FROM checklist_entries 
            WHERE department_id = "Department"."id" AND status = 'pending'
          )`),
          'pendingTasks'
        ],
        [
          sequelize.literal(`(
            SELECT COUNT(*) FROM checklist_entries 
            WHERE department_id = "Department"."id" AND status = 'overdue'
          )`),
          'overdueTasks'
        ]
      ],
      where: req.user.role === 'department_head' ? { id: req.user.department_id } : {},
      order: [['name', 'ASC']]
    });

    res.json({
      stats: {
        pendingChecklists,
        overdueChecklists,
        completedThisMonth,
        expiringDocuments,
        unreadAlerts,
        openIncidents,
        complianceRate: parseFloat(complianceRate?.rate || 0)
      },
      departmentStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecentActivity = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    let whereClause = {};
    if (req.user.role === 'department_head' || req.user.role === 'staff' || req.user.role === 'nurse') {
      whereClause.department_id = req.user.department_id;
    }

    const [recentEntries, recentIncidents] = await Promise.all([
      ChecklistEntry.findAll({
        where: { ...whereClause, status: 'completed' },
        include: [
          { model: User, as: 'user', attributes: ['name'] },
          { model: Department, as: 'department', attributes: ['name'] }
        ],
        limit: parseInt(limit) / 2,
        order: [['completion_date', 'DESC']]
      }),
      Incident.findAll({
        where: whereClause,
        include: [
          { model: User, as: 'reporter', attributes: ['name'] },
          { model: Department, as: 'department', attributes: ['name'] }
        ],
        limit: parseInt(limit) / 2,
        order: [['created_at', 'DESC']]
      })
    ]);

    const activity = [
      ...recentEntries.map(entry => ({
        type: 'checklist_completed',
        title: `Checklist completed`,
        user: entry.user.name,
        department: entry.department.name,
        timestamp: entry.completion_date
      })),
      ...recentIncidents.map(incident => ({
        type: 'incident_reported',
        title: incident.title,
        user: incident.reporter.name,
        department: incident.department.name,
        timestamp: incident.created_at,
        severity: incident.severity
      }))
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
     .slice(0, parseInt(limit));

    res.json({ activity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getRecentActivity
};