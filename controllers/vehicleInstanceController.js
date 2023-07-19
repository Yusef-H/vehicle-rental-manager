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


exports.update_vehicle_instance_get = asyncHandler(async (req, res, next) => {
  const vehicleInstanceId = req.params.id;

  // Get the vehicle instance from the database
  const vehicleInstance = await VehicleInstance.findById(vehicleInstanceId).exec();

  if (!vehicleInstance) {
    // Handle the case when the vehicle instance is not found
    return res.status(404).send("Vehicle instance not found");
  }

  // Render the vehicle instance update form with the vehicle instance data
  res.render("vehicle_instance_update", { title: "Update Vehicle Instance", vehicleInstance });
});

exports.update_vehicle_instance_post = asyncHandler(async (req, res, next) => {
  const vehicleInstanceId = req.params.id;

  // Get the vehicle instance from the database
  const vehicleInstance = await VehicleInstance.findById(vehicleInstanceId).exec();

  if (!vehicleInstance) {
    // Handle the case when the vehicle instance is not found
    return res.status(404).send("Vehicle instance not found");
  }

  // Update the vehicle instance with the form data
  vehicleInstance.status = req.body.status;

  // Save the updated vehicle instance to the database
  const savedVehicleInstance = await vehicleInstance.save();
  res.redirect(`/catalog/vehicle-instances/${vehicleInstanceId}`);
});


exports.delete_vehicle_instance = asyncHandler(async (req, res, next) => {
  const vehicleInstanceId = req.params.id;

  // Find the vehicle instance by its ID and remove it
  await VehicleInstance.findByIdAndRemove(vehicleInstanceId).exec();

  // Redirect to the vehicle instance list page after successful deletion
  res.redirect("/catalog/vehicle-instances");
});


  
  