const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Alert = sequelize.define('Alert', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  alertType: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'alert_type'
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  targetUserId: {
    type: DataTypes.INTEGER,
    field: 'target_user_id'
  },
  targetDepartmentId: {
    type: DataTypes.INTEGER,
    field: 'target_department_id'
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
    defaultValue: 'medium'
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_read'
  },
  actionRequired: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'action_required'
  },
  dueDate: {
    type: DataTypes.DATE,
    field: 'due_date'
  }
}, {
  tableName: 'alerts',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Alert;