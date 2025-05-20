const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");


// Initialize Express App
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", userRoutes);
module.exports = app;
