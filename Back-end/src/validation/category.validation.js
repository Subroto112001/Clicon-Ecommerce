const { customError } = require("../utils/customError");
const Joi = require("joi");

const categoryValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Category name is required",
    "any.required": "Category name is required",
    "string.trim": "Category name should not contain extra spaces",
  }),
  
}).options({
  abortEarly: true,
  allowUnknown: true,
});

exports.validateCategory = async (req) => {
  try {
    const value = await categoryValidationSchema.validateAsync(req.body);
    if (req.files?.length == 0) {
    throw new customError(401, "Image not found")
  }
    
    // return value;
  } catch (error) {
    console.log("Error from category validation", error.details[0].message);
    throw new customError(
      404,
      `Category validation failed: ${error.details[0].message}`
    );
  }
};
