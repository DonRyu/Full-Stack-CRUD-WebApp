/**
* This file exports an express router that handles incoming HTTP requests related to products
* The available endpoints are:
* GET / : to get all products or filter them based on query parameters
* GET /:id : to get a specific product data by its ID
* POST / : to create a new product
* PUT / : to update an existing product
* DELETE / : to delete an existing product
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

router.get("/", getProduct);
router.get("/:id", getProductData);
router.post("/", postProduct);
router.put("/", putProduct);
router.delete("/", deleteProduct);

module.exports = router;
