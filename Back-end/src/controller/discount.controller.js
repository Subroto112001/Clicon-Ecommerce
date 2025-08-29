const { asyncHandeler } = require("../utils/asyncHandeler");
const { validateDiscount } = require("../validation/discount.validation");
const discountModel = require("../models/discount.model");
const {
  uploadImageColude,
  deleteColudinaryImage,
  deleteCloudinaryFile,
} = require("../helpers/Coludinary");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");

// @desc create a discount
exports.createDiscount = asyncHandeler(async (req, res, next) => {
  const value = await validateDiscount(req);
  console.log(value);

  const CreatedDiscount = await discountModel.create(value);
  apiResponse.senSuccess(
    res,
    201,
    "Discount created successfully",
    CreatedDiscount
  );
});
