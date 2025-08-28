require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { customError } = require("../utils/customError");
const slugify = require("slugify");

const brandSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
    },
    image: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Middleware: generate slug from name
brandSchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      replacement: "-",
      lower: false,
      strict: false,
    });
  }
  next();
});

// Middleware: check duplicate slug
brandSchema.pre("save", async function (next) {
  const existingBrand = await this.constructor.findOne({ slug: this.slug });

  if (existingBrand && existingBrand._id.toString() !== this._id.toString()) {
    throw new customError(400, "Brand name already exists");
  }
  next();
});

// Sorting middleware
const brandSorting = async function (next) {
  this.sort({ createdAt: -1 });
  next();
};

brandSchema.pre("find", brandSorting);

module.exports = mongoose.models.Brand || mongoose.model("Brand", brandSchema);
