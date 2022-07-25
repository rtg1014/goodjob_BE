const httpMocks = require('node-mocks-http');
// const { joiMiddleware } = require('../../../utils/middleware');
// const scrap = require('../../data/validators/scrap.json');

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});


describe("mocktest", () => {
    test("Just pass", () => {
      expect(() => {
      }).not.toThrow();
    });
  });