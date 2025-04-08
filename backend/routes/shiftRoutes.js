const express = require("express");
const router = express.Router();
const shiftController = require("../controllers/shiftController");

// Get all shift
router.get("/", shiftController.getShift);

// Get  shift  by id
router.get("/getByID/:id", shiftController.getShiftById);

module.exports = router;
