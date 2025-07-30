const { apiResponse } = require("../utils/apiResponse");
const { asyncHandeler } = require("../utils/asyncHandeler");
const { customError } = require("../utils/customError");

exports.hello = asyncHandeler((req, res) => {
  throw new customError(401, "email missing")
 
  
  });
;
