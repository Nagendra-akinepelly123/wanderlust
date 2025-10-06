const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string(),
  price: Joi.number().min(0).required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  image: Joi.object({
    url: Joi.string().allow("", null),
    filename: Joi.string().allow("", null),
  }).optional(),
});

module.exports.reviewSchema = Joi.object({
  comment: Joi.string().required(),
  rating: Joi.number().max(5).required(),
});
