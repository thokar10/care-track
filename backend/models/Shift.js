const mongoose = require('mongoose');

const ShiftSchema = new mongoose.Schema({
  shift :{
    type:String ,required: true
  },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

module.exports = mongoose.model('Shift', ShiftSchema);
