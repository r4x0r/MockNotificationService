const faker = require('faker');
const {
  Payment
} = require('../../../src/models');
const generateNewPayment = require('../../utils/generateNewPayment')


describe('Payment model', () => {
  describe('Payment validation', () => {
    let newPayment;
    beforeEach(() => {
      newPayment = generateNewPayment()
    });

    test('should correctly validate a valid payment', async () => {
      await expect(new Payment(newPayment).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if amount is less than 0', async () => {
      newPayment.amount = -123;
      await expect(new Payment(newPayment).validate()).rejects.toThrow();
    });
  })
})
