const express = require('express');
const router = express.Router();
const { login, register, getProfile, loginValidation, registerValidation } = require('../controllers/authController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.post('/login', loginValidation, login);
router.post('/register', registerValidation, authenticateToken, authorizeRoles('admin', 'quality_manager'), register);
router.get('/profile', authenticateToken, getProfile);

module.exports = router;