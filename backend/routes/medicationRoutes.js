const express = require("express");
const router = express.Router();
const medicationController = require("../controllers/medicationController");

router.post("/", medicationController.addMedication);
router.get("/", medicationController.getMedication);

// delete staff memmbers by id
router.delete("/:id", medicationController.deleteMedication);

module.exports = router;
