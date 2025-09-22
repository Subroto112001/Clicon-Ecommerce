const { asyncHandeler } = require("../utils/asyncHandeler");
const { validateVariant } = require("../validation/variant.validation");
const variantmodel = require("../models/variant.model");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");

exports.createVariant = asyncHandeler(async (req, res) => {
    const value = await validateVariant(req);
    const variant = await variantmodel.create(value);
    if (!variant) {
        throw new customError(501, "Variant created failed!");
    }
    apiResponse.senSuccess(res, 201, "Variant created successfully", variant);
});