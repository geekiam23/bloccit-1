const express = require("express");
const router = express.Router();
const advertisementController = require("../controllers/advertisementController");


router.get("/ads", advertisementController.index);

module.exports = router;