"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/admin.model");

function commentsPage(req, res) {
    try {
        // res.sendfile('views/admin.html');
        const comments = model.getFlaggedComments();
        // console.log(comments);
        res.render("admin", {session: req.session, comments});
    } catch (err) {
        console.error("Error while rendering admin page ", err.message);
        // next(err);
    }
}

function bannedUsersPage(req, res) {
    try {
        // res.sendfile('views/bannedUsers.html');
        const users = model.getBannedUsers();
        res.render("bannedUsers", {session: req.session, users});
    } catch (err) {
        console.error("Error while rendering banned users page ", err.message);
        // next(err);
    }
}

function adsPage(req, res) {
    try {
        // res.sendfile('views/ads.html');
        const ads = model.getAds();
        res.render("manageAds", {session: req.session, ads});
    } catch (err) {
        console.error("Error while rendering ads page ", err.message);
        // next(err);
    }
}

function dismissComment(req, res) {
    try {
        const Comment = req.body.Comment;
        model.dismissComment(Comment);
        res.redirect("/admin");
        // res.send("Comment dismissed");
    } catch (err) {
        console.error("Error while dismissing comment ", err.message);
        // res.status(500).send("Error dismissing comment");
    }
}

function deleteComment(req, res) {
    try {
        const Comment = req.body.Comment;
        model.deleteComment(Comment);
        res.redirect("/admin");
        // res.send("Comment deleted");
    } catch (err) {
        console.error("Error while deleting comment ", err.message);
        // res.status(500).send("Error deleting comment");
    }
}

function banUser(req, res) {
    try {
        const Username = req.body.Username;
        const BanReason = req.body.BanReason;
        console.log(Username, BanReason);
        model.deleteUserAds(Username);
        model.deleteUserComments(Username);
        model.banUser(BanReason, Username);
        res.redirect("/admin");
        // res.send("User banned");
    } catch (err) {
        console.error("Error while banning user ", err.message);
        // res.status(500).send("Error banning user");
    }
}

function unbanUser(req, res) {
    try {
        const Username = req.body.Username;
        model.unbanUser(Username);
        res.redirect("/bannedUsers");
        // res.send("User unbanned");
    } catch (err) {
        console.error("Error while unbanning user ", err.message);
        // res.status(500).send("Error unbanning user");
    }
}

function approveAd(req, res) {
    try {
        const AdID = req.body.AdID;
        model.approveAd(AdID);
        res.redirect("/manageAds");
        // res.send("Ad approved");
    } catch (err) {
        console.error("Error while approving ad ", err.message);
        // res.status(500).send("Error approving ad");
    }
}

function deleteAd(req, res) {
    try {
        const AdID = req.body.AdID;
        model.deleteAd(AdID);
        res.redirect("/manageAds");
        // res.send("Ad deleted");
    } catch (err) {
        console.error("Error while deleting ad ", err.message);
        // res.status(500).send("Error deleting ad");
    }
}

// function getBannedUsers(req, res) {
//     try {
//         const users = model.getBannedUsers();
//         res.send(users);
//     } catch (err) {
//         console.error("Error while getting banned users ", err.message);
//         res.status(500).send("Error getting banned users");
//     }
// }

module.exports = {
    commentsPage,
    bannedUsersPage,
    adsPage,
    dismissComment,
    deleteComment,
    banUser,
    unbanUser,
    approveAd,
    deleteAd
};