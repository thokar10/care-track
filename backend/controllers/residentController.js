const Resident = require("../models/Resident");
const Medication = require("../models/Medication");
const Task = require("../models/Task");

// Add a new resident
exports.addResident = async (req, res) => {
  try {
    const resident = new Resident(req.body);
    await resident.save();
    res.status(201).json(resident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all residents
exports.getResidents = async (req, res) => {
  try {
    const residents = await Resident.find().populate("carePlan");
    res.status(201).json(residents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single resident by ID
exports.getResidentById = async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);
    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }
    res.json(resident);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a resident by ID
exports.deleteResident = async (req, res) => {
  console.log(req.params.id);
  try {
    await Resident.findByIdAndDelete(req.params.id);
    await Medication.deleteMany({
      residentId: req.params.id,
    });
    await Task.deleteMany({
      residentId: req.params.id,
    });

    res.status(201).json({ message: "Resident deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Edit resident member by id
exports.editResident = async (req, res) => {
  try {
    const staff = await Resident.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!staff) {
      return res.status(404).json({ message: "Resident not found" });
    }
    res.status(200).json(staff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
