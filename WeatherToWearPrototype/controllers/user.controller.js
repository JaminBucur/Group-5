"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/user.model");


function closetPage(req, res) {
    try {
        const closets = model.getClosets(req.session.Username);
        // console.log(closets);
        const clothing = []
        res.render("closet", {session: req.session, closets, clothing});
    } catch (err) {
        console.error("Error while rendering closet page ", err.message);
        // next(err);
    }
}

function autoFitPage(req, res) {
    try {
        // res.sendfile('views/autoFit.html');
        res.render("autoFit", {session: req.session});
    } catch (err) {
        console.error("Error while rendering autoFit page ", err.message);
        // next(err);
    }
}

function forSalePage(req, res) {
    try {
        // res.sendfile('views/forSale.html');
        res.render("forSale", {session: req.session});
    } catch (err) {
        console.error("Error while rendering forSale page ", err.message);
        // next(err);
    }
}

function itemDisplayPage(req, res) {
    try {
        // res.sendfile('views/itemDisplay.html');
        res.render("itemDisplay", {session: req.session});
    } catch (err) {
        console.error("Error while rendering itemDisplay page ", err.message);
        // next(err);
    }
}

function createCloset(req, res) {
    try {
        const Username = req.session.Username;
        const ClosetName = req.body.ClosetName
        model.createCloset(Username, ClosetName);
        // const closets = model.getClosets();
        res.redirect('/closet');
    } catch (err) {
        console.error("Error while creating closet ", err.message);
    }
}

function addClothing(req, res) {
    try {
        // console.log(req.body);
        const clothingID = req.body.ClothingID;
        const closetID = req.body.ClosetID;
        const clothingName = req.body.ClothingName;
        const clothingType = req.body.ClothingType;
        const heatIndex = req.body.HeatIndex;
        
        model.addClothing(clothingID, closetID, clothingName, clothingType, heatIndex);
        res.redirect('/closet');
    } catch (err) {
        console.error("Error while adding clothing ", err.message);
    }
}

function clothingInCloset(req, res) {
    try {
        // console.log(req.body);
        const closetID = req.body.ClosetID;
        // console.log(closetID);
        const clothing = model.getClothing(closetID);
        // console.log(clothing);
        const closets = model.getClosets(req.session.Username);
        res.render("closet", {session: req.session, closets, clothing});

    } catch (err) {
        console.error("Error while getting clothing in closet ", err.message);
    }
}

function deleteClothing(req, res) {
    try {
        const clothingID = req.body.ClothingID;
        model.deleteClothing(clothingID);
        res.redirect('/closet');
    } catch (err) {
        console.error("Error while removing clothing ", err.message);
    }
}

function deleteCloset(req, res) {
    try {
        const closetID = req.body.ClosetID;
        model.deleteAllClothing(closetID);
        model.deleteCloset(closetID);
        res.redirect('/closet');
    } catch (err) {
        console.error("Error while deleting closet ", err.message);
    }
}

// function getClosets(req, res) {
//     try {
//         model.getClosets();
//     } catch (err) {
//         console.error("Error while getting closets ", err.message);
//     }
// }


module.exports = {
    
    closetPage,
    autoFitPage,
    forSalePage,
    itemDisplayPage,
    createCloset,
    addClothing,
    clothingInCloset,
    deleteClothing,
    deleteCloset

};