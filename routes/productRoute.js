const express = require("express");

const router = express.Router();

const {
  createProduct,
  findAllProduct,
  findSingleProduct,
  updateProduct,
  deleteProduct,
  getProductStats,
} = require("./../controllers/productController");

// product-stats
router.get("/product-stats", getProductStats);

router.post("/products", createProduct);
router.get("/products", findAllProduct);
router.get("/products/:productId", findSingleProduct);
router.put("/products/:productId", updateProduct);
router.delete("/products/:productId", deleteProduct);

module.exports = router;
