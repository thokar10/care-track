const tf = require('@tensorflow/tfjs');
const HealthMetric = require('../models/HealthMetric');

// Predict health trends using TensorFlow.js
const predictHealthTrend = async (healthMetrics) => {
  const model = await tf.loadLayersModel('file://path/to/your/model.json');

  const input = tf.tensor2d(healthMetrics.map(metric => [metric.heartRate, metric.bloodPressure]));
  const prediction = model.predict(input);

  return prediction.dataSync();
};

// Get health trend predictions for a resident
exports.getHealthTrend = async (req, res) => {
  const { residentId } = req.params;
  try {
    const healthMetrics = await HealthMetric.find({ resident: residentId });
    const trend = await predictHealthTrend(healthMetrics);
    res.json({ trend });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};