const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Get health trend predictions for a resident
router.get('/:residentId/health-trend', aiController.getHealthTrend);

module.exports = router;