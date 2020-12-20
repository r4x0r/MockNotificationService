const Joi = require('joi');

const sendToCustomer = {
  body: Joi.object().keys({ //basic validation where the ids have min length of 5 (can be custom according to business logic)
    payment_id: Joi.string().min(5).required(),
    payment_code: Joi.string().min(5).required(),
    amount: Joi.number().positive().allow(0),
    paid_at: Joi.string().required(),
    external_id: Joi.string().min(5).required(),
    customer_id: Joi.string().min(5).required()
  }),
};


module.exports = {
  sendToCustomer
};
