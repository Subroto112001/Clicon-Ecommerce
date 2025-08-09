const { customError } = require("../utils/customError");

const Joi = require("joi");

const userValidationSchema = Joi.object({
  fristName: Joi.string().trim().empty().messages({
    "string.empty": "Name is required",

    "name.trim": "Name fill with extra spaces",
  }),
  email: Joi.string()

    .trim()
    .empty()
    .pattern(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
    .messages({
      "string.empty": "Email is required",
      "any.required": "Email is required",
      "string.trim": "Email Should not contain extra spaces",
      "string.pattern.base": "Email format is invalid",
    }),
  phoneNumber: Joi.string()
    .trim()
    .optional()

    .pattern(/^(?:\+880|880|01)[3-9]\d{8}$/)
    .messages({
      "any.required": "Phone number is required",
      "string.trim":
        "Phone number should not contain leading or trailing spaces",
      "string.pattern.base":
        "Phone number must be a valid Bangladeshi number (e.g. +88017XXXXXXXX or 017XXXXXXXX)",
    }),

  password: Joi.string()
    .trim()
    .required()
    .empty()
    .pattern(
      new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,16}$/)
    )
    .messages({
      "string.empty": "Password is required",
      "string.trim": "Password should not contain extra spaces.",
      "any.required": "Password is required",
      "string.pattern.base":
        "Password msut be 8-16 characters long, include at least one number and one special character(!@#$%^&*)",
    }),
}).options({
  abortEarly: true,
  allowUnknown: true, // <<------ this function will work for allow unknown fields
});

exports.validateUser = async (req) => {
  try {
    const value = await userValidationSchema.validateAsync(req.body);

    
    return value;
  } catch (error) {
    console.log("Error from validation", 404);
    throw new customError(404, `User validation failed ${error}`);
  }
};
