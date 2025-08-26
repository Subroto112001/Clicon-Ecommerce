require("dotenv").config();
const fs = require("fs");
const { customError } = require("../utils/customError");
const { asyncHandeler } = require("../utils/asyncHandeler");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.CLOUDE_API_KEYS,
  api_secret: process.env.CLOUDE_API_SECRET,
});

// now upload image

exports.uploadImageColude = async (filePath) => {
    try {
        if (!filePath && !fs.existsSync(filePath)) {
            throw new customError('file path missing');
        }

        // upload image
        const image = await cloudinary.uploader.upload(filePath, {
            resource_type: "image",
            quality: "auto"
        })


        if (image) {
          fs.unlinkSync(filePath);
          return { public_id: image.public_id, secure_url: image.secure_url };
        }
        console.log(image);
        

    } catch (error) {
         if (!fs.existsSync(filePath)) {
           fs.unlinkSync(filePath);
           return { public_id: image.public_id, secure_url: image.secure_url };
         }
        console.error('Error from coludinary file upload:', error);
        throw new customError(500, "Server Error from coludinary file upload");
    }

}



// @desc delete coludinary image
exports.deleteColudinaryImage = asyncHandeler(async (public_id) => {
  try {
    const responseFordelete = await cloudinary.uploader.destroy(public_id, {
      resource_type: "image",
      quality: "auto",
    });
    return responseFordelete;
  } catch (error) {
    console.error('Error:', error);
    throw new customError(500, "Error form coludinary image", error.message);
}
})