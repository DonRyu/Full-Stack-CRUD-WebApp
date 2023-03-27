const express = require("express");
const router = express.Router();

/**
 * this is express handler for get
 */
//http://localhost:3000/api/products/get/1
function getHandler(req, res) {
    let database = req.context.database
    let pagination = req.params.id
    let data = database.get(parseInt(pagination))
  
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(500);
    }
  }

router.get("/get/:id", getHandler);

module.exports = router;