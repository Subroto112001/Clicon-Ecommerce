const express = require("express");
const cartController = require("../../controller/cart.controller")
const { upload } = require("../../midleware/multer.midleware");
const _ = express.Router();


_.route("/add-to-cart").post(cartController.addToCart);




module.exports = _;