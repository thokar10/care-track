const Shift = require("../models/Shift");
const Staff = require("../models/Staff");
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");
const { SendVerificationCode } = require("../middleware/email");

// Add a new staff member
exports.addStaff = async (req, res) => {
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  console.log(verificationCode);
  const { name, email, password, role, contact, shifts, certifications } =
    req.body;
  try {
    const staff = new Staff({
      name,
      email,
      password,
      role,
      contact,
      shifts,
      certifications,
      verficationCode: verificationCode,
    });
    await staff.save();

    SendVerificationCode(staff.email, verificationCode);

    res.status(201).json({ staff, verificationCode });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all staff members
exports.getStaff = async (req, res) => {
  try {
    const staff = await Staff.find().populate("shifts");
    res.status(201).json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// check  a email is verified  by email
exports.verifyEmailStaff = async (req, res) => {
  const { emailVerificationCode } = req.body;
  try {
    if (!emailVerificationCode) {
      return res.status(404).json({ message: " code not given" });
    }
    const staff = await Staff.findOne(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const getStaffVerificationCode = staff.verificationCode;
    if (!getStaffVerificationCode) {
      return res.status(404).json({ message: "verifcation code  not found" });
    }

    if (getStaffVerificationCode !== emailVerificationCode) {
      return res
        .status(404)
        .json({ message: "verifcation code  didnt  not Match" });
    }

    staff.isVerified = true;
    staff.verificationCode = null;
    await staff.save();

    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete staff members by id
exports.deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    await Task.deleteMany({
      staffId: req.params.id,
    });

    res.status(201).json({ message: "Staff deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get staff by id
exports.getStaffByID = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).populate("shifts");

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Edit staff member by id
exports.editStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.status(200).json(staff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// login staff
exports.loginStaff = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  try {
    const staffDetails = await Staff.findOne({
      email,
    });
    if (!staffDetails) {
      return res.status(404).json({ message: "email not found" });
    }

    if (password != staffDetails.password) {
      return res.status(404).json({ message: "password didn't match" });
    }

    const payload = {
      staff_id: staffDetails._id,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET);

    console.log(accessToken);
    res.status(200).json({ staffDetails, accessToken });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
