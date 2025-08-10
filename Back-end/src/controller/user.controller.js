const User = require("../models/user.model");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");
const { asyncHandeler } = require("../utils/asyncHandeler");

const { validateUser } = require("../validation/user.validation");
const { mailSender } = require("../helpers/helper");
const {
  RegistrationMailTemplate,
  resetPasswordTemplate,
} = require("../TemplateEmail/Template");
const userModel = require("../models/user.model");
const crypto = require("crypto");
const { date } = require("joi");

/**
 * todo : registration -----> this function will work for registration
 * */

exports.registration = asyncHandeler(async (req, res) => {
  const value = await validateUser(req);

  const { fristName, email, password } = value;

  
  const user = await new User({
    fristName,
    email,
    password,
  }).save();

  if (!user) {
    throw new customError(500, "Registration Failed");
  }

  const otp = crypto.randomInt(100000, 999999);
  const otpExpireTime = Date.now() + 10 * 60 * 60 * 1000;

  const verificationLInk = `http://localhost:5157/verifyemail/`;
  const template = RegistrationMailTemplate(
    fristName,
    verificationLInk,
    otp,
    otpExpireTime
  );

  await mailSender(email, template);

  
  await User.updateOne(
    { _id: user._id },
    { resetPasswordOtp: otp, resetPasswordExpireTime: otpExpireTime }
  );

  apiResponse.senSuccess(
    res,
    201,
    "Registration Successfull Check Your Email",
    {
      fristName,
      email,
    }
  );
});

/**
 * todo : Login---> this function will work for login
 * */

exports.Login = asyncHandeler(async (req, res) => {
  const value = await validateUser(req)
  const { email, phoneNumber, password } = value;


  const user = await userModel.findOne({
    $or: [{ email }, { phoneNumber }],
  });
 

  if (!user) {
    throw new customError(400, "User not found");
  }

  const resultOfPassword = await user.compareHashPassword(password);
  if (!resultOfPassword) {
    throw new customError(400, "Your Password or Email is Incorrect");
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    path: "/",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });

  user.refressToken = refreshToken;
  await user.save();

  apiResponse.senSuccess(res, 200, "Login Successful", {
    accessToken,
    username: user.fristName,
    email: user.email,
  });
});


/**
 * todo : Email Veryfication ---------> this fucntion will work for email veryfication
 * */
exports.emailVerification = asyncHandeler(async (req, res) => {
  const { otp, email } = req.body;
  if (!otp && !email) {
    throw new customError(401, "Otp or Email not found");
  }
  const findUser = await User.findOne({
    $and: [
      { email: email },
      { resetPasswordOtp: otp },
      { resetPasswordExpireTime: { $gt: Date.now() } },
    ],
  });
  if (!findUser) {
    throw new customError(401, "Otp Or time Expire, Try Again!");
  }
  findUser.resetPasswordExpireTime = null;
  findUser.resetPasswordOtp = null;
  findUser.isEmailverifyed = true;
  apiResponse.senSuccess(res, 200, "Email Verification Sucessfull", {
    email: findUser.email,
    fristName: findUser.fristName,
  });
  console.log(findUser);
});

/**
 * todo : Forgot Password -------> this function will work for forgot password
 * */
exports.forgotPassword = asyncHandeler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new customError(401, "Email Missing");
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    throw new customError(401, "User not found");
  }

  // here we will geenrate a otp

  const otp = crypto.randomInt(100000, 999999);
  const otpExpireTime = Date.now() + 10 * 60 * 60 * 1000;
  const verificationLInk = `http://localhost:5157/reset-password/${email}`;
  const template = resetPasswordTemplate(
    user.fristName,
    verificationLInk,
    otp,
    otpExpireTime
  );
  await mailSender(email, template);
  apiResponse.senSuccess(res, 301, "Check Your Email", null);
});

/**
 * todo : Reset Password -----------> this function will work for reset password
 **/
exports.resetPassword = asyncHandeler(async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (!email) {
    throw new customError(401, "Email is missing");
  }
  if (!newPassword) {
    throw new customError(401, "Newpassword is missing");
  }

  if (!confirmPassword) {
    throw new customError(401, "Confirm Password is missing");
  }

  if (newPassword !== confirmPassword) {
    throw new customError(401, "newpassword and confirm password don't match!");
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    throw new customError(401, "Your Email not found!");
  }

  user.password = newPassword;
  user.resetPasswordExpireTime = null;
  user.resetPasswordOtp = null;
  await user.save();
  apiResponse.senSuccess(res, 200, "Password reset successfully");
});

/**
 * todo : Logout ------------> this function will work for Log out
 * */
exports.logout = asyncHandeler(async (req, res) => {

console.log("From controller",req.user);


  
  // now find the user

  const finduser = await User.findById(req.user.id);
  console.log(finduser);
  if (!finduser) {
    throw new customError(401, "User Not Found")
  }






// now clear the cookie
  
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: isProduction ? true : false,
    sameSite: "none",
    path: "/",
  });


  finduser.refressToken = null;
  await finduser.save()
  apiResponse.senSuccess(res,200, "Logout Successfull", )
});

/**
 * todo : getme --------------> this function will show to user their data
 * */
exports.getme = asyncHandeler(async (req, res) => {
  const id = req.user.id
  const finduser = await User.findById(id);
  console.log(finduser);
  if (!finduser) {
    throw new customError(401, "User not found")
  }
  apiResponse.senSuccess(res, 200, "User Get Successfull", finduser)
})