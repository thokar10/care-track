const Staff = require("../models/Staff");
const Resident = require("../models/Resident");
const Task = require("../models/Task");

//get new stats
exports.getStats = async (req, res) => {
  // console.log(req.staff);
  const { staff_id } = req.staff;
  console.log(staff_id);
  try {
    const residentCount = await Resident.countDocuments({});
    const staffCount = await Staff.countDocuments({});
    const taskCount = await Task.countDocuments({});
    const tasks = await Task.find({}).populate("residentId");
    const residents = await Resident.find({});

    res.status(201).json({
      staffID: staff_id,
      staffCount,
      residentCount,
      taskCount,
      tasks,
      residents,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
