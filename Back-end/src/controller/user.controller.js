const User = require("../models/user.model");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");
const { asyncHandeler } = require("../utils/asyncHandeler");

const { validateUser } = require("../validation/user.validation");
const { mailSender } = require("../helpers/helper");
const { RegistrationMailTemplate } = require("../TemplateEmail/Template");
const userModel = require("../models/user.model");

exports.registration = asyncHandeler(async (req, res) => {
  const value = await validateUser(req);
  // console.log(value);

  // now sava the data into database
  const { fristName, email, password } = value;
  const user = await new User({
    fristName,
    email,
    password,
  }).save();

  if (!user) {
    throw new customError(500, "Registration Failed");
  }
  const verificationLInk = `http://localhost:5157/verifyemail/`;
  const template = RegistrationMailTemplate(fristName, verificationLInk);
  await mailSender(email, template);

  apiResponse.senSuccess(res, 201, "Registration Successfull", {
    fristName,
    email,
  });
});

/**
 * todo : Login---> this function will work for login
 * */

exports.Login = asyncHandeler(async (req, res) => {
  const value = await validateUser(req);
  const { email, phoneNumber, password } = value;
  const user = await userModel.findOne({
    $or: [{ email: email }, { phoneNumber: phoneNumber }],
  });
  const resultOfPassword = await user.compareHashPassword(password);
  if (!resultOfPassword) {
    throw new customError(400, "Your Password or Email is Incorrect")
  } 

  // if password correct
  // make access token and refresh token
  const accesstoken = await user.grnerateAccessToken();
  const refreshToken = await user.grnerateRefressToken();

  const isProduction = process.env.NODE_ENV === "production"; 
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction? true : false,
    sameSite: "none",
    path: "/",
    maxAge: 15 * 24 * 60 * 60 * 1000, //---->> 15days
  });
  


  apiResponse.senSuccess(res, 200, "login Sucessfull", {
    accesstoken: accesstoken,
    usename: user.fristName,
    email: user.email,
  });
});
