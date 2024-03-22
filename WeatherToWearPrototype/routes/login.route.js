"use strict";
const express = require("express");
const router = express.Router();

const loginController = require("../controllers/login.controller");

router.get("/", loginController.loginPage);

router.post("/createUser", loginController.createUser);
router.post("/login", loginController.login);

module.exports = router; 
