const { customError } = require("../utils/customError");
const Joi = require("joi");

// ---------------------------
// Product Validation Schema
// ---------------------------
const productValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Product name is required",
    "any.required": "Product name is required",
    "string.trim": "Product name should not contain extra spaces",
  }),

  description: Joi.string().allow("").optional(),
  brand: Joi.string().hex().length(24).allow(null),
  wholeSaleProfitAmount: Joi.number().max(100).optional(),
  retailProfitAmount: Joi.number().max(100).optional(),
  category: Joi.string().required().messages({
    "any.required": "Category is required",
  }),
  tags: Joi.array().items(Joi.string()).optional(),
  reviews: Joi.array().items(Joi.string()).optional(),
}).options({
  abortEarly: true,
  allowUnknown: true,
});

// ---------------------------
// Product Validation Function
// ---------------------------
exports.validateProduct = async (req) => {
  try {
    const value = await productValidationSchema.validateAsync(req.body);

    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
    ];

    /**
     * @desc Check if files exist
     */
    if (!req.files?.image || req.files?.image?.length === 0) {
      throw new customError(401, "Product image not found");
    }

    // Multiple images allowed
    const images = req.files.image;

    for (const imageFile of images) {
      /**
       * @desc Check MIME type
       */
      if (!allowedMimeTypes.includes(imageFile.mimetype)) {
        throw new customError(
          401,
          "Only JPG, JPEG, PNG and GIF files are allowed"
        );
      }

      /**
       * @desc Check file size (max 5MB)
       */
      if (imageFile.size >= 5 * 1024 * 1024) {
        throw new customError(401, "Image size must be below 5MB");
      }
    }

    return { ...value, images: req.files.image };
  } catch (error) {
    if (error.details) {
      console.log("Error from product validation:", error.details[0].message);
      throw new customError(
        404,
        `Product validation failed: ${error.details[0].message}`
      );
    } else {
      console.log("Error from validateProduct:", error);
      throw new customError(401, `Product validation failed: ${error.message}`);
    }
  }
};
