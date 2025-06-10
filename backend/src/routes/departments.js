const express = require('express');
const router = express.Router();
const { 
  getDepartments, 
  getDepartment, 
  createDepartment, 
  updateDepartment, 
  deleteDepartment,
  createDepartmentValidation,
  updateDepartmentValidation
} = require('../controllers/departmentController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', getDepartments);
router.get('/:id', getDepartment);
router.post('/', createDepartmentValidation, authorizeRoles('admin', 'quality_manager'), createDepartment);
router.put('/:id', updateDepartmentValidation, authorizeRoles('admin', 'quality_manager'), updateDepartment);
router.delete('/:id', authorizeRoles('admin'), deleteDepartment);

module.exports = router;