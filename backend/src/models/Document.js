const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Document = sequelize.define('Document', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  documentType: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'document_type'
  },
  fileUrl: {
    type: DataTypes.STRING(500),
    allowNull: false,
    field: 'file_url'
  },
  fileSize: {
    type: DataTypes.INTEGER,
    field: 'file_size'
  },
  mimeType: {
    type: DataTypes.STRING(100),
    field: 'mime_type'
  },
  departmentId: {
    type: DataTypes.INTEGER,
    field: 'department_id'
  },
  uploadedBy: {
    type: DataTypes.INTEGER,
    field: 'uploaded_by'
  },
  expiryDate: {
    type: DataTypes.DATEONLY,
    field: 'expiry_date'
  },
  version: {
    type: DataTypes.STRING(50),
    defaultValue: '1.0'
  },
  isCurrentVersion: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_current_version'
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.TEXT)
  }
}, {
  tableName: 'documents',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Document;