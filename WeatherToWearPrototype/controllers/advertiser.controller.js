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
    try {
        // res.sendfile('views/advertiser.html');
        res.render("advertiser", {session: req.session});
    } catch (err) {
        console.error("Error while rendering advertiser page ", err.message);
        // next(err);
    }
}

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

module.exports = {
    advertiserPage,
    createAd
};