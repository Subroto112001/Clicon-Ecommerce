const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const bcrypt = require("bcrypt");
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
      type : Boolean
  }
});


// schema model middleware

userSchema.pre('save', async function(next) {
    if (this.isModified("password")) {
        const saltPassword = await bcrypt.hash(this.password, 10)
        this.password = saltPassword;
    }
    next()
})

 module.exports = mongoose.model("User", userSchema)
