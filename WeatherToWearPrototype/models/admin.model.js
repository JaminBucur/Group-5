"use strict";
const db = require("../models/db-conn");

function getFlaggedComments() {
    const sql = `SELECT * FROM Comments WHERE Flag = 1`;
    return db.all(sql);
}

function dismissComment(CommentID) {
    const sql = `UPDATE Comments SET Flag = 0 WHERE CommentID = ?`;
    return db.run(sql, CommentID);
}

function deleteComment(CommentID) {
    const sql = `DELETE FROM Comments WHERE CommentID = ?`;
    return db.run(sql, CommentID);
}

function deleteUserComments(Username) {
    const sql = `DELETE FROM Comments WHERE Username = ?`;
    return db.run(sql, Username);
}

function banUser(BanReason, Username) {
    const sql = `UPDATE Users SET Banned = 1, BanReason = ? WHERE Username = ?`;
    const params = [BanReason, Username];
    return db.run(sql, params);
}

function unbanUser(Username) {
    const sql = `UPDATE Users SET Banned = 0, BanReason = NULL WHERE Username = ?`;
    return db.run(sql, Username);
}

function getBannedUsers() {
    const sql = `SELECT * FROM Users WHERE Banned = 1`;
    return db.all(sql);
}

function getAds() {
    const sql = `SELECT * FROM Advertisement WHERE Status = 0`;
    return db.all(sql);
}

function deleteAd(AdID) {
    const sql = `DELETE FROM Advertisement WHERE AdID = ?`;
    return db.run(sql, AdID);
}

function approveAd(AdID) {
    const sql = `UPDATE Advertisement SET Status = 1 WHERE AdID = ?`;
    return db.run(sql, AdID);
}

function deleteUserAds(Username) {
    const sql = `DELETE FROM Advertisement WHERE Username = ?`;
    return db.run(sql, Username);
}

module.exports = {
    getFlaggedComments,
    dismissComment,
    deleteComment,
    deleteUserComments,
    banUser,
    unbanUser,
    getBannedUsers,
    getAds,
    deleteAd,
    approveAd,
    deleteUserAds
};