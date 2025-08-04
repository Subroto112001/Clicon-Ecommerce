const { customError } = require("../utils/customError");

const Joi = require("joi");

const userSchema = Joi.object({
  fristName: Joi.string().required().trim().empty().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
    "name.trim": "Name fill with extra spaces",
  }),
  email: Joi.string()
    .required()
    .trim()
    .empty()
    .pattern(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
    .messages({
      "string.empty": "Email is required",
      "any.required": "Email is required",
      "string.trim": "Email Should not contain extra spaces",
      "string.pattern.base": "Email format is invalid",
    }),
  password: Joi.string()
    .required()
    .trim()
    .empty()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,16}$/
      )
    )
    .messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
      "string.trim": "Password Should not contain extra spaces",
      "string.pattern.base":
        "Password msut be 8-16 characters long, include at least one number and one special character(!@#$%^&*)",
    }),
}).options({
  abortEarly: true,
  allowUnknown: true, // <<------ this function will work for allow unknown fields
});

exports.validateUser = async (req) => {
  try {
    const value = await userSchema.validateAsync(req.body);
    return value;
  } catch (error) {
    console.log("Error from validation", 404);
    throw new customError(404, `User validation failed ${error}`);
  }
};
