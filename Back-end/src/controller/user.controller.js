const User = require("../models/user.model");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");
const { asyncHandeler } = require("../utils/asyncHandeler");

const { validateUser } = require("../validation/user.validation");
const { mailSender, smsSender } = require("../helpers/helper");
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

  const { fristName, email, password, phoneNumber } = value;
  if (email === undefined && phoneNumber === undefined) {
    throw new customError(401, "Email or PhoneNumber is required");
  }

  const user = await new User({
    fristName,
    email: email || null,
    phoneNumber: phoneNumber || null,
    password,
  }).save();

  if (!user) {
    throw new customError(500, "Registration Failed");
  }

  const otp = crypto.randomInt(100000, 999999);
  const otpExpireTime = Date.now() + 10 * 60 * 1000;
  if (user.email) {
    const verificationLInk = `http://localhost:5157/verifyemail/${email}`;
    const template = RegistrationMailTemplate(
      fristName,
      verificationLInk,
      otp,
      otpExpireTime
    );

   try {
     await mailSender(email, template);
   } catch (error) {
     console.error("Email sending failed:", error);
     // Don't throw error, continue with registration
   }
  }

  // phone number

  if (user.phoneNumber) {
    const verificationLInk = `http://localhost:5157/verifyphone/${phoneNumber}`;

    const smsBody = `Hey ${fristName} 
your code is ${otp} and it will expire on ${new Date(
      otpExpireTime
    ).toLocaleString()}
-Clicon`;
    
    
    
    // that is not working... 31mi in video
    try {
      const smsResponse = await smsSender(phoneNumber, smsBody);
      console.log("SMS Response:", smsResponse);
    } catch (error) {
      console.error("SMS sending failed:", error);
      // Don't throw error, continue with registration
    }
  }

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
      phoneNumber: phoneNumber
        ? phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")
        : null, // Mask phone number
    }
  );
});

/**
 * todo : Login---> this function will work for login
 * */

exports.Login = asyncHandeler(async (req, res) => {
  const value = await validateUser(req);
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
exports.VerificationUserContact = asyncHandeler(async (req, res) => {
  const { otp, email, phoneNumber } = req.body;
  if (!otp && !email) {
    throw new customError(401, "Otp or Email not found");
  }
  if (email) {
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
  }
  if (phoneNumber) {
    const findUser = await User.findOne({
      $and: [
        { phoneNumber: phoneNumber },
        { resetPasswordOtp: otp },
        { resetPasswordExpireTime: { $gt: Date.now() } },
      ],
    });
    if (!findUser) {
      throw new customError(401, "Otp Or time Expire, Try Again!");
    }
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
  console.log("From controller", req.user);

  // now find the user

  const finduser = await User.findById(req.user.id);
  console.log(finduser);
  if (!finduser) {
    throw new customError(401, "User Not Found");
  }

  // now clear the cookie

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: isProduction ? true : false,
    sameSite: "none",
    path: "/",
  });

  finduser.refressToken = null;
  await finduser.save();
  apiResponse.senSuccess(res, 200, "Logout Successfull");
});

/**
 * todo : getme --------------> this function will show to user their data
 * */
exports.getme = asyncHandeler(async (req, res) => {
  const id = req.user.id;
  const finduser = await User.findById(id);
  console.log(finduser);
  if (!finduser) {
    throw new customError(401, "User not found");
  }
  apiResponse.senSuccess(res, 200, "User Get Successfull", finduser);
});

/**
 * todo : refreshtoken -----> making a refresh token and save it database
 * */

exports.getrefreshtoken = asyncHandeler(async (req, res) => {
  const token = req.headers.cookie.replace("refreshToken=", " ");
  console.log(token);

  if (!token) {
    throw new customError(401, "Token not found");
  }

  const finduser = await User.findOne({ refressToken: token });

  if (!finduser) {
    throw new customError(401, "user not found");
  }

  const accesstoken = finduser.generateAccessToken();

  apiResponse.senSuccess(res, 200, "Login Successful", {
    accessToken: accesstoken,
    username: finduser.fristName,
    email: finduser.email,
  });
});
