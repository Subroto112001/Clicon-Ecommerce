const user = require('../models/user.model')
const { apiResponse } = require('../utils/apiResponse')
const { customError } = require('../utils/customError')
const { asyncHandeler } = require("../utils/asyncHandeler")

const { validateUser } = require("../validation/user.validation");

exports.registration = asyncHandeler(async (req, res) => {
   const value = await validateUser(req);
  console.log(value);
  
})