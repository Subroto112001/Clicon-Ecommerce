const User = require('../models/user.model')
const { apiResponse } = require('../utils/apiResponse')
const { customError } = require('../utils/customError')
const { asyncHandeler } = require("../utils/asyncHandeler")

const { validateUser } = require("../validation/user.validation");

exports.registration = asyncHandeler(async (req, res) => {
   const value = await validateUser(req);
  // now sava the data into database
  const { fristName, email, password } = value
  const user = await new User({
    fristName,
    email,
    password,
  }).save();

  if (!user) {
    throw new customError(500, "Registration Failed")
  }

  apiResponse.senSuccess(res, 201, "Registration Successfull", user)
})