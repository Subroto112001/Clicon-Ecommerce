const { asyncHandeler } = require("../utils/asyncHandeler");
const { validateCategory } = require("../validation/category.validation");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");
const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");
const variantMOdel = require("../models/variant.model");
const { validateCart } = require("../validation/cart.validation");
const couponModel = require("../models/cupon.model");

// apply coupon to calculate discount price
const applyCoupn = async (totalPrice = 0, couponCode = "") => {
  try {
    let finalAmount = 0;
    let discountinfo = {};
    const coupon = await couponModel.findOne({ code: couponCode });
    if (!coupon) {
      throw new customError(401, "Coupon not found");
    }
    if (Date.now() > coupon.expire) {
      throw new customError(401, "Coupon is expired");
    }
    if (coupon.usageLimit < coupon.useCount) {
      throw new customError(401, "Coupon usage limit exceeded");
    }

    if (coupon.discountType === "percentage") {
     const discountAmount = (totalPrice * coupon.discountValue) / 100;
      finalAmount = totalPrice - discountAmount;
      coupon.useCount += 1;
      discountinfo.discountType = "percentage";
      discountinfo.discountValue = discountAmount;
    }
    if (coupon.discountType === "tk") {
     const discountAmount = coupon.discountValue;

      finalAmount = totalPrice - discountAmount;
      coupon.useCount += 1;
      
      discountinfo.discountType = "tk";
      discountinfo.discountValue = discountAmount;
    }
    discountinfo.couponId = coupon._id;
    discountinfo.discountAmount = coupon.discountValue;
    
    await coupon.save();
    return { finalAmount, discountinfo };
  } catch (error) {
    console.error("Error:", error);
    throw new customError(401, "Coupon is not valid", error);
  }
};

// @desc Add to cart
exports.addToCart = asyncHandeler(async (req, res) => {
  const value = await validateCart(req);
  const { user, guestId, product, variant, quantity, coupon, color, size } =
    value;

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
  let cart = await cartModel.findOne({ cartQuery });
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
    findIndex = cart.items.findIndex(
      (item) => item.product.toString() === productObj._id.toString()
    );
  }
  if (variantObj) {
    findIndex = cart.items.findIndex(
      (item) => item.variant.toString() === variantObj._id.toString()
    );
  }
  // update the product information to the cart items
  if (findIndex > -1) {
    cart.items[findIndex].quantity += quantity;
    cart.items[findIndex].price += cart.items[findIndex].price * quantity;
  } else {
    cart.items.push({
      product: product ? product : null,
      variant: variant ? variant : null,
      quantity: quantity,
      price: price,
      totalPrice: Math.ceil(price * quantity),
      color: color,
      size: size,
    });
  }

  // now calculate total amount and quantity
  const totalCalculatedReducePrice = cart.items.reduce(
    (accumulator, item) => {
      accumulator.totalPrice += item.totalPrice;
      accumulator.totalQuantity += item.quantity;
      return accumulator;
    },
    {
      totalPrice: 0,
      totalQuantity: 0,
    }
  );


  // if user have coupon
  const { finalAmount, discountinfo } = await applyCoupn(
    totalCalculatedReducePrice.totalPrice,
    coupon
  );
console.log(finalAmount, discountinfo);

  // @desc now update the cart database
cart.coupon = discountinfo.couponId
  cart.totalSubtotal = totalCalculatedReducePrice.totalPrice;
  cart.totalQuantity = totalCalculatedReducePrice.totalQuantity;
  cart.finalAmount = finalAmount;
  cart.discountType = discountinfo.discountType;
  cart.discountPrice = discountinfo.discountValue;
  
 cart.discountAmount = discountinfo.discountAmount;
  cart.save();
  return apiResponse.senSuccess(
    res,
    201,
    "Product added to cart successfully",
    cart
  );
});
