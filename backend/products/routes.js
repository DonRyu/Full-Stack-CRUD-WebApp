const express = require("express");
const router = express.Router();
const {
  getProduct,
  getProductData,
  postProduct,
  putProduct,
  deleteProduct,
} = require("./controller");

router.get("/get", getProduct);
router.get("/get/:id", getProductData);
router.post("/post", postProduct);
router.put("/put", putProduct);
router.delete("/delete", deleteProduct);

module.exports = router;
