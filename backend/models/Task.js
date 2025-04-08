const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: "Resident" },
  taskTitle: { type: String, required: true },
  dateTime: { type: Date, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
});

module.exports = mongoose.model("Task", TaskSchema);
