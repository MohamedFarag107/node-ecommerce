const {StatusCodes} = require("http-status-codes");
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleDuplicateKeyError = (schema,
                                 type) => schema.post(type, function(error, doc,
                                                                     next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    const fieldName = Object.keys(error.keyValue)[0];
    next(new ApiError(
        `'${fieldName}' value must be unique. The value '${
            error.keyValue
                [fieldName]}' is already in use. Please choose a different value.`,
        StatusCodes.CONFLICT));
  } else {
    next(error);
  }
});

const errorHandler = (err) => ({
  statusCode : err.statusCode || StatusCodes.BAD_REQUEST,
  message : err.message || "bad request",
  stack : err.stack,
});

const developmentError = (err, res) => {
  const {statusCode, message, stack} = errorHandler(err);
  res.status(statusCode).json({
    statusCode,
    message,
    stack,
  });
};

const productionError = (err, res) => {
  const {statusCode, message} = errorHandler(err);
  res.status(statusCode).json({
    statusCode,
    message,
  });
};

module.exports = {
  ApiError,
  handleDuplicateKeyError,
  developmentError,
  productionError,
};
