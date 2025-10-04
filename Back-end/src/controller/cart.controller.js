const { asyncHandeler } = require("../utils/asyncHandeler");
const { validateCategory } = require("../validation/category.validation");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");
const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");
const variantMOdel = require("../models/variant.model");
const { validateCart } = require("../validation/cart.validation");

// @desc Add to cart
exports.addToCart = asyncHandeler(async (req, res) => {
  const value = await validateCart(req);
  const { user, guestId, product, variant, quantity, coupon } = value;

  let productObj = null;
  let variantObj = null;
  let price = 0;

  // extract price from product or variant
  if (product) {
    productObj = await productModel.findById(product);
    price = productObj.retailPrice;
  }
  if (variant) {
    variantObj = await variantMOdel.findById(variant);
    price = variantObj.retailPrice;
  }
  //   if user or guestId Already exist or not in cart model

  const cartQuery = user ? { user: user } : { guestId: guestId };
  const cart = await cartModel.findOne({ cartQuery });
  if (!cart) {
    cart = new cartModel({
      user: user || null,
      guestId: guestId || null,
      items: [],
      coupon: coupon || null,
    });
    }
    
    // check if product already exists in cart
    let findIndex = -1;
    if (productObj) {
         findIndex = cart.items.findIndex((item)=>item.product.toString()===productObj._id.toString() )
    }
    if (variantObj) {
        findIndex = cart.items.findIndex((item)=>item.variant.toString()===variantObj._id.toString() )
    }
});
