const httpStatus = require('http-status');
const {
  Payment
} = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a payment to store in db for record keeping purposes
 * @param {Object} paymentBody
 * @returns {Promise<Payment>}
 */
const createPayment = async (paymentBody) => {
  const payment = await Payment.create(paymentBody);
  return payment;
};


module.exports = {
  createPayment
}
