"use strict";
const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");

router.get("/admin", adminController.adminPage);

module.exports = router;