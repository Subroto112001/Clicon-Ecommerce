const User = require('../models/user.model')
const { apiResponse } = require('../utils/apiResponse')
const { customError } = require('../utils/customError')
const { asyncHandeler } = require("../utils/asyncHandeler")

const { validateUser } = require("../validation/user.validation");
const { mailSender } = require('../helpers/helper');
const { RegistrationMailTemplate } = require('../TemplateEmail/Template');

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
const verificationLInk = `http://localhost:5157/verifyemail/`;
const template = RegistrationMailTemplate(fristName, verificationLInk);
  await mailSender(email, template);

  apiResponse.senSuccess(res, 201, "Registration Successfull", user)
})