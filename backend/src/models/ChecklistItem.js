const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChecklistItem = sequelize.define('ChecklistItem', {
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
  itemText: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'item_text'
  },
  itemOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'item_order'
  },
  isRequired: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_required'
  },
  itemType: {
    type: DataTypes.ENUM('checkbox', 'text', 'number', 'file_upload', 'signature'),
    defaultValue: 'checkbox',
    field: 'item_type'
  }
}, {
  tableName: 'checklist_items',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = ChecklistItem;