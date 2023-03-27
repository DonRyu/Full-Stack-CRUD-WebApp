const express = require("express");
const router = express.Router();

function getProductList(req, res) {
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
}

router.get("/get", getProductList);

module.exports = router;
