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

router.get("/get/:id", (req, res) => {
    const scrumMaster = req.params.id;
    let jsonData = getData();
    jsonData.map((item)=>{
        
    })



    if (jsonData) {
      res.status(200).send(jsonData);
    } else {
      res.status(500);
    }
  });

module.exports = router;
