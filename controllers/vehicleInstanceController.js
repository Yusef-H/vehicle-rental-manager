const VehicleInstance = require("../models/vehicleInstance");
const asyncHandler = require("express-async-handler");

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