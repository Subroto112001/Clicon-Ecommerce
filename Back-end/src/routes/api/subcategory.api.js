const express = require("express");
const categoryController = require("../../controller/category.controller");
const { upload } = require("../../midleware/multer.midleware");
const subcategorycontroller = require ('../../controller/Subcategory.controller');
const _ = express.Router();



_.route("/create-subcategory").post(subcategorycontroller.createsubcategory);
_.route("/getall-subcategory").get(subcategorycontroller.getallsubcategory);
_.route("/getSingle-subcategory/:slug").get(subcategorycontroller.getSinglesubcategory);



module.exports = _;
