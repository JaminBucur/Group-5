"use strict";
const db = require("../models/db-conn");

function createCloset(username, closetName) {
    let sql = `INSERT INTO Closets (Username, ClosetName) VALUES (?, ?)`;
    const params = [username, closetName];
    return db.run(sql, params);
}

function deleteCloset(closetID) {
    let sql = `DELETE FROM Closets WHERE ClosetID = ?`;
    return db.run(sql, closetID);
}

// Function to retrieve closets from the database
function getClosets(Username) {
    const sql = `SELECT * FROM Closets WHERE Username = ?`;
    return db.all(sql, Username);
}

function getClothing(ClosetID) {
    const sql = `
        SELECT * FROM Clothing WHERE ClosetID = ?
    `;
    return db.all(sql, ClosetID);
}

// Function to add clothing to a closet
function addClothing(ClothingID, ClosetID, ClothingName, ClothingType, HeatIndex) {
    const sql = 'INSERT INTO Clothing (ClothingID, ClosetID, ClothingName, ClothingType, HeatIndex) VALUES (?, ?, ?, ?, ?)';
    const params = [ClothingID, ClosetID, ClothingName, ClothingType, HeatIndex];
    return db.run(sql, params);
}

function deleteClothing(ClothingID) {
    const sql = 'DELETE FROM Clothing WHERE ClothingID = ?';
    return db.run(sql, ClothingID);
}

function clothingInCloset(ClosetID) {
    const sql = 'SELECT * FROM Clothing WHERE ClosetID = ?';
    return db.all(sql, ClosetID);
}

function deleteAllClothing(ClosetID) {
    const sql = 'DELETE FROM Clothing WHERE ClosetID = ?';
    return db.run(sql, ClosetID);
}

// function to get Ads that have a Status equal to 1 in the sql database
function getAdByActiveStatus(){
    const sql = `SELECT * FROM Advertisement WHERE Status = 1`;
    // console.log(sql + "dwdwawadwdawadwad")
    return db.all(sql);
}

function getAd(AdID){
    const sql = `SELECT * FROM Advertisement WHERE AdID = ?`;
    return db.get(sql, AdID);
}

function getAdComments(AdID){
    const sql = `SELECT * FROM Comments WHERE AdID = ?`;
    return db.all(sql, AdID);
}

function postComment(AdID, Username, Comment){
    const sql = `INSERT INTO Comments (AdID, Username, Comment) VALUES (?, ?, ?)`;
    const params = [AdID, Username, Comment];
    return db.run(sql, params);
}

function flagComment(CommentID){
    const sql = `UPDATE Comments SET Flag = 1 WHERE CommentID = ?`;
    return db.run(sql, CommentID);
}


module.exports = {
    createCloset,
    deleteCloset,
    addClothing,
    deleteClothing,
    getClosets,
    getClothing,
    clothingInCloset,
    deleteAllClothing,
    getAdByActiveStatus,
    getAd,
    getAdComments,
    postComment,
    flagComment
};