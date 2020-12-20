const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {
  customerService
} = require('../services');


const createCustomer = catchAsync(async (req, res) => {
  const customer = await customerService.createCustomer(req.body);
  res.status(httpStatus.CREATED).send(customer);
});


const getCustomers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await customerService.queryCustomers(filter, options);
  res.send(result);
});

const getCustomer = catchAsync(async (req, res) => {
  const customer = await customerService.getCustomerById(req.params.customerId);
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(customer);
});

const getCustomerByCustomerId = catchAsync(async (req, res) => {
  const customer = await customerService.getCustomerByCustomerId(req.params.customerId);
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(customer);
});

module.exports = {
  createCustomer,
  getCustomers,
  getCustomer,
  getCustomerByCustomerId
}
