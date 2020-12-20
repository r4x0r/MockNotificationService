const faker = require('faker');

const generateNewPayment = () => {
  return {
    payment_id: faker.random.uuid(),
    payment_code: faker.random.uuid(),
    amount: faker.random.number(),
    paid_at: faker.date.soon(),
    external_id: faker.random.uuid(),
    customer_id: faker.random.uuid()
  }
}

module.exports = generateNewPayment
