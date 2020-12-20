const httpStatus = require('http-status');
const {
  Customer
} = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a customer
 * @param {Object} customerBody
 * @returns {Promise<Customer>}
 */
const createCustomer = async (customerBody) => {
  const customer = await Customer.create(customerBody);
  return customer;
};


/**
 * Query for customers
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCustomers = async (filter, options) => {
  const customers = await Customer.paginate(filter, options);
  return customers;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<Customer>}
 */
const getCustomerById = async (id) => {
  return Customer.findById(id);
};


/**
 * Get user by customerId
 * @param {ObjectId} customerId
 * @returns {Promise<Customer>}
 */
const getCustomerByCustomerId = async (customerId) => {
  return Customer.findByCustomerId(customerId);
};

module.exports = {
  createCustomer,
  queryCustomers,
  getCustomerById,
  getCustomerByCustomerId
}
