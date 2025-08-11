const User = require("../models/user.model");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");
const { asyncHandeler } = require("../utils/asyncHandeler");
const { validateCategory } = require("../validation/category.validation");


exports.createCategory = asyncHandeler(async (req, res) => {
    const value = validateCategory(req);
})