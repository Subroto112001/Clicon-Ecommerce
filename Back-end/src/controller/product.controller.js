const { asyncHandeler } = require("../utils/asyncHandeler");
const productModel = require("../models/product.model.js");
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
  const data = await validateProduct(req);
  if (!data) {
    throw new customError(400, "validation failed");
  }
  let AllImageArray = [];
  for (let image of data.images) {
    const imageAsset = await uploadImageColude(image.path);
    AllImageArray.push(imageAsset);
  }
  // now save the data into database
  const product = await productModel.create({ ...data, image: AllImageArray });
  if (!product) {
    throw new customError(404, "Product not created");
  }

// generate qr code 


  // Send response
  console.log("Created SUccessFully");
  apiResponse.senSuccess(res, 201, "Product created successfully", product);
});
