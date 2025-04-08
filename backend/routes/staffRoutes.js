const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");

// Add a new staff member
router.post("/", staffController.addStaff);

// login staff
router.post("/login", staffController.loginStaff),
  //verify staff
  router.post("/verify", staffController.verifyEmailStaff),
  // Get all staff members
  router.get("/", staffController.getStaff);

// Get  staff members by id
router.get("/:id", staffController.getStaffByID);

// edit  staff members by id
router.put("/:id", staffController.editStaff);

// delete staff memmbers by id
router.delete("/:id", staffController.deleteStaff);

module.exports = router;
