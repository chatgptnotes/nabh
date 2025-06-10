const express = require('express');
const router = express.Router();
const { 
  getIncidents, 
  getIncident, 
  createIncident, 
  updateIncident, 
  deleteIncident,
  createIncidentValidation
} = require('../controllers/incidentController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', getIncidents);
router.get('/:id', getIncident);
router.post('/', createIncidentValidation, createIncident);
router.put('/:id', updateIncident);
router.delete('/:id', authorizeRoles('admin', 'quality_manager'), deleteIncident);

module.exports = router;