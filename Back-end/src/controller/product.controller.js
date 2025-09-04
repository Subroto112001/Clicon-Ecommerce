const { asyncHandeler } = require("../utils/asyncHandeler");
const productModel = require("../models/product.model.js");
const { uploadImageColude } = require("../helpers/Coludinary");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");
const { validateProduct } = require("../validation/product.validation.js");
const { generateProductqrcode } = require("../helpers/qrCodeGenerator.js");
const { barcodeGenerator } = require("../helpers/barcodeGenerator.js");

// @desc create product function
exports.createProduct = asyncHandeler(async (req, res) => {
  const { name, description, price, category } = req.body;

  // Validate request body
  const data = await validateProduct(req);
  if (!data) {
    throw new customError(400, "validation failed");
  }
  let AllImageArray = [];
  for (let image of data.images) {
    const imageAsset = await uploadImageColude(image.path);
    AllImageArray.push(imageAsset);
  }
  // now save the data into database
  const product = await productModel.create({ ...data, image: AllImageArray });
  if (!product) {
    throw new customError(404, "Product not created");
  }
  // generate qr code
  const qrcodelink = `${process.env.FONT_END_URL}`;

  const qrCode = await generateProductqrcode(qrcodelink);
  console.log("Qrcode is :-", qrCode);

  // generate barcode
  const barcodeText = `${product.sku}-${product.name.slice(0, 3)}-${new Date()
    .toString()
    .slice(0, 4)}`;
  const barcode = await barcodeGenerator("barcodeText");

  console.log("Barcode is :- ", barcode);
  product.qrCode = qrCode;
  product.barCode = barcode;
  await product.save();
  // Send response
  console.log("Created SUccessFully");
  apiResponse.senSuccess(res, 201, "Product created successfully", product);
});

// @desc get all product
exports.getAllProducts = asyncHandeler(async (req, res) => {
  const products = await productModel
    .find()
    .sort({ createdAt: -1 })
    .populate({
      path: "category",
    })

    .populate({
      path: "brand",
    });
  if (!products || products.length === 0) {
    throw new customError(404, "No products found");
  }
  apiResponse.senSuccess(res, 200, "Products fetched successfully", products);
});

// @desc get single product
exports.getSingleProduct = asyncHandeler(async (req, res) => {
  const { slug } = req.params;
  const product = await productModel.findOne({ slug });
  if (!product) {
    throw new customError(404, "Product not found");
  }
  apiResponse.senSuccess(res, 200, "Product fetched successfully", product);
});
