const httpMocks = require('node-mocks-http');
const { joiMiddleware } = require('../../../utils/middleware');
const newPassword = require('../../data/validators/newPassword.json');

let req;
let res;
let next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe('newPasswordSchema', () => {
  test('email: 문자, email형식, 필수 -> email형식 ❌', async () => {
    req.body = newPassword[1];
    await joiMiddleware('newPasswordSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '이메일 형식이 아닙니다.',
      msg: 'validation error (joi)',
    });
  });

  test('email: 문자, email형식, 필수 -> email 없을 때', async () => {
    req.body = newPassword[2];
    await joiMiddleware('newPasswordSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"email" is required',
      msg: 'validation error (joi)',
    });
  });

  test('newPassword: 문자,숫자를 혼합한 6~15자, 특수문자 허용, 필수 -> 5자 이하', async () => {
    req.body = newPassword[3];
    await joiMiddleware('newPasswordSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '6글자 ~ 15글자 이내로 작성해 주세요.',
      msg: 'validation error (joi)',
    });
  });

  test('newPassword: 문자,숫자를 혼합한 6~15자, 특수문자 허용, 필수 -> 16자 이상', async () => {
    req.body = newPassword[4];
    await joiMiddleware('newPasswordSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '6글자 ~ 15글자 이내로 작성해 주세요.',
      msg: 'validation error (joi)',
    });
  });

  test('newPassword: 문자,숫자를 혼합한 6~15자, 특수문자 허용, 필수 -> 문자 ❌', async () => {
    req.body = newPassword[5];
    await joiMiddleware('newPasswordSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '비밀번호는 숫자(필수),알파벳(필수),특수문자(선택)로 이루어져야 합니다.',
      msg: 'validation error (joi)',
    });
  });

  test('newPassword: 문자,숫자를 혼합한 6~15자, 특수문자 허용, 필수 -> 숫자 ❌', async () => {
    req.body = newPassword[6];
    await joiMiddleware('newPasswordSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '비밀번호는 숫자(필수),알파벳(필수),특수문자(선택)로 이루어져야 합니다.',
      msg: 'validation error (joi)',
    });
  });

  test('newPassword: 문자,숫자를 혼합한 6~15자, 특수문자 허용, 필수 -> newPassword 없을 때', async () => {
    req.body = newPassword[7];
    await joiMiddleware('newPasswordSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"newPassword" is required',
      msg: 'validation error (joi)',
    });
  });

  test('confirmNewPassword: newPassword 일치, 필수 -> newPassword 일치 ❌', async () => {
    req.body = newPassword[8];
    await joiMiddleware('newPasswordSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '비밀번호가 일치하지 않습니다.',
      msg: 'validation error (joi)',
    });
  });

  test('confirmNewPassword: newPassword 일치, 필수 -> confirmNewPassword 없을 때', async () => {
    req.body = newPassword[9];
    await joiMiddleware('newPasswordSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"confirmNewPassword" is required',
      msg: 'validation error (joi)',
    });
  });

  test('req.body에 의도치 않은 값이 들어왔을 때', async () => {
    req.body = newPassword[10];
    await joiMiddleware('newPasswordSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"Hack" is not allowed',
      msg: 'validation error (joi)',
    });
  });
});
