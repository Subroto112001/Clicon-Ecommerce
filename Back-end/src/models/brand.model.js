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
    image: {},
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



// ✅ Also handle slug in update queries
brandSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.name) {
    const newSlug = slugify(update.name, {
      replacement: "-",
      lower: true,
      strict: true,
    });

    // check duplicate slug
    const existingBrand = await this.model.findOne({ slug: newSlug });
    if (existingBrand && existingBrand._id.toString() !== this.getQuery()._id?.toString()) {
      throw new customError(400, "Brand name already exists");
    }

    update.slug = newSlug; // ✅ assign new slug
    this.setUpdate(update);
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
