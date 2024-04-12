"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/user.model");



// function createCloset(closetName, userID) {
//     fetch('/addCloset', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ closetName: closetName, userID: userID })
//     })
// }



function createCloset(req, res, next) {
    try {
        res.json(model.createCloset(req.body.Username, req.body.ClosetName));
    } catch (err) {
        console.error("Error while creating closet ", err.message);
        next(err);
    }
}

function closetPage(req, res) {
    try {
        res.sendfile('views/closet.html');
    } catch (err) {
        console.error("Error while rendering closet page ", err.message);
        next(err);
    }
}

function autoFitPage(req, res) {
    try {
        res.sendfile('views/autoFit.html');
    } catch (err) {
        console.error("Error while rendering autoFit page ", err.message);
        next(err);
    }
}

function forSalePage(req, res) {
    try {
        res.sendfile('views/forSale.html');
    } catch (err) {
        console.error("Error while rendering forSale page ", err.message);
        next(err);
    }
}

function itemDisplayPage(req, res) {
    try {
        res.sendfile('views/itemDisplay.html');
    } catch (err) {
        console.error("Error while rendering itemDisplay page ", err.message);
        next(err);
    }
}


module.exports = {
    createCloset,
    closetPage,
    autoFitPage,
    forSalePage,
    itemDisplayPage,
    
};