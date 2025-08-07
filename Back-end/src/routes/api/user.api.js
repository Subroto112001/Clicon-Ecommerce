const express = require("express");
const _ = express.Router();
const authController = require("../../controller/user.controller");


_.route("/registartion").post(authController.registration);
_.route("/login").post(authController.Login);

module.exports = _;
