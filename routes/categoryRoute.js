const { Router } = require("express");
const {
  createCategoryValidator,
  getCategoryValidator,
  getAllCategoriesValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../validators/catgeoryValidator");
const {
  createCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const categoryRouter = Router();

categoryRouter
  .route("/")
  .post(createCategoryValidator, createCategory)
  .get(getAllCategoriesValidator, getAllCategories);

categoryRouter
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);


module.exports = categoryRouter