const faker = require('faker');

const generateNewCustomer = () => {
  return {
    customer_id: faker.random.uuid(),
    name: faker.company.companyName(),
    callback_url: faker.internet.url().toLowerCase(),
  }
}

module.exports = generateNewCustomer
