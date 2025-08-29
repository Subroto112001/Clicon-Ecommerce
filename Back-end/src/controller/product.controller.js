const { asyncHandeler } = require("../utils/asyncHandeler");
const productModel = require("../models/product.model.js")
const {
  uploadImageColude,
  deleteColudinaryImage,
  deleteCloudinaryFile,
} = require("../helpers/Coludinary");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");
const { validateProduct } = require("../validation/product.validation.js");


// @desc create product function
exports.createProduct = asyncHandeler(async (req, res) => {
  const { name, description, price, category } = req.body;

  // Validate request body
  const { error } = validateProduct(req.body);
  if (error) {
    throw new customError(400, error.details[0].message);
  }

  // Create new product
  const product = new productModel({
    name,
    description,
    price,
    category,
  });

  await product.save();

  // Send response
  apiResponse(res, 201, "Product created successfully", product);
});