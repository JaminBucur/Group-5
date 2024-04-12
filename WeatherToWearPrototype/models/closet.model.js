const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'geek'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Function to create a new closet
function createCloset(closetName, callback) {
    const sql = 'INSERT INTO closets (name) VALUES (?)';
    connection.query(sql, [closetName], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

// Function to retrieve closets from the database
function getClosets(callback) {
    const sql = 'SELECT * FROM closets';
    connection.query(sql, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, results);
    });
}

// Function to add clothing to a closet
function addClothing(clothingName, clothingType, heatIndex, closetId, userId, callback) {
    const sql = 'INSERT INTO clothing (name, type, heat_index, closet_id, user_id) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [clothingName, clothingType, heatIndex, closetId, userId], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}


module.exports = {
    createCloset,
    addClothing,
    getClosets
};
