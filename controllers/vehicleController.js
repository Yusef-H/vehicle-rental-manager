const Vehicle = require("../models/vehicle");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");


exports.vehicle_list = asyncHandler(async (req, res, next) => {
    const allVehicles = await Vehicle.find()
        .exec();
    
    res.render('vehicle_list', {title: 'Vehicle List', vehicle_list: allVehicles});
})

exports.specific_list = asyncHandler(async (req, res, next) => {
    console.log(req.url.substring(1));
    console.log("Hello");

    const specific = await Vehicle.find()
        .populate({
            path: 'category',
            match: { name: req.url.substring(1) }
        })
        .exec();
    
    const specificVehicles = specific.filter((vehicle) => vehicle.category !== null);
    res.render('vehicle_list', {title: `${req.url.substring(1)} List`, vehicle_list: specificVehicles});
})


exports.vehicle_details = asyncHandler(async (req, res, next) => {
    const vehicleId = req.params.id;
    const vehicle = await Vehicle.findById(vehicleId).populate("category").exec();
    if (!vehicle) {
        // Handle the case when the vehicle is not found
        return res.status(404).send("Vehicle not found");
    }

    res.render("vehicle_details", { title: "Vehicle Details", vehicle });
});


exports.create_vehicle_get = asyncHandler(async (req, res, next) => {
    try {
        // Get the list of categories from the database
        const categories = await Category.find().exec();
      
        // Render the form view with the categories
        res.render("vehicle_create", { title: "Create Vehicle", category_list: categories });
      } catch (error) {
        console.error("Error retrieving categories:", error);
        next(error);
      }
});
  

exports.create_vehicle_post = asyncHandler(async (req, res, next) => {
    // Check if a vehicle with the same type already exists
    const existingVehicle = await Vehicle.findOne({ type: req.body.type }).exec();
    if (existingVehicle) {
      // Handle the validation error
      return res.status(400).send("A vehicle with the same type already exists.");
    }
  
    // Create a new vehicle with the form data
    const newVehicle = new Vehicle({
      type: req.body.type,
      category: req.body.category,
      description: req.body.description,
      pricePerDay: req.body.pricePerDay,
    });
  
    // Save the new vehicle to the database
    const savedVehicle = await newVehicle.save();
    res.redirect("/catalog/vehicle-types");
  });
  
  
