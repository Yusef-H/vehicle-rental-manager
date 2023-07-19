const Vehicle = require("../models/vehicle");
const Category = require("../models/category");
const VehicleInstance = require("../models/vehicleInstance");


const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  
  const [
    numVehicles,
    numVehicleInstances,
    numCategories
  ] = await Promise.all([
    Vehicle.countDocuments({}).exec(),
    VehicleInstance.countDocuments({ status: "Available" }).exec(),
    Category.countDocuments().exec()
  ]);

  res.render("index", {
    title: "Car Rental Management System",
    vehicle_count: numVehicles,
    vehicle_instance_count: numVehicleInstances ,
    category_count: numCategories
  });
});