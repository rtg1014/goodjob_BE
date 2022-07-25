const httpMocks = require('node-mocks-http');
const { joiMiddleware } = require('../../../utils/middleware');
const local = require('../../data/validators/local.json');

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe('localSchema', () => {
  test('email: 문자, email형식, 필수 -> email형식 ❌', async () => {
    req.body = local[1];
    await joiMiddleware('localSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '이메일 형식이 아닙니다.',
      msg: 'validation error (joi)',
    });
  });

  test('email: 문자, email형식, 필수 -> email 없을 때', async () => {
    req.body = local[2];
    await joiMiddleware('localSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"email" is required',
      msg: 'validation error (joi)',
    });
  });

  test('password: 문자,숫자를 혼합한 6~15자, 특수문자 허용, 필수 -> 5자 이하', async () => {
    req.body = local[3];
    await joiMiddleware('localSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '6글자 ~ 15글자 이내로 작성해 주세요.',
      msg: 'validation error (joi)',
    });
  });

  test('password: 문자,숫자를 혼합한 6~15자, 특수문자 허용, 필수 -> 16자 이상', async () => {
    req.body = local[4];
    await joiMiddleware('localSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '6글자 ~ 15글자 이내로 작성해 주세요.',
      msg: 'validation error (joi)',
    });
  });

  test('password: 문자,숫자를 혼합한 6~15자, 특수문자 허용, 필수 -> 문자 ❌', async () => {
    req.body = local[5];
    await joiMiddleware('localSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '비밀번호는 숫자(필수),알파벳(필수),특수문자(선택)로 이루어져야 합니다.',
      msg: 'validation error (joi)',
    });
  });

  test('password: 문자,숫자를 혼합한 6~15자, 특수문자 허용, 필수 -> 숫자 ❌', async () => {
    req.body = local[6];
    await joiMiddleware('localSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '비밀번호는 숫자(필수),알파벳(필수),특수문자(선택)로 이루어져야 합니다.',
      msg: 'validation error (joi)',
    });
  });

  test('password: 문자,숫자를 혼합한 6~15자, 특수문자 허용, 필수 -> password 없을 때', async () => {
    req.body = local[7];
    await joiMiddleware('localSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"password" is required',
      msg: 'validation error (joi)',
    });
  });

  test('confirmPassword: password와 일치, 필수 -> password와 일치 ❌', async () => {
    req.body = local[8];
    await joiMiddleware('localSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '비밀번호가 일치하지 않습니다.',
      msg: 'validation error (joi)',
    });
  });

  test('confirmPassword: password와 일치, 필수 -> confirmPassword 없을 때', async () => {
    req.body = local[9];
    await joiMiddleware('localSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"confirmPassword" is required',
      msg: 'validation error (joi)',
    });
  });

  test('userName: 한글 2~20글자, 필수 -> 1글자 이하', async () => {
    req.body = local[10];
    await joiMiddleware('localSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '이름이 너무 짧아요.',
      msg: 'validation error (joi)',
    });
  });

  test('userName: 한글 2~20글자, 필수 -> 1글자 이하', async () => {
    req.body = local[11];
    await joiMiddleware('localSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '이름이 너무 길어요.',
      msg: 'validation error (joi)',
    });
  });

  test('userName: 한글 2~20글자, 필수 -> 한글 이외의 문자가 있을 때', async () => {
    req.body = local[12];
    await joiMiddleware('localSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '이름은 한글로 입력해 주세요.',
      msg: 'validation error (joi)',
    });
  });

  test('userName: 한글 2~20글자, 필수 -> userName 없을 때', async () => {
    req.body = local[13];
    await joiMiddleware('localSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"userName" is required',
      msg: 'validation error (joi)',
    });
  });

  test('req.body에 의도치 않은 값이 들어왔을 때', async () => {
    req.body = local[14];
    await joiMiddleware('localSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"Hack" is not allowed',
      msg: 'validation error (joi)',
    });
  });
});
