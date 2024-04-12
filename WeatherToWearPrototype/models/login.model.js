"use strict";
const db = require("../models/db-conn");

function createUser(username, password, status) {
    let sql = `INSERT INTO Users (Username, Password, Status) VALUES (?, ?, ?)`;
    const params = [username, password, status];
    return db.run(sql, params);
}

function loginPage(req, res) {
    res.sendfile('views/index.html');
}

function login(username, password) {
    let sql = `SELECT * FROM Users WHERE Username = ? AND Password = ?`;
    const params = [username, password];
    const user = db.get(sql, ...params);

    // Check if a user was found in the database
    if (user) {
        return true; // Login successful
    } else {
        return false; // Login failed
    }
}

module.exports = {
    createUser,
    loginPage,
    login
};

