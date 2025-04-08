const Task = require("../models/Task");

// Get all task
exports.getTask = async (req, res) => {
  try {
    const task = await Task.find().populate("staffId").populate("residentId");
    res.status(201).json(task);
  } catch (err) {
    ss;
    res.status(500).json({ message: err.message });
  }
};

// add task
exports.addTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//delete task  by id
exports.deleteTask = async (req, res) => {
  try {
    const staff = await Task.findByIdAndDelete(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(201).json({ message: "Task  deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get task details  by id
exports.getTaskById = async (req, res) => {
  try {
    const shift = await Task.findById(req.params.id);
    res.status(201).json(shift);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
