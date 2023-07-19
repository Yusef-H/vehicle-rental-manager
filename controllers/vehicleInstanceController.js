const VehicleInstance = require("../models/vehicleInstance");
const Vehicle = require("../models/vehicle");
const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');


exports.vehicle_instance_list = asyncHandler(async (req, res, next) => {
    const allVehicleInstances = await VehicleInstance.find()
        .populate('vehicle')
        .exec();
    
    res.render('vehicle_instance_list', {title: 'Vehicle Instance List', vehicle_instance_list: allVehicleInstances});
})

exports.vehicle_instance_details = asyncHandler(async (req, res, next) => {
    const vehicleInstanceId = req.params.id;
    const vehicleInstance = await VehicleInstance.findById(vehicleInstanceId).populate('vehicle').exec();
    if (!vehicleInstance) {
        // Handle the case when the vehicle is not found
        return res.status(404).send("Vehicle instance not found");
    }

    res.render("vehicle_instance_details", { title: "Vehicle Instance Details", vehicleInstance });
});



// Display vehicle instance create form on GET
exports.create_vehicle_instance_get = asyncHandler(async (req, res, next) => {
    // Retrieve all vehicles to populate the select options
    const vehicles = await Vehicle.find().exec();

    res.render('vehicle_instance_create', {
        title: 'Create Vehicle Instance',
        vehicles,
    });
});
// Handle vehicle instance create form on POST
exports.create_vehicle_instance_post = asyncHandler(async (req, res, next) => {
    try {
      const { vehicle, status } = req.body;
  
      // Create new vehicle instance
      const newVehicleInstance = new VehicleInstance({
        vehicle: new mongoose.Types.ObjectId(vehicle),
        status,
      });
  
      // Save the new vehicle instance to the database
      const savedVehicleInstance = await newVehicleInstance.save();
      res.redirect(`/catalog/vehicle-instances`);
    } catch (error) {
      next(error);
    }
  });
  