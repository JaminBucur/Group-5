"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/login.model");

function createUser(req, res, next) {
    try {
        res.json(model.createUser(req.body.Username, req.body.Password, req.body.Status));
    } catch (err) {
        console.error("Error while creating user ", err.message);
        next(err);
    }
}

function loginPage(req, res) {
    try {
        res.sendfile('views/index.html');
    } catch (err) {
        console.error("Error while rendering login page ", err.message);
        next(err);
    }
}

function login(req, res, next) {
    try {
        const result = model.login(req.body.Username, req.body.Password);
        
        if (result) {
            res.json({ status: 'success' });
        } else {
            res.json({ status: 'error', message: 'Incorrect username or password' });
        }
    } catch (err) {
        console.error("Error while logging in ", err.message);
        next(err);
    }
}

module.exports = {
    createUser,
    loginPage,
    login,
};