const Joi = require("joi");
const MethodologyMap = {
  Agile: "Agile",
  Waterfall: "Waterfall",
};

const postProductSchema = Joi.object({
  productName: Joi.string().required(),
  productOwnerName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .required(),
  scrumMasterName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .required(),
  startDate: Joi.date().required(),
  developers: Joi.array().max(5).items(Joi.string()).required(),
  methodology: Joi.string()
    .valid(MethodologyMap.Agile, MethodologyMap.Waterfall)
    .required(),
});

const putProdcutSchema = Joi.object({
  productName: Joi.string().required(),
  productOwnerName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .required(),
  scrumMasterName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .required(),
  developers: Joi.array().max(5).items(Joi.string()).required(),
  methodology: Joi.string()
    .valid(MethodologyMap.Agile, MethodologyMap.Waterfall)
    .required(),
});

const productIdSchema = Joi.string().regex(/^\d+$/);

module.exports = {
  postProductSchema,
  productIdSchema,
  putProdcutSchema,
};
