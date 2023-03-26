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

const getScrumMaster = (res, value, jsonData) => {
  let result = jsonData.filter((item) => {
    const itemScrumMaster = item.scrumMaster.replace(/(\s*)/g, "");
    return itemScrumMaster.toLowerCase().includes(value.toLowerCase());
  });
  res.status(200).send(result);
};

const getDeveloper = (res, value, jsonData) => {
  const filteredData = jsonData.filter((item) => {
    const modifiedDevelopers = item.developers.map((developer) =>
      developer.replace(/(\s*)/g, "").toLowerCase()
    );
    return modifiedDevelopers.some((developer) =>
      developer.includes(value.replace(/(\s*)/g, ""))
    );
  });
  res.status(200).send(filteredData);
};

router.get("/get", (req, res) => {
  let jsonData = getData();
  const selectedOption = req?.query.selectedOption;
  const value = req?.query.value;

  if (!value) {
    res.status(200).send(jsonData);
    return;
  }
  if (selectedOption === "scrumMaster") {
    return getScrumMaster(res, value, jsonData);
  } else {
    return getDeveloper(res, value, jsonData);
  }
});

module.exports = router;
