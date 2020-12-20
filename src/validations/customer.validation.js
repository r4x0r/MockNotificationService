const Joi = require('joi');
const {
  password,
  objectId
} = require('./custom.validation');

const createCustomer = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    customer_id: Joi.string().required(),
    callback_url: Joi.string().required(),
  }),
};


module.exports = {
  createCustomer
};
