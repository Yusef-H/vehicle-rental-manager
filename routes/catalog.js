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

// GET request for creating a vehicle (display form)
router.get("/vehicle-types/create", vehicleController.create_vehicle_get);
// POST request for creating a vehicle (submit form)
router.post("/vehicle-types/create", vehicleController.create_vehicle_post);
// GET request for creating a vehicle instance (display form)
router.get(
    '/vehicle-instances/create',
    vehicleInstanceController.create_vehicle_instance_get
);
// POST request for creating a vehicle instance (submit form)
router.post(
    '/vehicle-instances/create',
    vehicleInstanceController.create_vehicle_instance_post
);
// GET request for creating a category (display form)
router.get("/categories/create", categoryController.create_category_get);
// POST request for creating a category (submit form)
router.post("/categories/create", categoryController.create_category_post);

// GET request for updating a vehicle (display form)
router.get("/vehicle-types/:id/update", vehicleController.update_vehicle_get);
// POST request for updating a vehicle (submit form)
router.post("/vehicle-types/:id/update", vehicleController.update_vehicle_post);

// GET request for updating a vehicle instance (display form)
router.get("/vehicle-instances/:id/update", vehicleInstanceController.update_vehicle_instance_get);
// POST request for updating a vehicle instance (submit form)
router.post("/vehicle-instances/:id/update", vehicleInstanceController.update_vehicle_instance_post);

// DELETE request for deleting a vehicle
router.delete("/vehicle-types/:id/delete", vehicleController.delete_vehicle);

// DELETE request for deleting a vehicle instance
router.delete("/vehicle-instances/:id/delete", vehicleInstanceController.delete_vehicle_instance);


/* Display a specific vehicle or vehicle instance details */ 
router.get("/vehicle-types/:id", vehicleController.vehicle_details);
router.get("/vehicle-instances/:id", vehicleInstanceController.vehicle_instance_details);

/* Display a specific vehicle category list view */ 
router.get("/Car", vehicleController.specific_list);
router.get("/Bicycle", vehicleController.specific_list);
router.get("/Scooter", vehicleController.specific_list);
router.get("/Motorbike", vehicleController.specific_list);



module.exports = router;