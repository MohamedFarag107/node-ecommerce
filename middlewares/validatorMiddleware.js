const expressAsyncHandler = require("express-async-handler");
const {validationResult} = require("express-validator");
const {StatusCodes} = require("http-status-codes");
exports.validatorMiddleware = expressAsyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({errors : errors.array()});
  }

  next();
});
