const { apiResponse } = require("../utils/apiResponse");
const { asyncHandeler } = require("../utils/asyncHandeler");

exports.hello = asyncHandeler((req, res) => {
  apiResponse.senSuccess(res, 201, "allok", {data: "lhfsdkj"})
  });
;
