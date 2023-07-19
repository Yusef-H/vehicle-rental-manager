const express = require("express");
const router = express.Router();

// Require controller modules.
const mainController = require("../controllers/mainController");

router.get('/', mainController.index);

module.exports = router;