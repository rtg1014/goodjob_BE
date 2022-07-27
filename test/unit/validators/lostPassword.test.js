const httpMocks = require('node-mocks-http');
const { joiMiddleware } = require('../../../utils/middleware');
const lostPassword = require('../../data/validators/lostPassword.json');

let req;
let res;
let next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe('lostPasswordSchema', () => {
  test('email: 문자, email형식, 필수 -> email형식 ❌', async () => {
    req.body = lostPassword[1];
    await joiMiddleware('lostPasswordSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '이메일 형식이 아닙니다.',
      msg: 'validation error (joi)',
    });
  });

  test('email: 문자, email형식, 필수 -> email 없을 때', async () => {
    req.body = lostPassword[2];
    await joiMiddleware('lostPasswordSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"email" is required',
      msg: 'validation error (joi)',
    });
  });

  test('userName: 필수 -> userName 없을 때', async () => {
    req.body = lostPassword[3];
    await joiMiddleware('lostPasswordSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"userName" is required',
      msg: 'validation error (joi)',
    });
  });

  test('req.body에 의도치 않은 값이 들어왔을 때', async () => {
    req.body = lostPassword[4];
    await joiMiddleware('lostPasswordSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"Hack" is not allowed',
      msg: 'validation error (joi)',
    });
  });
});
