"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/advertiser.model");

function advertiserPage(req, res) {
    try {
        // res.sendfile('views/advertiser.html');
        res.render("advertiser", {Status: req.session.Status});
    } catch (err) {
        console.error("Error while rendering advertiser page ", err.message);
        next(err);
    }
}

module.exports = {
    advertiserPage
};