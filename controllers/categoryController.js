const CategoryModel = require("../models/categoryModel");
const {
  createOne,
  updateOne,
  deleteOne,
  getOne,
  getAll,
} = require("./factory");

// category controller

// @desc    Create Category
// @method  POST
// @access  Private
exports.createCategory = createOne(CategoryModel);

// @desc    Update Category
// @method  PUT
// @access  Private
exports.updateCategory = updateOne(CategoryModel);

// @desc    Delete Category
// @method  DELETE
// @access  Private
exports.deleteCategory = deleteOne(CategoryModel);

// @desc    Get One Category
// @method  GET
// @access  PUBLIC
exports.getCategory = getOne(CategoryModel);

// @desc    Get All Categories
// @method  GET
// @access  PUBLIC
exports.getAllCategories = getAll(CategoryModel);
