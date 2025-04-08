const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Get all task
router.get("/get", taskController.getTask);

// Get all task
router.post("/add", taskController.addTask);

// Get  shift  by id
router.get("/getByID/:id", taskController.getTaskById);

// Get  shift  by id
router.delete("/getByID/:id", taskController.deleteTask);

module.exports = router;
