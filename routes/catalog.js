const express = require("express");
const router = express.Router();

// Require controller modules.
const mainController = require("../controllers/mainController");
const vehicleController = require("../controllers/vehicleController");
const vehicleInstanceController = require("../controllers/vehicleInstanceController");
const categoryController = require("../controllers/categoryController");


router.get('/', mainController.index);

router.get('/vehicle-types', vehicleController.vehicle_list);
router.get('/vehicle-instances', vehicleInstanceController.vehicle_instance_list);
router.get('/categories', categoryController.category_list);

module.exports = router;