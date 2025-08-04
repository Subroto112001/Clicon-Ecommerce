const user = require('../models/user.model')
const { apiResponse } = require('../utils/apiResponse')
const { customError } = require('../utils/customError')
const { asyncHandeler } = require("../utils/asyncHandeler")



exports.registration = asyncHandeler(async (req, res) => {
    console.log(req.body);
  
})