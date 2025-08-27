const { asyncHandeler } = require("../utils/asyncHandeler");
const { validateCategory } = require("../validation/category.validation");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");
const subcategoryModel = require("../models/Subcategory.model");
const { validateSubCategory } = require("../validation/Subcategory.validation");

// @desc create subcategory function
exports.createsubcategory = asyncHandeler(async (req, res) => {
  const value = await validateSubCategory(req);
    const subcategorydatabase = await subcategoryModel.create(value);
    if (!subcategorydatabase) {
      throw new customError(501, "Subcategory created failed!");
    }
    apiResponse.senSuccess(
      res,
      201,
      "Subcategory created successfully!",
      subcategorydatabase
    );

});

// @desc get all subcategory
exports.getallsubcategory = asyncHandeler(async (req, res) => {

    const getallsubcategory = await subcategoryModel
      .find()
      .sort({ createdAt: -1 })
      .populate({
        path: "category",
        select: "-subCategory",
      });

  if (!getallsubcategory) {
    throw new customError(404, 'Subcategory Not found');
  }
  console.log(getallsubcategory);
  apiResponse.senSuccess(res, 200, 'Subcategory found successfully', getallsubcategory);
});

// @desc get single category

exports.getSinglesubcategory = asyncHandeler(async (req, res) => {
  const {slug} = req.params
  const getSignlesubcategory = await subcategoryModel.findOne({ slug }).sort({ createdAt: -1 }).populate({
    path: 'category',
  });

  if (!getSignlesubcategory) {
    throw new customError(404, "Subcategory Not found");
  }
  console.log(getSignlesubcategory);
  apiResponse.senSuccess( 
    res,
    200,
    "Subcategory found successfully",
    getSignlesubcategory
  );
});