const express = require("express");
const discountController = require("../../controller/discount.controller")
const { upload } = require("../../midleware/multer.midleware");
const _ = express.Router();

_.route("/create-discount").post(discountController.createDiscount);
module.exports = _;