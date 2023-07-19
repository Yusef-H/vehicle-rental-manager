const Vehicle = require("../models/vehicle");
const asyncHandler = require("express-async-handler");

exports.vehicle_list = asyncHandler(async (req, res, next) => {
    const allVehicles = await Vehicle.find()
        .exec();
    
    res.render('vehicle_list', {title: 'Vehicle List', vehicle_list: allVehicles});
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