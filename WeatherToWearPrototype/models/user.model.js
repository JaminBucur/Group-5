"use strict";
const db = require("../models/db-conn");



// function createCloset(closetName, closetName) {
//     const username = req.body.Username;
//     const closetName = req.body.ClosetName;

//     if (!closetName) {
//         res.status(INVALID_PARAM_ERROR).send('Invalid closet name');
//         return;
//     }
//     try {
//         const db = getDBConnection();
//         db.run('INSERT INTO Closets (Username, ClosetName) VALUES (?, ?)', username, closetName);
//         db.close();
//         res.send('Closet added');
//     } catch (err) {
//         console.error(err);
//         res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
//     }
// }

function createCloset(username, closetName) {
    let sql = `INSERT INTO Closets (Username, ClosetName) VALUES (?, ?)`;
    const params = [username, closetName];
    return db.run(sql, params);
}

module.exports = {
    createCloset
};