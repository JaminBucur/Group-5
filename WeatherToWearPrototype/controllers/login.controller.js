"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/login.model");

function loginPage(req, res) {
    try {
        // res.sendfile('views/index.html');
        // console.log(req.session.User)
        // console.log(req.session.Status)
        const error = null;
        res.render('index', { session: req.session, error});
    } catch (err) {
        console.error("Error while rendering login page ", err.message);
    }
}

function login(req, res, next) {
    try {
        const { username, password } = req.body;
        const user = model.getUser(username, password);
        // console.log(user);
        if (user) {
            req.session.Status = user.Status;
            req.session.Username = user.Username;
            req.session.Banned = user.Banned;
            req.session.BanReason = user.BanReason;
            
            if (user.Banned === 1) {
                res.redirect('/banned');
            } else if (user.Status === 'user') {
                res.redirect('/closet');
            } else if (user.Status === 'advertiser') {
                res.redirect('/advertiser');
            } else if (user.Status === 'admin') {
                res.redirect('/admin');
            }
        } else {
            res.render("index", { session: req.session, error: 'Incorrect Username or Password' });
        }
    } catch (err) {
        console.error("Error while logging in ", err.message);
        next(err);
    }
}

function logout(req, res, next) {
    try {
        req.session.destroy();
        res.redirect('/home');
    } catch (err) {
        console.error("Error while logging out ", err.message);
        next(err);
    }
}

function bannedPage(req, res) {
    try {
        res.render('banned', { session: req.session });
    } catch (err) {
        console.error("Error while rendering banned page ", err.message);
    }
}

module.exports = {
    loginPage,
    login,
    logout,
    bannedPage

};

