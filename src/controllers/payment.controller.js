const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const fetchRetry = require('../utils/fetchRetry')
const {
  customerService,
  paymentService
} = require('../services');


const sendToCustomer = catchAsync(async (req, res) => {
  const {
    body: reqBody
  } = req

  // find the customer's callback_url
  const callback_url = (await customerService.getCustomerByCustomerId(reqBody.customer_id)).callback_url

  if (!callback_url) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer cannot be found, please check customer Id')
  }

  // call the api with a POST to send over all the necessary information
  try {
    await fetchRetry({
      method: 'POST',
      url: callback_url,
      data: reqBody
    })

    // success
    reqBody.success = true;
    // create a record
    await paymentService.createPayment(reqBody)

    res.status(httpStatus.OK).send();
  } catch (err) {
    // failed after retry
    reqBody.success = false;
    // create a record
    await paymentService.createPayment(reqBody)
    throw err
  }
});

module.exports = {
  sendToCustomer
}
