const mongoose = require("mongoose");

const ResidentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  roomNumber: { type: String, required: true },
  medicalHistory: { type: String },
  allergies: { type: [String] },
  dietaryRestrictions: { type: [String] },
  emergencyContacts: [{ name: String, phone: String, relationship: String }],
  carePlan: { type: String },
  photo: { type: String }, // URL to uploaded photo
});

module.exports = mongoose.model("Resident", ResidentSchema);
