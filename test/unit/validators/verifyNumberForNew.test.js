const httpMocks = require('node-mocks-http');
const { joiMiddleware } = require('../../../utils/middleware');
const verifyNumberForNew = require('../../data/validators/verifyNumberForNew.json');

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe('verifyNumberForNewSchema', () => {
  test('email: 문자, email형식, 필수 -> email형식 ❌', async () => {
    req.body = verifyNumberForNew[1];
    await joiMiddleware('verifyNumberForNewSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '이메일 형식이 아닙니다.',
      msg: 'validation error (joi)',
    });
  });

  test('email: 문자, email형식, 필수 -> email 없을 때', async () => {
    req.body = verifyNumberForNew[2];
    await joiMiddleware('verifyNumberForNewSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"email" is required',
      msg: 'validation error (joi)',
    });
  });

  test('password: 필수 -> password 없을 때', async () => {
    req.body = verifyNumberForNew[3];
    await joiMiddleware('verifyNumberForNewSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"password" is required',
      msg: 'validation error (joi)',
    });
  });

  test('userName: 필수 -> userName 없을 때', async () => {
    req.body = verifyNumberForNew[4];
    await joiMiddleware('verifyNumberForNewSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"userName" is required',
      msg: 'validation error (joi)',
    });
  });

  test('authNumber: 숫자, 정수, 필수 -> 정수 ❌', async () => {
    req.body = verifyNumberForNew[5];
    await joiMiddleware('verifyNumberForNewSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"authNumber" must be an integer',
      msg: 'validation error (joi)',
    });
  });
    
  test('authNumber: 숫자, 정수, 필수 -> authNumber 없을 때', async () => {
    req.body = verifyNumberForNew[6];
    await joiMiddleware('verifyNumberForNewSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"authNumber" is required',
      msg: 'validation error (joi)',
    });
  });
    
  test('req.body에 의도치 않은 값이 들어왔을 때', async () => {
    req.body = verifyNumberForNew[7];
    await joiMiddleware('verifyNumberForNewSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"Hack" is not allowed',
      msg: 'validation error (joi)',
    });
  });
});
