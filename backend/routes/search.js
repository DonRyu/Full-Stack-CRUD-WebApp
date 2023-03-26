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

const getScrumMaster = (res, value) => {
  let jsonData = getData();
  let result = jsonData.filter((item) => {
    const itemScrumMaster = item.scrumMaster.replace(/(\s*)/g, "");
    return itemScrumMaster.toLowerCase().includes(value.toLowerCase());
  });
  res.status(200).send(result);
};

const getDeveloper = (res, value) => {
    
};

router.get("/get", (req, res) => {
  let jsonData = getData();
  const selectedOption = req?.query.selectedOption;
  const value = req?.query.value.replace(/(\s*)/g, "");

  if (!value) {
    res.status(200).send(jsonData);
    return;
  }

  if (selectedOption === "scrumMaster") {
    return getScrumMaster(res, value);
  } else {
  }

  jsonData.map((item) => {});
});

module.exports = router;
