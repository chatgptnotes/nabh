const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChecklistResponse = sequelize.define('ChecklistResponse', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  entryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'entry_id'
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'item_id'
  },
  responseValue: {
    type: DataTypes.TEXT,
    field: 'response_value'
  },
  fileUrl: {
    type: DataTypes.STRING(500),
    field: 'file_url'
  },
  completedBy: {
    type: DataTypes.INTEGER,
    field: 'completed_by'
  },
  completedAt: {
    type: DataTypes.DATE,
    field: 'completed_at'
  }
}, {
  tableName: 'checklist_responses',
  underscored: true,
  timestamps: false
});

module.exports = ChecklistResponse;