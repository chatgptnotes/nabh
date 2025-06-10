const express = require('express');
const router = express.Router();
const { 
  getDocuments, 
  getDocument, 
  createDocument, 
  updateDocument, 
  deleteDocument,
  getExpiringDocuments,
  createDocumentValidation
} = require('../controllers/documentController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', getDocuments);
router.get('/expiring', getExpiringDocuments);
router.get('/:id', getDocument);
router.post('/', createDocumentValidation, createDocument);
router.put('/:id', authorizeRoles('admin', 'quality_manager', 'department_head'), updateDocument);
router.delete('/:id', authorizeRoles('admin', 'quality_manager', 'department_head'), deleteDocument);

module.exports = router;