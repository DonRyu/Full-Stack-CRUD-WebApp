const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/products.json");

router.get("/get", (req, res) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    res.send(jsonData);
  });
});

module.exports = router;
