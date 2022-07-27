const httpMocks = require('node-mocks-http');
const { joiMiddleware } = require('../../../utils/middleware');
const authSchema = require('../../data/validators/authSchema.json');

let req;
let res;
let next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe('authSchema', () => {
  test('email: 문자, email형식, 필수 -> email형식 ❌', async () => {
    req.body = authSchema[1];
    await joiMiddleware('authSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '이메일 형식이 아닙니다.',
      msg: 'validation error (joi)',
    });
  });

  test('email: 문자, email형식, 필수 -> email 없을 때', async () => {
    req.body = authSchema[2];
    await joiMiddleware('authSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"email" is required',
      msg: 'validation error (joi)',
    });
  });

  test('password: 필수 -> password 없을 때', async () => {
    req.body = authSchema[3];
    await joiMiddleware('authSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"password" is required',
      msg: 'validation error (joi)',
    });
  });

  test('req.body에 의도치 않은 값이 들어왔을 때', async () => {
    req.body = authSchema[4];
    await joiMiddleware('authSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"Hack" is not allowed',
      msg: 'validation error (joi)',
    });
  });
});
