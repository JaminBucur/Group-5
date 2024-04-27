"use strict";
const express = require("express");


const advertiserController = require("../controllers/advertiser.controller");

module.exports = function (imageUpload) {
    const router = express.Router();

    router.get("/advertiser", advertiserController.advertiserPage);
    
    router.post("/createAd", imageUpload.single("Image"), advertiserController.createAd);

    router.get("/getAdById/:AdID", advertiserController.getAdById);

    router.get("/getAdByIdSite/:AdID", advertiserController.getAdByIdSite);

    router.get("/getAllAds", advertiserController.getAllAds);
    
    router.post("/createDiscount", advertiserController.createDiscount);
    
    router.get("/getDiscountSales/:id", advertiserController.getDiscountSaleById);
    /*
    router.get("/getAdByActiveStatus", advertiserController.getAdByActiveStatus);

    router.get("/getAdByPendingStatus", advertiserController.getAdByPendingStatus);
    */
    return router;
}