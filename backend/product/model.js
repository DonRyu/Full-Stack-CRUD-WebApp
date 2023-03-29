const Joi = require("joi");
const MethodologyMap = {
  Agile: "Agile",
  Waterfall: "Waterfall",
};
const MAX_NAME_LENGTH = 50;

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

const putProductSchema = Joi.object({
  productName: Joi.string().required(),
  productOwnerName: Joi.string().max(MAX_NAME_LENGTH).required(),
  scrumMasterName: Joi.string().max(MAX_NAME_LENGTH).required(),
  developers: Joi.array().max(5).items(Joi.string()).required(),
  methodology: Joi.string()
    .valid(MethodologyMap.Agile, MethodologyMap.Waterfall)
    .required(),
});

const productIdSchema = Joi.number().max(99999999);

module.exports = {
  putProductSchema,
  productSchema,
  productIdSchema,
};
