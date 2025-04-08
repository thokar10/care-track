const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// Get the dashboard stats
router.get("/", dashboardController.getStats);

module.exports = router;
