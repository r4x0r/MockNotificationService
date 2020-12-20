const mongoose = require('mongoose');
const validator = require('validator');
require('mongoose-type-url');
const {
  toJSON,
  paginate
} = require('./plugins');
const Url = require('mongoose-type-url');

const customerSchema = mongoose.Schema({
  customer_id: { //todo: validate the length / format of customerid
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: { //todo: set min max length of customer id
    type: String,
    required: true,
    trim: true
  },
  callback_url: { // todo: to validate url format
    type: Url,
    required: 'Callback URL can\'t be empty',
    trim: true,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error('Invalid Callback Url');
      }
    }
  }
})

/**
 * Find by customer_id
 * @param {string} customerId
 * @returns {Promise<Customer>}
 */
customerSchema.statics.findByCustomerId = async function (customerId) {
  return this.findOne({
    customer_id: customerId
  })
};


// add plugin that converts mongoose to json
customerSchema.plugin(toJSON);
customerSchema.plugin(paginate);


/**
 * @typedef Customer
 */
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
