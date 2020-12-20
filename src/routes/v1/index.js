const express = require('express');
const docsRoute = require('./docs.route');
const customerRoute = require('./customer.route')
const paymentRoute = require('./payment.route')

const router = express.Router();

router.use('/docs', docsRoute);
router.use('/customers', customerRoute)
router.use('/payment', paymentRoute)

module.exports = router;
