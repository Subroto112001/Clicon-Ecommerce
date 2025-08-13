const multer = require("multer");
const { customError } = require("../utils/customError");
const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
/**
 *title : filefilter
 *@desc : it will filter the image
 */

function fileFilter(req, file, cb) {
  // check mime type
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Only JPG, JPEG, and PNG image files are allowed"));
  }

  // limit number of files
  if (req.file && req.file.length > 1) {
    return cb(new Error("Only one image file is allowed"), false);
  }
  // To accept the file pass `true`, like so:
  cb(null, true);
}

/**
 *title : image store
 *@desc : now it will take the image in storage
 */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    files: 1,
    fileSize: 5 * 1024 * 1024, //max size 5mb
  },
});
module.exports = { upload };
