const express = require("express");
const categoryController = require("../../controller/category.controller");
const { upload } = require("../../midleware/multer.midleware");
const _ = express.Router();

_.route("/create-category").post(
  upload.fields([{ name: "image", maxCount: 1 }]),
  categoryController.createCategory
);

module.exports = _;
