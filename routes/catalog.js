const express = require("express");
const router = express.Router();

// Require controller modules.
const mainController = require("../controllers/mainController");
const vehicleController = require("../controllers/vehicleController");

router.get('/', mainController.index);

router.get('/vehicle-types', vehicleController.vehicle_list);

module.exports = router;