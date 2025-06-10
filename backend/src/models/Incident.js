const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Incident = sequelize.define('Incident', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  incidentType: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'incident_type'
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  departmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'department_id'
  },
  reportedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'reported_by'
  },
  assignedTo: {
    type: DataTypes.INTEGER,
    field: 'assigned_to'
  },
  severity: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
    defaultValue: 'medium'
  },
  status: {
    type: DataTypes.ENUM('open', 'investigating', 'resolved', 'closed'),
    defaultValue: 'open'
  },
  evidenceFiles: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    field: 'evidence_files'
  },
  resolutionNotes: {
    type: DataTypes.TEXT,
    field: 'resolution_notes'
  },
  resolvedAt: {
    type: DataTypes.DATE,
    field: 'resolved_at'
  }
}, {
  tableName: 'incidents',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Incident;