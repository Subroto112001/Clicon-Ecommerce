const express = require("express");
const variantController = require("../../controller/variant.controller")

const { upload } = require("../../midleware/multer.midleware");
const _ = express.Router();

_.route("/create-variant").post(
  upload.fields([{ name: "image", maxCount: 1 }]),
  variantController.createVariant
);


module.exports = _;