const httpMocks = require('node-mocks-http');
const { joiMiddleware } = require('../../../utils/middleware');
const scrap = require('../../data/validators/scrap.json');

let req;
let res;
let next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe('scrapSchema', () => {
  test('postingId: 숫자, 정수, 필수 -> 숫자 ❌', async () => {
    req.body = scrap[1];
    await joiMiddleware('scrapSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"postingId" must be a number',
      msg: 'validation error (joi)',
    });
  });

  test('postingId: 숫자, 정수, 필수 -> 정수 ❌', async () => {
    req.body = scrap[2];
    await joiMiddleware('scrapSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"postingId" must be an integer',
      msg: 'validation error (joi)',
    });
  });

  test('postingId: 숫자, 정수, 필수 -> postingId가 없을 때', async () => {
    req.body = scrap[3];
    await joiMiddleware('scrapSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"postingId" is required',
      msg: 'validation error (joi)',
    });
  });

  test('req.body에 의도치 않은 값이 들어왔을 때', async () => {
    req.body = scrap[4];
    await joiMiddleware('scrapSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"Hack" is not allowed',
      msg: 'validation error (joi)',
    });
  });
});
