const Medication = require("../models/Medication");

// Get all Medication
exports.getMedication = async (req, res) => {
  try {
    const task = await Medication.find().populate("residentId");
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new medication
exports.addMedication = async (req, res) => {
  const { residentId, name, dosage, instructions, time } = req.body;
  try {
    const medication = new Medication({
      residentId,
      dosage,
      instructions,
      name,
      residentId,
      time,
    });
    await Medication.insertMany(medication);
    res.status(201).json(medication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//delete medication  by id
exports.deleteMedication = async (req, res) => {
  try {
    const staff = await Medication.findByIdAndDelete(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "medication not found" });
    }
    res.status(201).json({ message: "medication deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
