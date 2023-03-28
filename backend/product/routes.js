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
