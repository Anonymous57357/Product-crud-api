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
    /* ************************************************************** */
    // api features
    // filter
    // excluding query fields
    // Mongoose 6.0 or less
    // const excludedFields = ["sort", "page", "limit", "fields"];
    // const queryObj = { ...req.query };

    // excludedFields.forEach((el) => {
    //   delete queryObj[el];
    // });
    // const product = await Product.find(queryObj);
    /* ************************************************************** */

    console.log(req.query);
    let queryStr = JSON.stringify(req.query);
    // gte, gt, lte, lt
    queryStr = queryStr.replace(
      /\b(gte| gt| lte| lt)\b/g,
      (match) => `$${match}`
    );
    const queryObj = JSON.parse(queryStr);
    // console.log(queryObj);

    const product = await Product.find(queryObj);
    // let query = Product.find(queryObj);

    // if (req.query.sort) {
    //   const sortBy = req.query.sort;
    //   console.log(sortBy);
    //   query = query.sort(sortBy);
    //   // query.sort("quantity")
    // }

    // const product = await query;
    // sorting

    // advance filtering
    // find({price: {$gte: 20}, quantity: {$lte: 2}, })

    // const product = await Product.find()
    //   .where("quantity")
    //   .equals(req.query.quantity)
    //   .where("price")
    //   .equals(req.query.price);
    // const product = await Product.find()
    //   .where("quantity")
    //   .gte(req.query.duration)
    //   .where("price")
    //   .gte(req.query.price);

    res.status(200).json({
      status: "success",
      results: product.length,
      data: {
        product,
      },
    });
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

// aggregation pipeline
const getProductStats = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      { $match: { quantity: { $gte: 3 } } },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
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
  getProductStats,
};
