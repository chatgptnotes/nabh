const express = require('express');
const router = express.Router();
const { 
  getAlerts, 
  createAlert, 
  markAsRead, 
  markAllAsRead,
  createAlertValidation
} = require('../controllers/alertController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', getAlerts);
router.post('/', createAlertValidation, authorizeRoles('admin', 'quality_manager', 'department_head'), createAlert);
router.put('/:id/read', markAsRead);
router.put('/mark-all-read', markAllAsRead);

module.exports = router;