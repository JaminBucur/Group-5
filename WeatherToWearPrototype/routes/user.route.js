"use strict";
const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/closet", userController.closetPage);
router.get("/autoFit", userController.autoFitPage);
router.get("/forSale", userController.forSalePage);
router.get("/itemDisplay", userController.itemDisplayPage);


router.post("/createCloset", userController.createCloset);
router.post("/addClothing", userController.addClothing);
router.post("/displayClothing", userController.clothingInCloset);
router.post("/deleteClothing", userController.deleteClothing);
router.post("/deleteCloset", userController.deleteCloset);





module.exports = router;