const { productIdSchema, productSchema, putProductSchema } = require("./model");

/**
 * Get product data from database based on query and queryType,
 * and return paginated results with pagination metadata.
 *
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @returns - Paginated product data with metadata, or error message
 */
const getProduct = (req, res) => {
  const database = req.context.database;
  const { page = 1, query, queryType } = req.query;
  const pageNumber = parseInt(page);
  const data = database.get(query, queryType);
  const perPage = 10;
  const start = (parseInt(pageNumber) - 1) * perPage;
  const end = start + perPage;
  const pageData = data?.slice(start, end);
  if (pageData) {
    return res.status(200).send({
      pageData: pageData,
      currentPage: pageNumber,
      totalPages: Math.ceil(data.length / perPage),
      totalProduct: data.length,
    });
  } else {
    return res.status(500).send({ msg: "error" });
  }
};

/**
 * Add a new product to the database.
 *
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @returns - Success message, or error message
 */
const postProduct = (req, res) => {
  const database = req.context.database;
  const { error, value } = productSchema.validate(req.body);
  if (error) {
    res.status(400).send({ msg: "Please send valid data" });
    return;
  }
  if (database.post(value)) {
    return res.status(200).send({ msg: "Successfully Add" });
  } else {
    return res.status(500).send({ msg: "error" });
  }
};

/**
 * Get product data for a specific product number from database.
 *
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @returns - Product's detail data, or error message
 */
const getProductData = (req, res) => {
  const database = req.context.database;
  let data;
  const { error, value: productNumber } = productIdSchema.validate(
    req.params.id
  );
  if (error) {
    res.status(400).send({ msg: "Please send valid data" });
    return;
  }
  data = database.getByProductNumber(productNumber);
  switch (data) {
    case 400:
      return res.status(400).send({ msg: "No such data in database" });
    case 500:
      return res.status(500).send({ msg: "error" });
    default:
      return res.status(200).send(data)
  }
};

/**
 * Update an existing product in the database.
 *
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @returns - Success message, or error message
 */
const putProduct = (req, res) => {
  const database = req.context.database;
  const { error: id_error, value: productNumber } = productIdSchema.validate(
    req.params.id
  );
  const { error, value: productData } = putProductSchema.validate(req.body);
  let isPut;

  if (id_error || error) {
    res.status(400).send({ msg: "Please send valid data" });
    return;
  }
  isPut = database.put(productNumber, productData);
  switch (isPut) {
    case 400:
      return res.status(400).send({ msg: "No such data in database" });
    case 500:
      return res.status(500).send({ msg: "error" });
    default:
      return res.status(200).send({ msg: "Successfully Edit" });
  }
};

/**
* Delete a product from the database.
@param {*} req - The HTTP request object.
@param {*} res - The HTTP response object.
@returns A success message or an error message.
*/
const deleteProduct = (req, res) => {
  const database = req.context.database;
  let isDelete;
  const { error, value: productNumber } = productIdSchema.validate(
    req.params.id
  );
  if (error) {
    res.status(400).send({ msg: "Please send valid data" });
    return;
  }
  isDelete = database.delete(productNumber);
  switch (isDelete) {
    case 400:
      return res.status(400).send({ msg: "No such data in database" });
    case 500:
      return res.status(500).send({ msg: "error" });
    default:
      return res.status(200).send({ msg: "Successfully Delete" });
  }
};

module.exports = {
  getProduct,
  getProductData,
  postProduct,
  putProduct,
  deleteProduct,
};
