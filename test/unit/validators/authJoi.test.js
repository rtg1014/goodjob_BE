const httpMocks = require('node-mocks-http');
// const { joiMiddleware } = require('../../../utils/middleware')
// const local = require('../../data/validators/local.json')

// Posting.findOne = jest.fn();


beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn()
});

// describe('localSchema', () => {
//   test('email: 문자, email형식, 필수 -> email형식 ❌', async () => {
//     req.body = local[1]
//     joiMiddleware('localSchema')(req,res,next)
//     expect(joiMiddleware('localSchema')(req,res,next).res.statusCode).toBe(500)
//     expect(res._getJSONData()).toStrictEqual({
//       isSuccess: false,
//       data: err.details[0].message,
//       msg: 'validation error (joi)',
//     });
//   });
// });

describe("mocktest", () => {
  test("Just pass", () => {
    expect(() => {
    }).not.toThrow();
  });
});