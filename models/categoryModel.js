const { Schema, model } = require("mongoose");
const { default: slugify } = require("slugify");
const { handleDuplicateKeyError } = require("../utils/errors/apiError");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "category name is required"],
      unique: [true, "category name must be unique"],
    },
    slug: {
      type: String,
    },
    image: {
      type: String,
      required: [true, "category image is required"],
    },
    subCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// pre('save') middleware hook to update the slug when the name is created
categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name);
  }
  next();
});

// pre('findOneAndUpdate') middleware hook to update the slug when the name is
// updated using findOneAndUpdate
categorySchema.pre("findOneAndUpdate", function (next) {
  if (this._update.name) {
    this._update.slug = slugify(this._update.name);
  }
  next();
});

handleDuplicateKeyError(categorySchema, "save");
handleDuplicateKeyError(categorySchema, "findOneAndUpdate");

const CategoryModel = model("Category", categorySchema);

module.exports = CategoryModel;
