// models/login.model.js

"use strict";

const db = require("../models/db-conn");


function createUser(username, password, status) {
    let sql = `INSERT INTO Users (Username, Password, Status) VALUES (?, ?, ?)`;
    const params = [username, password, status];
    return db.run(sql, params);
}

function getUser(username, password) {
    let sql = `SELECT * FROM Users WHERE Username = ? AND Password = ?`;
    const params = [username, password];
    return db.get(sql, ...params);
}

module.exports = {
    createUser,
    getUser
};
