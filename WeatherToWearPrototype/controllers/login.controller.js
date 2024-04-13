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
        const error = null;
        res.render('index', { Status: req.session.Status, error});
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

            if (user.Status === 'user') {
                res.redirect('/closet');
            } else if (user.Status === 'advertiser') {
                res.redirect('/advertiser');
            } else if (user.Status === 'admin') {
                res.redirect('/admin');
            }
        } else {
            res.render("index", { Status: req.session.Status, error: 'Incorrect Username or Password' });
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

module.exports = {
    loginPage,
    login,
    logout

};

