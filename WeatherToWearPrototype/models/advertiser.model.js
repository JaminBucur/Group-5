"use strict";
const db = require("../models/db-conn");

function createAd(adData) {
    const sql = `INSERT INTO Advertisement (Image, ClothingName, HeatIndex, Price, Description, Username)
        VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [adData.Image, adData.ClothingName, adData.HeatIndex, adData.Price, adData.Description, adData.Username];
    return db.run(sql, params);
        
}

// function to grab 1 ad
function getAdById(AdID){
    const sql = `SELECT * FROM Advertisement WHERE AdID = ?`;
    const params = [AdID];
    return db.get(sql, params);
}

function getAllAds(){
    const sql = `SELECT * FROM Advertisement`;
    return db.all(sql);
}

// function to get Ads that have a Status equal to 1 in the sql database
function getAdByActiveStatus(){
    const sql = `SELECT * FROM Advertisement WHERE Status = 1`;
    return db.all(sql);
}

// function to get Ads that have a Status equal to 0 in the sql database
function getAdByPendingStatus(){
    const sql = `SELECT * FROM Advertisement WHERE Status = 0`;
    return db.all(sql);
}


module.exports = {
    createAd, 
    getAdById,
    getAllAds,
    getAdByActiveStatus,
    getAdByPendingStatus,
};