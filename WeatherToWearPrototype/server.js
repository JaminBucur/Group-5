// Import required modules
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const closetController = require('./controllers/closet.controller'); // Import your closet controller
const closetModel = require('./models/closet.model');

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('views'));

// Serve JavaScript files with the correct MIME type
app.get('/other/script.js', function(req, res) {
    res.sendFile(path.join(__dirname, '/script.js'), {
        headers: {
            'Content-Type': 'text/javascript'
        }
    });
});

// Route handler for fetching closets
app.get('/closet/getClosets', function(req, res) {
    // Call a function from your model to fetch closets data from the database
    closetModel.getClosets(function(err, closets) {
        if (err) {
            console.error('Error fetching closets:', err);
            res.status(500).send("Error fetching closets");
            return;
        }
        // Send the closets data as a JSON response
        res.json(closets);
    });
});

// Route for serving HTML
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

// Route handlers for closet-related actions
app.use('/closet', closetController);

const server = app.listen(8000, function () {
    console.log('Server is listening at port 8000...');
});
