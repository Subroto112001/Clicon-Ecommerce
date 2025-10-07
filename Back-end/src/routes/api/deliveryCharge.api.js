const express = require("express");
const deliveryChargeController = require("../../controller/deliveryCharge.controller");
const _ = express.Router();

_.route("/create-delivery-charge").post(
  deliveryChargeController.createDeliveryCharge
);

module.exports = _;
