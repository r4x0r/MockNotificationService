const mongoose = require('mongoose');
const validator = require('validator');
const {
  toJSON,
  paginate
} = require('./plugins');

const paymentSchema = mongoose.Schema({
  payment_id: { //todo: validate the length
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  payment_code: { //todo: validate the length
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  amount: { // todo: to validate in currency format
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error('Amount cannot be less than 0')
      }
    }
  },
  paid_at: {
    type: String,
    required: true,
    trim: true
  },
  external_id: {
    type: String,
    required: true,
    trim: true,
  },
  customer_id: {
    type: String,
    required: true,
    trim: true,
  },
  successful: {
    type: Boolean,
  }
})



// add plugin that converts mongoose to json
paymentSchema.plugin(toJSON);
paymentSchema.plugin(paginate);


/**
 * @typedef Payment
 */
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
