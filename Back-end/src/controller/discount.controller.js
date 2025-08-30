const { asyncHandeler } = require("../utils/asyncHandeler");
const { validateDiscount } = require("../validation/discount.validation");
const discountModel = require("../models/discount.model");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");
const subcategoryModel = require("../models/Subcategory.model");
const categoryModel = require("../models/category.model");
const NodeCache = require("node-cache");
const Cache = new NodeCache();
// @desc create a discount
exports.createDiscount = asyncHandeler(async (req, res, next) => {
  const value = await validateDiscount(req);

  if (!value) {
    throw new customError(400, "Invalid data");
  }

  const CreatedDiscount = await discountModel.create(value);
  if (!CreatedDiscount) {
    throw new customError(400, "Discount not created");
  }

  // ===============category=============//
  if (value.discountPlan === "category" && value.category) {
    const category = await categoryModel.findByIdAndUpdate(
      value.category,
      { discount: CreatedDiscount._id },
      { new: true }
    );
    if (!category) throw new customError(400, "Category not found");
  }

  // =====================subcategory=======================//
  if (value.discountPlan === "subCategory" && value.subCategory) {
    const subcategory = await subcategoryModel.findByIdAndUpdate(
      value.subCategory,
      { discount: CreatedDiscount._id },
      { new: true }
    );

    if (!subcategory) {
      throw new customError(400, "Subcategory not found");
    }
  }

  apiResponse.senSuccess(
    res,
    201,
    "Discount created successfully",
    CreatedDiscount
  );
});

// @desc get all discount
exports.getAlldiscount = asyncHandeler(async (req, res) => {
  let value = Cache.get("alldiscount");

  if (!value) {
    const alldiscount = await discountModel.find();
     if (!alldiscount) {
       throw new customError(404, "No discounts found");
     }
    // save data into cache
    Cache.set("alldiscount", JSON.stringify(alldiscount), 3600);
    console.log(alldiscount);
   
     return apiResponse.senSuccess(
       res,
       200,
       "All discounts retrieved successfully",
       alldiscount
     );
  }
  // check data from cache
  const cachedData = JSON.parse(value);
  return apiResponse.senSuccess(
    res,
    200,
    "All discounts retrieved successfully",
    cachedData
  );
});

// @desc get single discount
exports.getSingleDiscount = asyncHandeler(async (req, res) => {
  const { slug } = req.params;
  const singleDiscountValue = await discountModel.findOne({ slug });
  if (!singleDiscountValue) {
    throw new customError(404, "Discount not found");
  }

  console.log(singleDiscountValue);
  apiResponse.senSuccess(
    res,
    200,
    "Single discount retrieved successfully",
    singleDiscountValue
  );
});
