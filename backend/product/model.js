/**
 * This code exports Joi validation schemas for a product API, 
 * including a schema for creating and updating products, a schema for product IDs,methodology map used in the product schema
 */
const Joi = require("joi");
const MethodologyMap = {
  Agile: "Agile",
  Waterfall: "Waterfall",
};
const MAX_NAME_LENGTH = 50;

// Defining the schema for product creation
const productSchema = Joi.object({
  productName: Joi.string().required().max(MAX_NAME_LENGTH),
  productOwnerName: Joi.string().max(MAX_NAME_LENGTH).required(),
  scrumMasterName: Joi.string().max(MAX_NAME_LENGTH).required(),
  startDate: Joi.string().required(),
  developers: Joi.array().max(5).items(Joi.string()).required(),
  methodology: Joi.string()
    .valid(MethodologyMap.Agile, MethodologyMap.Waterfall)
    .required(),
});

// Defining the schema for updating a product
// User can't update star date of product
const putProductSchema = Joi.object({
  productName: Joi.string().required(),
  productOwnerName: Joi.string().max(MAX_NAME_LENGTH).required(),
  scrumMasterName: Joi.string().max(MAX_NAME_LENGTH).required(),
  developers: Joi.array().max(5).items(Joi.string()).required(),
  methodology: Joi.string()
    .valid(MethodologyMap.Agile, MethodologyMap.Waterfall)
    .required(),
});

// Defining the schema for the product id
// Product id is number and lower than 99999999
const productIdSchema = Joi.number().max(99999999);

module.exports = {
  putProductSchema,
  productSchema,
  productIdSchema,
};
