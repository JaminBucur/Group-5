"use strict";

const express = require("express");
const app = express();
const path = require('path');
const multer = require("multer");
const fs = require('fs');
app.use(multer().single('file'));
// app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/advertiser.model");


function advertiserPage(req, res) {
    Promise.all([model.getAdByPendingStatus(), model.getAdByActiveStatus()])
        .then(([pendingAds, activeAds]) => {
            res.render('advertiser', { pendingAds: pendingAds, activeAds: activeAds, session: req.session });
        })
        .catch((err) => {
            console.error("Error while rendering advertiser page ", err.message);
        });
}

/*
function createAd(req, res) {
    try {
        // console.log(req.body);
        const Username = req.session.Username;
        let Image = null;
        const Description = req.body.Description;
        const image = req.file;

        if (image) {
            const imageName = image.originalname;
            const imagePath = path.join(__dirname, '..', image.path);
            const imageData = fs.readFileSync(imagePath);
            const newImagePath = path.join(__dirname, '..', 'images', imageName);
            fs.writeFileSync(newImagePath, imageData);
            Image = imageName;
        }
        
        
        model.createAd(Username, Image, Description)
        res.redirect("/advertiser");
    } catch (err) {
        console.error("Error while creating ad ", err.message);
        // next(err);
    }
}
*/
function createAd(req, res) {
    const adData = {
        Image: req.file.filename,
        ClothingName: req.body.ClothingName,
        HeatIndex: req.body.HeatIndex,
        Price: req.body.Price,
        Description: req.body.Description,
        Username: req.session.Username
    };

    model.createAd(adData)
        .then(() => {
            /** Supposed to refreshes page */
            
            res.redirect("/advertiser");
            
        })
        .catch((err) => {
            console.error("Error while creating ad ", err.message);
        });
}

function getAdById(req, res) {
    try {
        const AdID = req.params.AdID;
        model.getAdById(AdID)
        .then((ad) => {
            res.send(ad);
        })
        .catch((err) => {
            console.error("Error while getting ad by id ", err.message);
            // next(err);
        });
    } catch (err) {
        console.error("Error while getting ad by id ", err.message);
        // next(err);
    }
}

function getAllAds(req, res) {
    try {
        model.getAllAds()
        .then((ads) => {
            res.send(ads);
        })
        .catch((err) => {
            console.error("Error while getting all ads ", err.message);
            // next(err);
        });
    } catch (err) {
        console.error("Error while getting all ads ", err.message);
        // next(err);
    }
}

function getAdByActiveStatus(req, res) {
    model.getAdByActiveStatus()
    .then((activeAds) => {
        res.render('advertiser', { ads: activeAds, session: req.session });
    })
    .catch((err) => {
        console.error("Error while getting ad by active status ", err.message);
    });
}

function getAdByPendingStatus(req, res) {
    model.getAdByPendingStatus()
    .then((pendingAds) => {
        res.render('advertiser', { ads: pendingAds, session: req.session });
    })
    .catch((err) => {
        console.error("Error while getting ad by pending status ", err.message);
    });
}

module.exports = {
    advertiserPage,
    createAd,
    getAdById,
    getAllAds,
    getAdByActiveStatus,
    getAdByPendingStatus,
};