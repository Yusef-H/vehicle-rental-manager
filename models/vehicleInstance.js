const mongoose = require('mongoose');

const vehicleInstanceSchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  status: { type: String, enum: ['Available', 'Rented'], default: 'Available', required: true }
});

const VehicleInstance = mongoose.model('VehicleInstance', vehicleInstanceSchema);

module.exports = VehicleInstance;
