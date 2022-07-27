const httpMocks = require('node-mocks-http');
const { joiMiddleware } = require('../../../utils/middleware');
const mySchedule = require('../../data/validators/mySchedule.json');

let req;
let res;
let next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe('myScheduleSchema', () => {
  test('image: 숫자, 정수, 선택 -> 숫자 ❌', async () => {
    req.body = mySchedule[1];
    await joiMiddleware('myScheduleSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"image" must be a number',
      msg: 'validation error (joi)',
    });
  });

  test('image: 숫자, 정수, 선택 -> 정수 ❌', async () => {
    req.body = mySchedule[2];
    await joiMiddleware('myScheduleSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"image" must be an integer',
      msg: 'validation error (joi)',
    });
  });

  test('image: 숫자, 정수, 선택 -> image 없을 때 통과 ✅', async () => {
    req.body = mySchedule[3];
    joiMiddleware('myScheduleSchema');
    expect(res.statusCode).toBe(200);
  });

  test('companyName: 문자, 필수 -> 문자 ❌', async () => {
    req.body = mySchedule[4];
    await joiMiddleware('myScheduleSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"companyName" must be a string',
      msg: 'validation error (joi)',
    });
  });

  test('companyName: 문자, 필수 -> companyName 없을 때', async () => {
    req.body = mySchedule[5];
    await joiMiddleware('myScheduleSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"companyName" is required',
      msg: 'validation error (joi)',
    });
  });

  test('color: 숫자, 정수, 선택 -> 숫자 ❌', async () => {
    req.body = mySchedule[6];
    await joiMiddleware('myScheduleSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"color" must be a number',
      msg: 'validation error (joi)',
    });
  });

  test('color: 숫자, 정수, 선택 -> 정수 ❌', async () => {
    req.body = mySchedule[7];
    await joiMiddleware('myScheduleSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"color" must be an integer',
      msg: 'validation error (joi)',
    });
  });

  test('color: 숫자, 정수, 선택 -> color 없을 때 통과 ✅', async () => {
    req.body = mySchedule[8];
    joiMiddleware('myScheduleSchema');
    expect(res.statusCode).toBe(200);
  });

  test('title: 문자, 필수 -> 문자 ❌', async () => {
    req.body = mySchedule[9];
    await joiMiddleware('myScheduleSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"title" must be a string',
      msg: 'validation error (joi)',
    });
  });

  test('title: 문자, 필수 -> title 없을 때', async () => {
    req.body = mySchedule[10];
    await joiMiddleware('myScheduleSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"title" is required',
      msg: 'validation error (joi)',
    });
  });

  test('sticker: 숫자, 정수, 선택 -> 숫자 ❌', async () => {
    req.body = mySchedule[11];
    await joiMiddleware('myScheduleSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"sticker" must be a number',
      msg: 'validation error (joi)',
    });
  });

  test('sticker: 숫자, 정수, 선택 -> 정수 ❌', async () => {
    req.body = mySchedule[12];
    await joiMiddleware('myScheduleSchema')(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      data: '"sticker" must be an integer',
      msg: 'validation error (joi)',
    });
  });

  test('sticker: 숫자, 정수, 선택 -> sticker 없을 때 통과 ✅', async () => {
    req.body = mySchedule[13];
    joiMiddleware('myScheduleSchema');
    expect(res.statusCode).toBe(200);
  });

  
  test('date: YYYY-MM-DD HH-MM-SS, 문자열, 필수 -> 형식이 틀릴때 (19글자 ⬇)❌', async () => {
      req.body = mySchedule[14];
      await joiMiddleware('myScheduleSchema')(req, res, next);
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toStrictEqual({
          isSuccess: false,
          data: 'date 형식에 맞게 입력해 주세요.',
          msg: 'validation error (joi)',
        });
    });
    
    test('date: YYYY-MM-DD HH-MM-SS, 문자열, 필수 -> 형식이 틀릴때 (19글자 ⬆)❌', async () => {
        req.body = mySchedule[15];
        await joiMiddleware('myScheduleSchema')(req, res, next);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toStrictEqual({
            isSuccess: false,
            data: 'date 형식에 맞게 입력해 주세요.',
            msg: 'validation error (joi)',
        });
    });
    
    test('date: YYYY-MM-DD HH-MM-SS, 문자열, 필수 -> 문자 ❌', async () => {
      req.body = mySchedule[16];
      await joiMiddleware('myScheduleSchema')(req, res, next);
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toStrictEqual({
        isSuccess: false,
        data: '"date" must be a string',
        msg: 'validation error (joi)',
      });
    });

    test('date: YYYY-MM-DD HH-MM-SS, 문자열, 필수 -> date 없을 때', async () => {
      req.body = mySchedule[17];
      await joiMiddleware('myScheduleSchema')(req, res, next);
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toStrictEqual({
        isSuccess: false,
        data: '"date" is required',
        msg: 'validation error (joi)',
      });
    });

    test('place: 문자, 필수 -> 문자 ❌', async () => {
        req.body = mySchedule[18];
        await joiMiddleware('myScheduleSchema')(req, res, next);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toStrictEqual({
          isSuccess: false,
          data: '"place" must be a string',
          msg: 'validation error (joi)',
        });
      });
    
      test('place: 문자, 필수 -> place 없을 때', async () => {
        req.body = mySchedule[19];
        await joiMiddleware('myScheduleSchema')(req, res, next);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toStrictEqual({
          isSuccess: false,
          data: '"place" is required',
          msg: 'validation error (joi)',
        });
      });

      test('memo: 문자, 선택 -> 문자 ❌', async () => {
        req.body = mySchedule[20];
        await joiMiddleware('myScheduleSchema')(req, res, next);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toStrictEqual({
          isSuccess: false,
          data: '"memo" must be a string',
          msg: 'validation error (joi)',
        });
      });

      test('memo: 숫자, 정수, 선택 -> memo 없을 때 통과 ✅', async () => {
        req.body = mySchedule[21];
        joiMiddleware('myScheduleSchema');
        expect(res.statusCode).toBe(200);
      });

    test('req.body에 의도치 않은 값이 들어왔을 때', async () => {
      req.body = mySchedule[22];
      await joiMiddleware('myScheduleSchema')(req, res, next);
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toStrictEqual({
        isSuccess: false,
        data: '"Hack" is not allowed',
        msg: 'validation error (joi)',
      });
    });
});
