const express = require("express");

const router = express.Router();

const {
  createProduct,
  findAllProduct,
  findSingleProduct,
  updateProduct,
  deleteProduct,
} = require("./../controllers/productController");

router.post("/products", createProduct);
router.get("/products", findAllProduct);
router.get("/products/:productId", findSingleProduct);
router.put("/products/:productId", updateProduct);
router.delete("/products/:productId", deleteProduct);

module.exports = router;
