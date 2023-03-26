const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/products.json");

const getData = () => {
  let data = fs.readFileSync(filePath, "utf-8");
  let jsonData = JSON.parse(data);
  return jsonData;
};

const getUniqueNumberID = () => {
  const usedNumbers = new Set();
  let randomNum
  let jsonData = getData();
  let idArr = jsonData.map((item) => {
    return item.productNumber;
  });
  idArr.forEach((element) => usedNumbers.add(element));
  do {
    randomNum = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
  } while (usedNumbers.has(randomNum));

  return randomNum;
};

/**
 * this is express handler for get
 */
function getHandler(req, res) {
  const {context, queryParam} = req;
  const {pageCount, pageNo, filter} = queryParam;
  const {database} = context;

  const data = database.get(pageNo, pageCount);
  const {count, totalCount} = database.count(filter);

  let jsonData = getData();
  if (jsonData) {
    res.status(200).send(jsonData);
  } else {
    res.status(500);
  }
}

router.get("/get", getHandler);

router.post("/post", (req, res) => {
  let jsonData = getData();
  let newProductNumber = getUniqueNumberID();
  jsonData.unshift({ productNumber: newProductNumber, ...req.body });
  const jsonString = JSON.stringify(jsonData);
  fs.writeFileSync(filePath, jsonString);
  res.status(200).send({ msg: "Successfully Add" });
});

router.get("/get/:id", (req, res) => {
  const productNumber = req.params.id;
  let jsonData = getData();
  let selectedData = jsonData.filter((item) => {
    return item.productNumber == productNumber
  });
  res.status(200).send(selectedData);
});

router.put("/put", (req, res) => {
  let jsonData = getData();
  let newArr = jsonData.map((item) => {
    if (item.productNumber === req.body?.productNumber) {
      return {
        ...item,
        ...req.body,
      };
    } else {
      return item;
    }
  });
  const jsonString = JSON.stringify(newArr);
  fs.writeFileSync(filePath, jsonString);
  res.status(200).send({ msg: "Successfully Edit" });
});

router.delete("/delete", (req, res) => {
  let jsonData = getData();
  let newArr = jsonData.filter((item) => {
    return item.productNumber !== req.body.productNumber;
  });
  const jsonString = JSON.stringify(newArr);
  fs.writeFileSync(filePath, jsonString);
  res.status(200).send({ msg: "Successfully Delete" });
});

module.exports = router;
