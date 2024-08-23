const express = require("express");

const userRoute = express.Router();

userRoute.get("/login", (req, res) => {
  res.status(200).send("Login successful.");
});

module.exports = userRoute;
