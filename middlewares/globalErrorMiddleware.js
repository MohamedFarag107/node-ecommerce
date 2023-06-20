const {
  developmentError,
  productionError,
} = require("../utils/errors/apiError");

exports.globalErrorMiddleware = (err, req, res, next) => {
  if (process.env.environment == "development") {
    developmentError(err, res);
    return;
  }
  // production
  productionError(err, res);
};
