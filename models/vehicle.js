const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  type: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String },
  pricePerDay: { type: Number, required: true, min: 0 }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
