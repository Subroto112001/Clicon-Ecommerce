const { asyncHandeler } = require("../utils/asyncHandeler");
const { validateCategory } = require("../validation/category.validation");
const categorymodel = require("../models/category.model");
const {
  uploadImageColude,
  deleteColudinaryImage,
} = require("../helpers/Coludinary");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");

// @desc create category function
exports.createCategory = asyncHandeler(async (req, res) => {
  const value = await validateCategory(req);
  console.log(value);
  const cloudeImage = await uploadImageColude(value?.image?.path);

  //  save the category into database

  const category = await categorymodel.create({
    name: value.name,
    image: cloudeImage,
  });

  if (!category) {
    throw new customError(501, "Category created failed!");
  }
  apiResponse.senSuccess(res, 201, "Category created successfully", category);
});

// @desc get all category function
exports.getAllCategory = asyncHandeler(async (req, res) => {
  const allCategory = await categorymodel.find().sort({ createdAt: -1 });

  if (!allCategory) {
    throw new customError(404, "No categories found");
  }

  console.log(allCategory);

  apiResponse.senSuccess(
    res,
    200,
    "All categories retrieved successfully",
    allCategory
  );
});

// @desc get single category function
exports.getSingleCategory = asyncHandeler(async (req, res) => {
  const { slug } = req.params;
  const SingleCategoryItem = await categorymodel.findOne({ slug });
  if (!SingleCategoryItem) {
    throw new customError(500, "No category found here");
  }
  console.log(SingleCategoryItem);

  apiResponse.senSuccess(
    res,
    200,
    "Single category retrieved successfully",
    SingleCategoryItem
  );
});

// @desc update single category
exports.updateSingleCategory = asyncHandeler(async (req, res) => {
  const { slug } = req.params;

  const findCategory = await categorymodel.findOne({ slug });
  if (!findCategory) {
    throw new customError(400, "Not found category name");
  }
  console.log(findCategory);

  if (req.body.name) {
    findCategory.name = req.body.name;
  }
  if (req?.files?.image?.length) {
    const deletedItem = await deleteColudinaryImage(
      findCategory.image?.public_id
    );
    if (!deletedItem) {
      throw new customError(500, "Not deleted image from cloudinary");
    }
    console.log(deletedItem);
    const UpdateImage = await uploadImageColude(req?.files?.image[0].path);
    findCategory.image = UpdateImage;
  }
  const updateCategory = await findCategory.save();
  apiResponse.senSuccess(
    res,
    200,
    "Single category updated successfully",
    updateCategory
  );
});
