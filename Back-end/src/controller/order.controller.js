const { asyncHandeler } = require("../utils/asyncHandeler");
const { validateOrder } = require("../validation/order.validation");
const orderModel = require("../models/order.model");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");

exports.makeAorder = asyncHandeler(async (req, res) => {

    const { user, guestId, shippingInfo, deliveryCharge } = await validateOrder(
      req
    );


});
