const httpMocks = require('node-mocks-http');
const { joiMiddleware } = require('../../utils/middleware');
const scrap = require('../data/validators/scrap.json');

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe('scrapSchema', () => {
  test('postingId: 숫자, 정수, 필수 -> 숫자 ❌', async () => {
    req.body = scrap[1];
    await joiMiddleware('scrapSchema')(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"postingId" must be a number',
      msg: 'validation error (joi)',
    });
  });
});
