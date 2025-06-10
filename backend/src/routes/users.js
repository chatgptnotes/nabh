const express = require('express');
const router = express.Router();
const { 
  getUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser,
  createUserValidation,
  updateUserValidation
} = require('../controllers/userController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles('admin', 'quality_manager', 'department_head'), getUsers);
router.get('/:id', authorizeRoles('admin', 'quality_manager', 'department_head'), getUser);
router.post('/', createUserValidation, authorizeRoles('admin', 'quality_manager'), createUser);
router.put('/:id', updateUserValidation, authorizeRoles('admin', 'quality_manager'), updateUser);
router.delete('/:id', authorizeRoles('admin'), deleteUser);

module.exports = router;