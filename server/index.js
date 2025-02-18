require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Apartment = require("./models/Apartment"); // Import the Apartment model

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB (Removed deprecated options)
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

// Test Route
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Get all apartments
app.get("/apartments", async (req, res) => {
    try {
        const apartments = await Apartment.find();
        res.json(apartments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single apartment by room number
app.get("/apartments/:room_number", async (req, res) => {
    try {
        const apartment = await Apartment.findOne({ room_number: req.params.room_number });
        if (!apartment) return res.status(404).json({ message: "Apartment not found" });
        res.json(apartment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new apartment
app.post("/apartments", async (req, res) => {
    try {
        const newApartment = new Apartment(req.body);
        await newApartment.save();
        res.status(201).json(newApartment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an existing apartment by room number
app.put("/apartments/:room_number", async (req, res) => {
    try {
        const updatedApartment = await Apartment.findOneAndUpdate(
            { room_number: req.params.room_number },
            req.body,
            { new: true } // return the updated document
        );
        if (!updatedApartment) return res.status(404).json({ message: "Apartment not found" });
        res.json(updatedApartment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an apartment by room number
app.delete("/apartments/:room_number", async (req, res) => {
    try {
        const deletedApartment = await Apartment.findOneAndDelete({ room_number: req.params.room_number });
        if (!deletedApartment) return res.status(404).json({ message: "Apartment not found" });
        res.json({ message: "Apartment deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Suppress specific Webpack deprecation warnings
process.emitWarning = (warning, type, code) => {
    if (warning.includes('onAfterSetupMiddleware') || warning.includes('onBeforeSetupMiddleware')) {
        return; // Ignore these specific warnings
    }
    // Default behavior for other warnings
    console.warn(warning);
};


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
