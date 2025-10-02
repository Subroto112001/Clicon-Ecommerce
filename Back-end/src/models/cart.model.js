require("dotenv").config();
const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { customError } = require("../utils/customError");

// Cart Item Schema
const cartItemSchema = new Schema(
  {
    product: {
      type: Types.ObjectId,
      ref: "Product", // Assuming you have a Product model
      required: true,
    },
    variant: {
      type: Types.ObjectId,
      ref: "Variant", // If you have product variants
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
    price: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

// Cart Schema
const cartSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    guestId: {
      type: String,
    },
    items: [cartItemSchema],
    coupon: {
      type: Types.ObjectId,
      ref: "Coupon",
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    totalSubtotal: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Middleware to auto-calculate totalSubtotal
cartSchema.pre("save", function (next) {
  this.totalSubtotal = this.items.reduce((acc, item) => acc + item.subtotal, 0);
  next();
});

module.exports = mongoose.model("Cart", cartSchema);
