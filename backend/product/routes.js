/**
 * Set up the product routes for the RESTful API
 */
const express = require("express");
const router = express.Router();
const {
  getProduct,
  getProductData,
  postProduct,
  putProduct,
  deleteProduct,
} = require("./controller");

router.get("/", getProduct); // Get all products
router.get("/:id", getProductData); // Get a specific product by id
router.post("/", postProduct); // Create a new product
router.put("/:id", putProduct); // Update an existing product by id
router.delete("/:id", deleteProduct);// Delete a product by id

module.exports = router;
