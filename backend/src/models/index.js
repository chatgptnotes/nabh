const User = require('./User');
const Department = require('./Department');
const ChecklistTemplate = require('./ChecklistTemplate');
const ChecklistItem = require('./ChecklistItem');
const ChecklistEntry = require('./ChecklistEntry');
const ChecklistResponse = require('./ChecklistResponse');
const Document = require('./Document');
const Alert = require('./Alert');
const Incident = require('./Incident');

User.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });
Department.hasMany(User, { foreignKey: 'departmentId', as: 'users' });

Department.belongsTo(User, { foreignKey: 'headUserId', as: 'head' });

ChecklistTemplate.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });
ChecklistTemplate.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });
Department.hasMany(ChecklistTemplate, { foreignKey: 'departmentId', as: 'templates' });

ChecklistItem.belongsTo(ChecklistTemplate, { foreignKey: 'templateId', as: 'template' });
ChecklistTemplate.hasMany(ChecklistItem, { foreignKey: 'templateId', as: 'items' });

ChecklistEntry.belongsTo(ChecklistTemplate, { foreignKey: 'templateId', as: 'template' });
ChecklistEntry.belongsTo(User, { foreignKey: 'userId', as: 'user' });
ChecklistEntry.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });

ChecklistResponse.belongsTo(ChecklistEntry, { foreignKey: 'entryId', as: 'entry' });
ChecklistResponse.belongsTo(ChecklistItem, { foreignKey: 'itemId', as: 'item' });
ChecklistResponse.belongsTo(User, { foreignKey: 'completedBy', as: 'completedByUser' });
ChecklistEntry.hasMany(ChecklistResponse, { foreignKey: 'entryId', as: 'responses' });

Document.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });
Document.belongsTo(User, { foreignKey: 'uploadedBy', as: 'uploader' });
Department.hasMany(Document, { foreignKey: 'departmentId', as: 'documents' });

Alert.belongsTo(User, { foreignKey: 'targetUserId', as: 'targetUser' });
Alert.belongsTo(Department, { foreignKey: 'targetDepartmentId', as: 'targetDepartment' });

Incident.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });
Incident.belongsTo(User, { foreignKey: 'reportedBy', as: 'reporter' });
Incident.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignee' });

module.exports = {
  User,
  Department,
  ChecklistTemplate,
  ChecklistItem,
  ChecklistEntry,
  ChecklistResponse,
  Document,
  Alert,
  Incident
};