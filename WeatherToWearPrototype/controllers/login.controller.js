// controllers/login.controller.js

"use strict";

const model = require("../models/login.model");

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
    login
};

