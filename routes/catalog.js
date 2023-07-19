const express = require("express");
const router = express.Router();

// Require controller modules.
const vehicleController = require("../controllers/vehicleController");

router.get('/', vehicleController.index);

module.exports = router;