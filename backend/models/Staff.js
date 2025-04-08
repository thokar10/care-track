const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "staff", "nurse", "doctor", "care-giver", "IT", "Manager"],
    default: "nurse",
  },
  contact: { type: String, required: true },
  shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shift" }],
  certifications: [{ name: String, expiryDate: Date }],
  isVerified: {
    type: Boolean,
    default: false,
  },
  verficationCode: { type: String },
});

module.exports = mongoose.model("Staff", StaffSchema);
