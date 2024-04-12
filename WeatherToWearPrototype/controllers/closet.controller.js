const express = require("express");
const router = express.Router();
const closetModel = require("../models/closet.model"); // Assuming you have a closet model defined
const mysql = require('mysql');

// Route handler for creating a new closet
router.post("/createCloset", function(req, res) {
    const closetName = req.body.name;

    // Call the appropriate method from the closet model to insert the closet into the database
    closetModel.createCloset(closetName, function(err, result) {
        if (err) {
            console.error('Error creating closet:', err);
            res.status(500).send("Error creating closet");
            return;
        }
        console.log('Closet created successfully:', result);
        res.status(200).json({ message: "Closet created successfully" });
    });
});

// Route handler for adding clothing to a closet
router.post("/addClothing", function(req, res) {
    const clothingName = req.body.name;
    const clothingType = req.body.type;
    const heatIndex = req.body.heatIndex;

    // Call the appropriate method from the closet model to insert the clothing into the database
    closetModel.addClothing(clothingName, clothingType, heatIndex, function(err, result) {
        if (err) {
            console.error('Error adding clothing:', err);
            res.status(500).send("Error adding clothing");
            return;
        }
        console.log('Clothing added successfully:', result);
        res.status(200).send("Clothing added successfully");
    });
});

module.exports = router;
