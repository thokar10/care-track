const express = require("express");
const router = express.Router();
const residentController = require("../controllers/residentController");

// Add a new resident
router.post("/", residentController.addResident);

// Get all residents
router.get("/", residentController.getResidents);

// Get a single resident by ID
router.get("/:id", residentController.getResidentById);

// Get a single resident by ID
router.put("/:id", residentController.editResident);

// Delete a resident by ID
router.delete("/:id", residentController.deleteResident);

module.exports = router;
