const httpMocks = require('node-mocks-http');
const { joiMiddleware } = require('../../../utils/middleware');
const category = require('../../data/validators/category.json');

let req;
let res;
let next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe('categorySchema', () => {
  test('career: 문자, 필수 -> 문자 ❌', async () => {
    req.body = category[1];
    await joiMiddleware('categorySchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"career" must be a string',
      msg: 'validation error (joi)',
    });
  });

  test('career: 문자, 필수 -> career 없을 때', async () => {
    req.body = category[2];
    await joiMiddleware('categorySchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"career" is required',
      msg: 'validation error (joi)',
    });
  });

  test('companyType: 문자, 필수 -> 문자 ❌', async () => {
    req.body = category[3];
    await joiMiddleware('categorySchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"companyType" must be a string',
      msg: 'validation error (joi)',
    });
  });

  test('companyType: 문자, 필수 -> companyType 없을 때', async () => {
    req.body = category[4];
    await joiMiddleware('categorySchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"companyType" is required',
      msg: 'validation error (joi)',
    });
  });

  test('cityMain: 문자, 필수 -> 문자 ❌', async () => {
    req.body = category[5];
    await joiMiddleware('categorySchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"cityMain" must be a string',
      msg: 'validation error (joi)',
    });
  });

  test('cityMain: 문자, 필수 -> cityMain 없을 때', async () => {
    req.body = category[6];
    await joiMiddleware('categorySchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"cityMain" is required',
      msg: 'validation error (joi)',
    });
  });

  test('citySub: 문자, 필수 -> 문자 ❌', async () => {
    req.body = category[7];
    await joiMiddleware('categorySchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"citySub" must be a string',
      msg: 'validation error (joi)',
    });
  });

  test('citySub: 문자, 필수 -> citySub 없을 때', async () => {
    req.body = category[8];
    await joiMiddleware('categorySchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"citySub" is required',
      msg: 'validation error (joi)',
    });
  });

  test('jobMain: 문자, 필수 -> 문자 ❌', async () => {
    req.body = category[9];
    await joiMiddleware('categorySchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"jobMain" must be a string',
      msg: 'validation error (joi)',
    });
  });

  test('jobMain: 문자, 필수 -> jobMain 없을 때', async () => {
    req.body = category[10];
    await joiMiddleware('categorySchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"jobMain" is required',
      msg: 'validation error (joi)',
    });
  });
  test('jobSub: 문자, 필수 -> 문자 ❌', async () => {
    req.body = category[11];
    await joiMiddleware('categorySchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"jobSub" must be a string',
      msg: 'validation error (joi)',
    });
  });

  test('jobSub: 문자, 필수 -> jobSub 없을 때', async () => {
    req.body = category[12];
    await joiMiddleware('categorySchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"jobSub" is required',
      msg: 'validation error (joi)',
    });
  });

  test('req.body에 의도치 않은 값이 들어왔을 때', async () => {
    req.body = category[13];
    await joiMiddleware('categorySchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"Hack" is not allowed',
      msg: 'validation error (joi)',
    });
  });
});
