"use strict";
const db = require("../models/db-conn");



// function createCloset(closetName, closetName) {
//     const username = req.body.Username;
//     const closetName = req.body.ClosetName;

//     if (!closetName) {
//         res.status(INVALID_PARAM_ERROR).send('Invalid closet name');
//         return;
//     }
//     try {
//         const db = getDBConnection();
//         db.run('INSERT INTO Closets (Username, ClosetName) VALUES (?, ?)', username, closetName);
//         db.close();
//         res.send('Closet added');
//     } catch (err) {
//         console.error(err);
//         res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
//     }
// }

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




// function clothingInCloset(closetID) {
//     const sql = 'SELECT * FROM Clothing WHERE ClosetID = ?';
//     return db.all(sql, [closetID]);
// }


module.exports = {
    createCloset,
    deleteCloset,
    addClothing,
    deleteClothing,
    getClosets,
    getClothing,
    clothingInCloset,
    deleteAllClothing
};