"use strict";
const express = require("express");
const router = express.Router();

const advertiserController = require("../controllers/advertiser.controller");

router.get("/advertiser", advertiserController.advertiserPage);

module.exports = router;
