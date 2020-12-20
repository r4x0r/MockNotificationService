const faker = require('faker');
const {
  Customer
} = require('../../../src/models');
const generateNewCustomer = require('../../utils/generateNewCustomer')


describe('Customer model', () => {
  describe('Customer validation', () => {
    let newCustomer;
    beforeEach(() => {
      newCustomer = generateNewCustomer()
    });

    test('should correctly validate a valid customer', async () => {
      await expect(new Customer(newCustomer).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if callback url is invalid', async () => {
      newCustomer.callback_url = 'invalidURL';
      await expect(new Customer(newCustomer).validate()).rejects.toThrow();
    });
  })
})
