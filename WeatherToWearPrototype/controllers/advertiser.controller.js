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
const { get } = require("http");


function advertiserPage(req, res) {
    Promise.all([model.getDiscountSales(), model.getAdByPendingStatus(), model.getAdByActiveStatus()])
        .then(([discountSales, pendingAds, activeAds]) => {
            res.render('advertiser', { discountSales: discountSales, pendingAds: pendingAds, activeAds: activeAds, session: req.session });
        })
        .catch((err) => {
            console.error("Error while rendering advertiser page ", err.message);
        });
}

function createAd(req, res) {
    try {
        const adData = {
            Image: req.file.filename,
            ClothingName: req.body.ClothingName,
            HeatIndex: req.body.HeatIndex,
            Price: req.body.Price,
            Sale: req.body.Sale,
            Description: req.body.Description,
            Username: req.session.Username
        };

        model.createAd(adData)
        res.redirect("/advertiser");
        
    } catch(err) {
        console.error("Error while creating ad ", err.message);
    };
}

function createDiscount(req, res) {
    try {
        const saleData = {
            Name: req.body.saleName,
            StartDate: req.body.saleMinDate,
            StartTime: req.body.saleMinTime,
            EndDate: req.body.saleMaxDate,
            EndTime: req.body.saleMaxTime,
            Discount: req.body.saleDiscount,
            SaleDescription: req.body.saleDescription
        };

        model.createDiscount(saleData)
        res.redirect("/advertiser");
    } catch(err) {
        console.error("Error while creating discount ", err.message);
    };
}

/*
function getDiscountSaleById(req, res){
    console.log("This is the requested saleID", req.body.SaleID );
    try {
        const SaleID = Number(req.body.SaleID);
        const sale = model.getDiscountSaleById(SaleID);
        res.render('advertiser-manageSales', { sale: sale });
    } catch(err){
        console.error("Error while getting discount sale by id ", err.message);
    }
}
*/

function getDiscountSaleById(req, res){
    console.log(req.body.SaleID, typeof req.body.SaleID);
    let SaleID = req.params.id;
    try{
        let sale = model.getDiscountSaleById(SaleID);
        res.render('advertiser-manageSales', { sale: sale, session: req.session });
    } catch(err){
        console.error("Error while getting discount sale by id ", err.message);
    
    }
    
}

/*
function getAdByIdSite(req, res) {
    let AdID = req.params.AdID;
    try {
        let ad = model.getAdById(AdID);
        res.render('advertiser-viewItem', { ad: ad });
    } catch(err){    
        console.error("Error while getting ad by id ", err.message);
    }
}
*/

async function getAdByIdSite(req, res) {
    let AdID = req.params.AdID;
    try {
        let ad = await model.getAdById(AdID);
        res.render('advertiser-viewItem', { ad: ad, session: req.session });
    } catch(err){    
        console.error("Error while getting ad by id ", err.message);
    }
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
    createDiscount,
    getDiscountSaleById,
    getAdById,
    getAdByIdSite,
    getAllAds,
    getAdByActiveStatus,
    getAdByPendingStatus,
};