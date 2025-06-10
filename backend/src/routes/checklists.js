const express = require('express');
const router = express.Router();
const { 
  getTemplates, 
  getTemplate, 
  createTemplate, 
  updateTemplate,
  getEntries,
  getEntry,
  updateEntry,
  createTemplateValidation
} = require('../controllers/checklistController');
const { authenticateToken, authorizeRoles, authorizeDepartment } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/templates', getTemplates);
router.get('/templates/:id', getTemplate);
router.post('/templates', createTemplateValidation, authorizeRoles('admin', 'quality_manager', 'department_head'), createTemplate);
router.put('/templates/:id', authorizeRoles('admin', 'quality_manager', 'department_head'), updateTemplate);

router.get('/entries', getEntries);
router.get('/entries/:id', getEntry);
router.put('/entries/:id', updateEntry);

module.exports = router;