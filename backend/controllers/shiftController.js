const Shift = require("../models/Shift");

// Get shift details
exports.getShift = async (req, res) => {
  try {
    const shift = await Shift.find();
    res.status(201).json(shift);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get shift details  by id
exports.getShiftById = async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id);
    res.status(201).json(shift);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
