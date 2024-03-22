"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/admin.model");

function adminPage(req, res) {
    try {
        res.sendfile('views/admin.html');
    } catch (err) {
        console.error("Error while rendering admin page ", err.message);
        next(err);
    }
}

module.exports = {
    adminPage
};