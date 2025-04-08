const CarePlan = require("../models/CarePlan");

// Add a new care plan
exports.addCarePlan = async (req, res) => {
  const { residentID, carePlan } = req.body;

  try {
    const care = {
      residentID,
      carePlan,
    };
    await CarePlan.insertMany(care);
    res.status(201).json(care);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get careplan details  by id
exports.getCarePlanById = async (req, res) => {
  try {
    const carePlan = await CarePlan.findById(req.params.id).populate(
      "residentID"
    );
    res.status(201).json(carePlan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get careplan details  by id
exports.getCarePlan = async (req, res) => {
  try {
    const carePlan = await CarePlan.find().populate("residentID");
    res.status(201).json(carePlan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete careplan  by id
exports.deleteCarePlanByID = async (req, res) => {
  try {
    const staff = await CarePlan.findByIdAndDelete(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Care Plan not found" });
    }
    res.status(201).json({ message: "Care Plan deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
