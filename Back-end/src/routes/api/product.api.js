const express = require("express");
const productController = require("../../controller/product.controller");
const { upload } = require("../../midleware/multer.midleware");
const _ = express.Router();

_.route("/create-product").post(
  upload.fields([{ name: "image", maxCount: 10 }]),
  productController.createProduct
);
module.exports = _;