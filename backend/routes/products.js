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

router.get("/get/:id", (req, res) => {
  const productNumber = req.params.id;
  let jsonData = getData();
  let selectedData = jsonData.filter((item) => {
    return item.productNumber === productNumber;
  });
  res.status(200).send(selectedData);
});

router.put("/put", (req, res) => {
  let jsonData = getData();
  let newArr = jsonData.map((item) => {
    if (item.productNumber === req.body.productNumber) {
      return {
        ...item,
        ...req.body,
      };
    }
  });
  const jsonString = JSON.stringify(newArr);
  fs.writeFileSync(filePath, jsonString);
  res.status(200).send({msg:'Success'});
});

router.delete("/delete", (req, res) => {
  let jsonData = getData();
  let newArr = jsonData.filter((item) => {
    return item.productNumber !== req.body.productNumber;
  });
  const jsonString = JSON.stringify(newArr);
  fs.writeFile(filePath, jsonString, (err, jsonData) => {
    res.status(200).send(jsonData);
  });
});

module.exports = router;
