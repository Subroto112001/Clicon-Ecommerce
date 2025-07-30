const express = require("express")
const testController = require('../../controller/test.controller')
const _ = express.Router()

_.route("/make-test").get(testController.hello);


module.exports = _;