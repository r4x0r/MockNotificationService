const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const customerValidation = require('../../validations/customer.validation')
const customerController = require('../../controllers/customer.controller');


const router = express.Router();

router
  .route('/')
  .get(customerController.getCustomers)
  .post(validate(customerValidation.createCustomer), customerController.createCustomer)

// router
//   .route('/:customerId')
//   .get(customerController.getCustomer)

module.exports = router;
