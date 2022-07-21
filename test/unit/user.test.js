const httpMocks = require('node-mocks-http');
const AuthController = require('../../controllers/authController');
const { User, AuthEmail, User_info } = require('../../models');
const locals = require('../data/locals.json');
const signup1 = require('../data/signup1.json');
const signup2 = require('../data/signup2.json');
const signup3 = require('../data/signup3.json');
const signup4 = require('../data/signup4.json');
const signup5 = require('../data/signup5.json');
const signup6 = require('../data/signup6.json');
// const {auth, joiMiddleware} = require('../../utils/middleware');

User.findOne = jest.fn();
User.create = jest.fn();
User.updateOne = jest.fn();
AuthEmail.findOne = jest.fn();
AuthEmail.create = jest.fn();
AuthEmail.updateOne = jest.fn();
AuthEmail.destroy = jest.fn();
User_info.create = jest.fn();

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
  res.locals.user = locals;
});

describe('회원가입', () => {
  test('회원가입 가능할 때', async () => {
    req.body = signup1;
    AuthEmail.create.mockResolvedValue(signup2);
    await AuthController.create.local(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      msg: '메일 발송 완료. 메일함을 확인해 주세요.',
    });
  });

  test('아이디 중복 에러', async () => {
    req.body = signup3;
    User.findOne.mockResolvedValue(signup3);
    await AuthController.create.local(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      msg: '이미 존재하는 이메일입니다.',
    });
  });
});

describe('회원가입(메일 인증)', () => {
  test('메일 인증, 회원 가입 완료', async () => {
    req.body = signup4;
    AuthEmail.findOne.mockResolvedValue(signup4);
    User.create.mockResolvedValue(signup6);
    await AuthController.create.verifyNumberForNew(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      msg: '회원가입이 완료되었습니다.',
    });
  });

  test('메일 인증, 인증 번호 오류', async () => {
    req.body = signup5;
    AuthEmail.findOne.mockResolvedValue(undefined);
    await AuthController.create.verifyNumberForNew(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      msg: '인증 번호가 틀렸습니다.',
    });
  });
});
