const { customError } = require("../utils/customError");
const Joi = require("joi");

// Joi schema for Cart Validation
const cartValidationSchema = Joi.object({
  user: Joi.string().optional(), // ObjectId string
  guestId: Joi.string().optional(),

  items: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required().messages({
          "string.empty": "Product ID is required",
          "any.required": "Product ID is required",
        }),
        variant: Joi.string().optional().allow(null),
        quantity: Joi.number().integer().min(1).required().messages({
          "number.base": "Quantity must be a number",
          "number.min": "Quantity must be at least 1",
          "any.required": "Quantity is required",
        }),
        price: Joi.number().min(0).required().messages({
          "number.base": "Price must be a number",
          "any.required": "Price is required",
        }),
        totalPrice: Joi.number().min(0).required().messages({
          "number.base": "Total price must be a number",
          "any.required": "Total price is required",
        }),
        color: Joi.string().required().messages({
          "string.empty": "Color is required",
          "any.required": "Color is required",
        }),
        size: Joi.string().required().messages({
          "string.empty": "Size is required",
          "any.required": "Size is required",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Items must be an array",
      "array.min": "Cart must contain at least one item",
      "any.required": "Items are required",
    }),

  coupon: Joi.string().optional(),
  discountPrice: Joi.number().min(0).default(0),
  discountPercentage: Joi.number().min(0).max(100).default(0),
  totalAmountOfWholeProduct: Joi.number().min(0).default(0),
}).options({
  abortEarly: true,
  allowUnknown: true,
});

// Validation function
exports.validateCart = async (req) => {
  try {
    const value = await cartValidationSchema.validateAsync(req.body);
    return value;
  } catch (error) {
    if (error.details) {
      console.log("Error from cart validation:", error.details[0].message);
      throw new customError(
        404,
        `Cart validation failed: ${error.details[0].message}`
      );
    } else {
      console.log("Error from validateCart:", error);
      throw new customError(401, `Cart validation failed: ${error.message}`);
    }
  }
};
