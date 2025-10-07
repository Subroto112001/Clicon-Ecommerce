const { asyncHandeler } = require("../utils/asyncHandeler");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");
const deliveryChargeModel = require("../models/deliveryCharge.model");

exports.createDeliveryCharge = asyncHandeler(async (req, res) => {
  const { name, charge, description } = req.body;
  if (!name || !charge) {
    throw new customError(400, "Delivery charge name and charge is required");
  }

  const deliveryCharge = await new deliveryChargeModel({
    name,
    charge,
    description,
  });
    
  if (!deliveryCharge) {
    throw new customError(400, "Delivery charge creation failed");
  }

  await deliveryCharge.save();
  apiResponse.senSuccess(
    res,
    201,
    "Delivery charge created successfully",
    deliveryCharge
  );
});
