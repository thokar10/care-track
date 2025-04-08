const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicationSchema = new Schema({
  residentId: { type: Schema.Types.ObjectId, required: true, ref: "Resident" },
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  instructions: { type: String },
  time: { type: Date, required: true },
  status: { type: String, enum: ["pending", "given"], default: "pending" },
});

const Medication = mongoose.model("Medication", medicationSchema);
module.exports = Medication;
