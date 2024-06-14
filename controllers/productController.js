const Product = require("./../models/productModel");
const asyncErrorHandler = require("./../utils/asyncErrorHandler");
const CustomApiError = require("./../utils/CustomApiError");
const { StatusCodes } = require("http-status-codes");
const loggers = require("./../utils/loggers");

// METHOD : POST
// URL: http://localhost:4000/api/v1/products
const createProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  const getProduct = "http://localhost:4000/api/v1/products";
  loggers.info("Product Created Successfully"),
    res.status(StatusCodes.OK).json({
      status: "success",
      status: {
        data: product,
        message: `where to go from here URL: ${getProduct}`,
      },
    });
});

// METHOD : GET
// URL: http://localhost:4000/api/v1/products
const findAllProduct = asyncErrorHandler(async (req, res) => {
  const product = await Product.find();
  loggers.info("Getting all Products Successfully"),
    res.status(StatusCodes.OK).json({
      status: "success",
      count: product.length,
      data: {
        product,
      },
    });
});

// METHOD : GET
// URL: http://localhost:4000/api/v1/products/:id
const findSingleProduct = asyncErrorHandler(async (req, res) => {
  const id = req.params.productId;
  const product = await Product.findById(id);
  loggers.info("Getting Single Products Successfully"),
    res.status(StatusCodes.OK).json({
      status: "success",
      count: product.length,
      data: {
        product,
      },
    });
});

// METHOD : PUT
// URL: http://localhost:4000/api/v1/products:/id
const updateProduct = asyncErrorHandler(async (req, res) => {
  const id = req.params.productId;
  const { name, price } = req.body;
  const product = await Product.findByIdAndUpdate(id, { name, price });
  loggers.info("Products Updated Successfully"),
    res.status(StatusCodes.OK).json({
      status: "success",
      data: {
        product,
      },
    });
});

// METHOD : DELETE
// URL: http://localhost:4000/api/v1/products:/id
const deleteProduct = asyncErrorHandler(async (req, res) => {
  const id = req.params.productId;
  const product = await Product.findByIdAndDelete(id);
  loggers.info("Products Deleted"),
    res.status(StatusCodes.OK).json({
      status: "success",
      data: null,
      message: `where to go from here URL: ${createProduct}`,
    });
});

// METHOD : GET
// URL: http://localhost:4000/api/v1/products
const getProductStats = asyncErrorHandler(async (req, res) => {
  const stats = await Product.aggregate([
    { $match: { quantity: { $gte: 3 } } },
  ]);
  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      stats,
    },
  });
});

module.exports = {
  createProduct,
  findAllProduct,
  findSingleProduct,
  updateProduct,
  deleteProduct,
  getProductStats,
};
