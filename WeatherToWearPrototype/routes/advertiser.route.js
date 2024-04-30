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

    // creating function for /createDiscount where it handles the case if the user does not change the image
    router.post("/createDiscount", upload.single("Image"), (req,res) => {
        let newImage = req.file;
        let adId = req.body.adId;
    
        if (newImage) {
            // new image is provided
            let sql = 'UPDATE Advertisement SET Image = ? WHERE AdID = ?';
            let params = [newImage.filename, adId];
    
            db.run(sql, params, function(err){
                if (err) {
                    console.error(err);
                    res.status(500).send({ message: 'Failed to update ad.' });
                } else {
                    res.status(200).send({ message: 'Ad updated successfully.' });
                }
            });
        } else {
            // no new image was provided, should keep old image
            let sql = 'UPDATE Advertisement SET ClothingName = ?, HeatIndex = ?, Price = ? WHERE AdID = ?';
            let params = [req.body.ClothingName, req.body.HeatIndex, req.body.Price, adId];
    
            db.run(sql, params, function(err){
                if (err) {
                    console.error(err);
                    res.status(500).send({ message: 'Failed to update ad.' });
                } else {
                    res.status(200).send({ message: 'Ad updated successfully.' });
                }
            });
        }
    });
    
    router.get("/getDiscountSales/:id", advertiserController.getDiscountSaleById);
    /*
    router.get("/getAdByActiveStatus", advertiserController.getAdByActiveStatus);

    router.get("/getAdByPendingStatus", advertiserController.getAdByPendingStatus);
    */
    return router;
}