const VehicleInstance = require("../models/vehicleInstance");
const asyncHandler = require("express-async-handler");

exports.vehicle_instance_list = asyncHandler(async (req, res, next) => {
    const allVehicleInstances = await VehicleInstance.find()
        .populate('vehicle')
        .exec();
    
    res.render('vehicle_instance_list', {title: 'Vehicle Instance List', vehicle_instance_list: allVehicleInstances});
})