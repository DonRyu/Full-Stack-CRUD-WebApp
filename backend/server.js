const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routers
const products = require('./routes/products');


app.use('/api/products',products)

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
