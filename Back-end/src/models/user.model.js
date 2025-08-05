const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { customError } = require("../utils/customError");
const userSchema = new Schema({
  fristName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
  },

  compnayName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    trim: true,
  },
  adress: {
    type: String,
    trim: true,
  },
  isEmailverifyed: {
    type: Boolean,
    default: false,
  },
  isPhoneVerifyed: {
    type: Boolean,
  },
  role: {
    type: Types.ObjectId,
    ref: "Role",
  },
  permission: {
    type: Types.ObjectId,
    ref: "Permission",
  },
  region: {
    type: String,
    trim: true,
  },
  distric: {
    type: String,
    trim: true,
  },
  thana: {
    type: String,
    trim: true,
  },
  zipcode: {
    type: Number,
  },
  country: {
    type: String,
    trim: true,
    default: "Bangladesh",
  },
  dateofBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["male", "female", "custom"],
  },
  lastLogin: {
    type: Date,
  },
  lastlogout: {
    type: Date,
  },
  cart: [
    {
      type: Types.ObjectId,
      ref: "Product",
    },
  ],
  wishList: [
    {
      type: Types.ObjectId,
      ref: "Product",
    },
  ],
  newsLetterSubscribe: {
    type: Boolean,
  },
  resetPasswordOtp: {
    type: Number,
  },
  resetPasswordExpireTime: {
    type: Date,
  },
  twoFactorEnable: {
    type: Boolean,
  },
  isBlocked: {
    type: Boolean,
  },
  refressToken: {
    type: String,
    trim: true,
  },
  isActive: {
    type: Boolean,
  },
});

// schema model middleware

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltPassword = await bcrypt.hash(this.password, 10);
    this.password = saltPassword;
  }
  next();
});

//  chack already exist this mail

userSchema.pre("save", async function (next) {
  const findUser = await this.constructor.findOne({ email: this.email });

  if (findUser && findUser._id.toString() !== this._id.toString()) {
    throw new customError(400, "User already exist try another Email");
  }
  next();
});

// generate access token

userSchema.method.grnerateAccessToken = function () {
  const accesstoken = jwt.sign(
    {
      userid: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.ACCESTOKEN_SECRET,
    process.env.ACCESTOKEN_EXPIRE
  );
  return accesstoken;
};

// generate refress token
userSchema.method.grnerateRefressToken = function () {
  const Refresstoken = jwt.sign(
    {
      userid: this._id,
    },
    process.env.REFRESHTOKEN_SECRET,
    process.env.REFRESHTOKEN_EXPIRE
  );
  return Refresstoken;
};

// verify access token
userSchema.method.VerifyAccessToken = function (token) {
  return jwt.verify(token, process.env.ACCESTOKEN_SECRET);
};
// verify refress token
userSchema.method.VerifyRefressToken = function (token) {
  return jwt.verify(token, process.env.REFRESHTOKEN_SECRET);
};

module.exports = mongoose.model("User", userSchema);
