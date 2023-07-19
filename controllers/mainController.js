const Vehicle = require("../models/vehicle");
const Category = require("../models/category");
const VehicleInstance = require("../models/vehicleInstance");


const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  
  const [
    numVehicles,
    numVehiclesAvailable,
    numVehiclesRented,
    numCategories
  ] = await Promise.all([
    Vehicle.countDocuments({}).exec(),
    VehicleInstance.countDocuments({ status: "Available" }).exec(),
    VehicleInstance.countDocuments({ status: "Rented" }).exec(),
    Category.countDocuments().exec()
  ]);

  res.render("index", {
    title: "Car Rental Management System",
    vehicle_count: numVehicles,
    vehicle_available_count: numVehiclesAvailable,
    vehicle_rented_count: numVehiclesRented,
    category_count: numCategories
  });
});