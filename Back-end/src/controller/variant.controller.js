const { asyncHandeler } = require("../utils/asyncHandeler");
const { validateVariant } = require("../validation/variant.validation");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");
const { uploadImageColude } = require("../helpers/Coludinary");
const variantModel = require("../models/variant.model");
const productModel = require("../models/product.model");

// @desc create a product variant
exports.createVariant = asyncHandeler(async (req, res) => {
  const value = await validateVariant(req);
  console.log(value);

  // upload image
  const pictureurl = await Promise.all(
    value.image.map((img) => uploadImageColude(img.path))
  );

  const variant = await variantModel.create({ ...value, image: pictureurl });
  if (!variant) {
    throw new customError(500, "variant not created");
  }

  const productVaraintId = await productModel.findOneAndUpdate(
    { _id: value.product },
    { $push: { variant: variant._id } },
    { new: true }
  );
  if (!productVaraintId) {
    throw new customError(500, "Product variant push failed");
  }
  apiResponse.senSuccess(res, 200, "Variant created successfully", variant);
});

// @desc get all variant
exports.getAllvariant = asyncHandeler(async (req, res) => {
  const variant = await variantModel
    .find()
    .populate("product")
    .sort({ createdAt: -1 });
  if (!variant) {
    throw new customError(500, "Variant not found");
  }
  console.log(variant);
  apiResponse.senSuccess(res, 200, "Variant created successfully", variant);
});

// @desc get single variant
exports.getSingleVaraint = asyncHandeler(async (req, res) => {
  const { slug } = req.params;

  const variant = await variantModel.findOne({ slug }).populate("product");
  if (!variant) {
    throw new customError(404, "Variant not found");
  }
  apiResponse.senSuccess(res, 200, "Variant Found Successfully", variant);
});

// @desc upload image
exports.uploadImageInVariant = asyncHandeler(async (req, res) => {
  const { slug } = req.params;

  const variant = await variantModel.findOne({ slug }).populate("product");
  if (!variant) {
    throw new customError(404, "Variant not found");
  }

  const { image } = req.files;
  const pictureurl = await Promise.all(
    image.map((img) => uploadImageColude(img.path))
  );
  variant.image = [...variant.image, ...pictureurl];
  await variant.save();
  apiResponse.senSuccess(res, 200, "Image uploaded successfully", variant);
});
