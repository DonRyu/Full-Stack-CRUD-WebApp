/**
* This is the main server file that initializes and runs the application.
* It sets up middleware such as bodyParser, cors, and swagger-ui-express for documentation.
* It also creates a new instance of the Database class and injects it into the req object as req.context.
* Finally, it mounts the product routes and starts listening on the specified port.
*/
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
const Database = require("./database/database");
const database = new Database();
const product = require('./product/routes')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerDoc.json');

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
//router
app.use("/api/product", product);
//listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
