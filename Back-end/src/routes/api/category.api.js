const express = require("express");
const categoryController = require("../../controller/category.controller");
const _ = express.Router();

_.route("/create-category").post(categoryController.createCategory);


module.exports = _;