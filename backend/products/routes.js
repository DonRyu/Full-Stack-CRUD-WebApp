const express = require("express");
const router = express.Router();

const getProduct = (req, res) => {
  const database = req.context.database;
  const { page, query, queryType } = req.query;
  const data = database.get(query, queryType);
  const perPage = 10;
  const start = (parseInt(page) - 1) * perPage;
  const end = start + perPage;
  const pageData = data.slice(start, end);
  if (pageData) {
    return res.status(200).send({
      pageData: pageData,
      currentPage: page,
      totalPages: Math.ceil(data.length / perPage),
      totalProduct: data.length,
    });
  } else {
    return res.status(500).send({ msg: "error" });
  }
};

const getProductData = (req, res) => {
  const productNumber = req.params.id;
  const database = req.context.database;
  const data = database.getByProductNumber(productNumber);
  if (data) {
    res.status(200).send(data);
  } else {
    return res.status(500).send({ msg: "error" });
  }
};

const postProduct = (req, res) => {
  const database = req.context.database;
  const data = database.post(req.body);
  if (data) {
    return res.status(200).send({ msg: "Successfully Add" });
  } else {
    return res.status(500).send({ msg: "error" });
  }
};

router.get("/get", getProduct);
router.get("/get/:id", getProductData);
router.post("/post", postProduct);

module.exports = router;
