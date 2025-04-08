const mongoose = require("mongoose");

const CareShema = new mongoose.Schema({
  residentID: { type: mongoose.Schema.Types.ObjectId, ref: "Resident" },
  carePlan: { type: String, required: true },
});

module.exports = mongoose.model("CarePlan", CareShema);
