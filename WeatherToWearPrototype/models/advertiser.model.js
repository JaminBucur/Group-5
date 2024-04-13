"use strict";
const db = require("../models/db-conn");

function createAd(Username, Image, Description) {
    const sql = `INSERT INTO Advertisement (Username, Image, Description) VALUES (?, ?, ?)`;
    const params = [Username, Image, Description];
    return db.run(sql, params);
}

module.exports = {
    createAd,
};