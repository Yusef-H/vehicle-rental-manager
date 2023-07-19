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

router.get("/vehicle-types/:id", vehicleController.vehicle_details);
router.get("/vehicle-instances/:id", vehicleInstanceController.vehicle_instance_details);


router.get("/Car", vehicleController.specific_list);
router.get("/Bicycle", vehicleController.specific_list);
router.get("/Scooter", vehicleController.specific_list);
router.get("/Motorbike", vehicleController.specific_list);

module.exports = router;