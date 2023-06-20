const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./utils/database/dbConnection");
const {StatusCodes} = require("http-status-codes");
const categoryRouter = require("./routes/categoryRoute");
const {
  globalErrorMiddleware,
} = require("./middlewares/globalErrorMiddleware");
const {ApiError} = require("./utils/errors/apiError");

const PORT = process.env.PORT || 4000;
const app = express();

// setup env
dotenv.config({});

// database connection
dbConnection();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use("/api/v1/category", categoryRouter);

// not found request
app.use("*", (req, res, next) => {
  next(new ApiError(`This Path ${req.originalUrl} Not Found`,
                    StatusCodes.NOT_FOUND));
});

// Global Error Middleware
app.use(globalErrorMiddleware);

app.listen(PORT, () => { console.log(`Server listening on ${PORT}`); });
