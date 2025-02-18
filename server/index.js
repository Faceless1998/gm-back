const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve React frontend after build
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Example API route
app.get("/api", (req, res) => {
    res.json({ message: "Server is running!" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
