const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChecklistEntry = sequelize.define('ChecklistEntry', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  templateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'template_id'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id'
  },
  departmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'department_id'
  },
  status: {
    type: DataTypes.ENUM('pending', 'in_progress', 'completed', 'overdue'),
    defaultValue: 'pending'
  },
  completionDate: {
    type: DataTypes.DATE,
    field: 'completion_date'
  },
  dueDate: {
    type: DataTypes.DATE,
    field: 'due_date'
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'checklist_entries',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = ChecklistEntry;