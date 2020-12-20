const mongoose = require('mongoose');
const faker = require('faker');
const {
  Customer
} = require('../../src/models');

const customerOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.company.companyName(),
  customer_id: faker.random.uuid(),
  callback_url: faker.internet.url().toLowerCase()
};


const customerTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.company.companyName(),
  customer_id: faker.random.uuid(),
  callback_url: faker.internet.url().toLowerCase()
};


module.exports = {
  customerOne,
  customerTwo
};
