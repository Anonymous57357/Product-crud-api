const Product = require("./../models/productModel");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
      //   message: err.message,
    });
  }
};

const findAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

const findSingleProduct = async (req, res) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.productId;
    const { name, price, image } = req.body;
    const product = await Product.findByIdAndUpdate(id, { name, price, image });
    if (!product) {
      return res.status(400).json({
        status: "fail",
        message: "Product not found",
      });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.productId;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(400).json({
        status: "fail",
        message: "Product not found",
      });
    }
    res.status(200).json(null);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = {
  createProduct,
  findAllProduct,
  findSingleProduct,
  updateProduct,
  deleteProduct,
};
