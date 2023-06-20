const expressAsyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { ApiError } = require("../utils/errors/apiError");
const ApiFeatures = require("../utils/apiFeatures");

// @desc create one element
exports.createOne = (Model) =>
  expressAsyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(StatusCodes.CREATED).json({
      data: doc,
    });
  });

// @desc update one element
exports.updateOne = (Model) =>
  expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!doc) {
      return next(new ApiError("not found", StatusCodes.NOT_FOUND));
    }
    res.status(StatusCodes.CREATED).json({
      data: doc,
    });
  });

// @desc delete one element
exports.deleteOne = (Model) =>
  expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) {
      return next(new ApiError("not found", StatusCodes.NOT_FOUND));
    }
    res.status(StatusCodes.NO_CONTENT).json({});
  });

// @desc get one element
exports.getOne = (Model) =>
  expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findById(id);
    if (!doc) {
      return next(new ApiError("not found", StatusCodes.NOT_FOUND));
    }
    res.status(200).json({
      data: doc,
    });
  });

// @desc get all elements
exports.getAll = (Model, modelName = "") =>
  expressAsyncHandler(async (req, res, next) => {
    // build mongooseQuery
    const mongooseQuery = Model.find({});
    const count = await Model.count();
    const queryString = req.query;
    const apiFeatures = new ApiFeatures(mongooseQuery, queryString)
      .paginate({ countDocs: count })
      .filter()
      .search(modelName)
      .limitFields()
      .sort();
    const { mongooseQuery: result, paginationResult } = apiFeatures;
    // execute mongooseQuery
    const docs = await result;

    res.status(StatusCodes.CREATED).json({
      paginationResult: {
        ...paginationResult,
        result: docs.length,
        total: count,
      },
      data: docs,
    });
  });
