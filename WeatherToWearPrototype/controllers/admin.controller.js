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
        if (req.session.Status !== "admin") {
            res.redirect("/home");
            return;
        }
        const comments = model.getFlaggedComments();
        res.render("admin", {session: req.session, comments});
    } catch (err) {
        console.error("Error while rendering admin page ", err.message);
    }
}

function bannedUsersPage(req, res) {
    try {
        if (req.session.Status !== "admin") {
            res.redirect("/home");
            return;
        }
        const users = model.getBannedUsers();
        res.render("bannedUsers", {session: req.session, users});
    } catch (err) {
        console.error("Error while rendering banned users page ", err.message);
    }
}

function adsPage(req, res) {
    try {
        if (req.session.Status !== "admin") {
            res.redirect("/home");
            return;
        }
        const ads = model.getAds();
        res.render("manageAds", {session: req.session, ads});
    } catch (err) {
        console.error("Error while rendering ads page ", err.message);
    }
}

function dismissComment(req, res) {
    try {
        const CommentID = req.body.CommentID;
        model.dismissComment(CommentID);
        res.redirect("/admin");
    } catch (err) {
        console.error("Error while dismissing comment ", err.message);
    }
}

function deleteComment(req, res) {
    try {
        const CommentID = req.body.CommentID;
        model.deleteComment(CommentID);
        res.redirect("/admin");
    } catch (err) {
        console.error("Error while deleting comment ", err.message);
    }
}

function banUser(req, res) {
    try {
        const Username = req.body.Username;
        const BanReason = req.body.BanReason;
        model.deleteUserAds(Username);
        model.deleteUserComments(Username);
        model.banUser(BanReason, Username);
        res.redirect("/admin");
    } catch (err) {
        console.error("Error while banning user ", err.message);
    }
}

function unbanUser(req, res) {
    try {
        const Username = req.body.Username;
        model.unbanUser(Username);
        res.redirect("/bannedUsers");
    } catch (err) {
        console.error("Error while unbanning user ", err.message);
    }
}

function approveAd(req, res) {
    try {
        const AdID = req.body.AdID;
        model.approveAd(AdID);
        res.redirect("/manageAds");
    } catch (err) {
        console.error("Error while approving ad ", err.message);
    }
}

function deleteAd(req, res) {
    try {
        const AdID = req.body.AdID;
        model.deleteAd(AdID);
        res.redirect("/manageAds");
    } catch (err) {
        console.error("Error while deleting ad ", err.message);
    }
}


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