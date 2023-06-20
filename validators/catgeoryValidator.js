const {check} = require("express-validator");
const {validatorMiddleware} = require("../middlewares/validatorMiddleware");
// name:  image:subCategories
exports.createCategoryValidator = [
  check("name")
      .notEmpty()
      .withMessage("category name is required")
      .isString()
      .withMessage("category name must be string"),
  check("image")
      .notEmpty()
      .withMessage("category image is required")
      .isString()
      .withMessage("category image must be string"),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("name")
      .optional()
      .notEmpty()
      .withMessage("category name is required")
      .isString()
      .withMessage("category name must be string"),
  check("image")
      .optional()
      .notEmpty()
      .withMessage("category image is required")
      .isString()
      .withMessage("category image must be string"),
  validatorMiddleware,
];
exports.deleteCategoryValidator = [
  check("id")
      .notEmpty()
      .withMessage("category id is required")
      .isMongoId()
      .withMessage("category id must be mongo id"),
  validatorMiddleware,
];
exports.getCategoryValidator = [
  check("id")
      .notEmpty()
      .withMessage("category id is required")
      .isMongoId()
      .withMessage("category id must be mongo id"),
  validatorMiddleware,
];
exports.getAllCategoriesValidator = [
  check("limit").optional().isNumeric().withMessage("limit must be numeric"),
  check("page").optional().isNumeric().withMessage("page must be numeric"),
  validatorMiddleware,
];
