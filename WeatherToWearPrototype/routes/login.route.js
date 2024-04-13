// routes/login.route.js

"use strict";
const express = require("express");
const router = express.Router();

const loginController = require("../controllers/login.controller");

router.get("/home", loginController.loginPage);
router.get("/logout", loginController.logout);
router.get("/banned", loginController.bannedPage);

router.post("/login", loginController.login);

module.exports = router; 
