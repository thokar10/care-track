const mongoose = require('mongoose');

const HealthMetricSchema = new mongoose.Schema({
  resident: { type: mongoose.Schema.Types.ObjectId, ref: 'Resident', required: true },
  heartRate: { type: Number },
  bloodPressure: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('HealthMetric', HealthMetricSchema);