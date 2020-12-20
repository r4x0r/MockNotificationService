const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');

const app = require('../../src/app');
const {
  Customer
} = require('../../src/models');

const setupTestDB = require('../utils/setupTestDB');
const generateNewCustomer = require('../utils/generateNewCustomer')

// Set up DB before the start of the test
setupTestDB();

// Actual tests
describe('Customer routes', () => {
  describe('POST /v1/customers', () => {
    let newCustomer;
    beforeEach(() => {
      newCustomer = generateNewCustomer()
    });

    test('should return 201 and successfully create new customer if data is ok', async () => {

      const res = await request(app)
        .post('/v1/customers')
        // .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(newCustomer)
        .expect(httpStatus.CREATED);

      // Check response
      const {
        body
      } = res
      expect(body).toEqual({
        id: expect.anything(),
        name: newCustomer.name,
        callback_url: newCustomer.callback_url,
        customer_id: newCustomer.customer_id
      });

      // Check DB
      const dbCustomer = await Customer.findById(body.id);
      expect(dbCustomer).toBeDefined();
      expect(dbCustomer).toMatchObject({
        name: newCustomer.name,
        callback_url: newCustomer.callback_url,
        customer_id: newCustomer.customer_id
      });
    });
  })
})
