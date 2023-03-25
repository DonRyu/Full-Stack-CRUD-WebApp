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
  let randomNum, formattedNum;
  let jsonData = getData();
  let idArr = jsonData.map((item) => {
    return item.productNumber;
  });
  idArr.forEach((element) => usedNumbers.add(element));
  do {
    randomNum = Math.floor(Math.random() * 1000000);
    formattedNum = String(randomNum)
      .padStart(7, "0")
      .replace(/(\d{4})(\d{3})/, "$1-$2");
  } while (usedNumbers.has(formattedNum));

  return formattedNum;
};

router.get("/get", (req, res) => {
  let jsonData = getData();
  if (jsonData) {
    res.status(200).send(jsonData);
  } else {
    res.status(500);
  }
});

router.post("/post", (req, res) => {
  let jsonData = getData();
  let newProductNumber = getUniqueNumberID();
  jsonData.push({ productNumber: newProductNumber, ...req.body });
  const jsonString = JSON.stringify(jsonData);
  fs.writeFileSync(filePath, jsonString);
  res.status(200).send(jsonData);
});

router.put("/put", (req, res) => {
  console.log("req", req.body);
});

router.delete("/delete", (req, res) => {
  console.log("req", req.body);
});

module.exports = router;
