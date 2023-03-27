const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
const Database = require("./database/database");
const database = new Database();
const products = require('./products/routes')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, _, next) => {
  req.context = { database };
  next();
});

//routers
app.use("/api/products", products);


app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
