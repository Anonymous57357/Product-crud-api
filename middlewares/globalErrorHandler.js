const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./../utils/CustomApiError");
const devError = (res, err) => {
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
    stackTrace: err.stack,
    error: err,
  });
};

const prodError = (res, err) => {
  // check if operational (property) and handleing the error
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  } else {
    // not handled give the generic error
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Something went wrong please try again later",
    });
  }
};

const validationError = (err) => {
  const errors = Object.values(err.errors).map((val) => val.message);
  const errorMessage = errors.join(". ");
  const msg = `Invalid data input ${errorMessage}`;
  return new CustomApiError(msg, StatusCodes.BAD_REQUEST);
};

const castError = (err) => {
  const msg = `Invalid id make sure check the ${err.path} and value ${err.value}`;
  return new CustomApiError(msg, StatusCodes.BAD_REQUEST);
};

const globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  error.status = error.status || "error";

  // development errors

  if (process.env.NODE_ENV === "development") {
    devError(res, error);
  } else if (process.env.NODE_ENV === "production") {
    if (error.name === "ValidationError") error = validationError(error);
    if (error.name === "CastError") error = castError(error);
  }
  // production errors --> orcompare the isOperational boolean property to divide the if the error handled give the operational customized error if the error not handled give the generic
  // logging robuting and scalable errors in the produciton environment

  prodError(res, error);
};

module.exports = globalErrorHandler;
