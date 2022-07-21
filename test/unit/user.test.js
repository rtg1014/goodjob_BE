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
const signup7 = require('../data/signup7.json');
const signup8 = require('../data/signup8.json');
const lostPassword1 = require('../data/lostPassword1.json');
const lostPassword2 = require('../data/lostPassword2.json');
const lostPassword3 = require('../data/lostPassword3.json');
const lostPassword4 = require('../data/lostPassword4.json');
const lostPassword5 = require('../data/lostPassword5.json');
const lostPassword6 = require('../data/lostPassword6.json');
const lostPassword7 = require('../data/lostPassword7.json');

jest.mock('nodemailer')
const nodemailer = require('nodemailer');

// jest.fn()
User.findOne = jest.fn();
User.create = jest.fn();
User.updateOne = jest.fn();
AuthEmail.findOne = jest.fn();
AuthEmail.create = jest.fn();
AuthEmail.updateOne = jest.fn();
AuthEmail.destroy = jest.fn();
User_info.create = jest.fn();
sendMailMock = jest.fn()
nodemailer.createTransport.mockReturnValue({"sendMail": sendMailMock});


beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
  res.locals.user = locals;
});

describe('회원가입', () => {
  test('회원가입 가능할 때(메일 발송)', async () => {
    req.body = signup1;
    AuthEmail.findOne.mockResolvedValue(undefined);
    AuthEmail.create.mockResolvedValue(signup2);
    await AuthController.create.local(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      msg: '메일 발송 완료. 메일함을 확인해 주세요.',
    });
  });

  test('회원가입 가능할 때(메일 발송 중복 요청)', async () => {
    req.body = signup7;
    AuthEmail.findOne.mockResolvedValue(signup8);
    AuthEmail.updateOne.mockResolvedValue(signup8);
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

describe('비밀번호 변경', () => {
  test('메일 발송(처음)', async () => {
    req.body = lostPassword1;
    User.findOne.mockResolvedValue(lostPassword2);
    AuthEmail.create.mockResolvedValue(lostPassword3);
    await AuthController.update.lostPassword(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      msg: '메일 발송 완료. 메일함을 확인해 주세요.',
    });
  });

  test('메일 발송(메일 중복 요청 => 새로운 auth number 발송)', async () => {
    req.body = lostPassword4;
    User.findOne.mockResolvedValue(lostPassword5);
    AuthEmail.findOne.mockResolvedValue(lostPassword6);
    AuthEmail.updateOne.mockResolvedValue(lostPassword6);
    await AuthController.update.lostPassword(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      msg: '메일 발송 완료. 메일함을 확인해 주세요.',
    });
  });

  test('유저 정보 에러', async () => {
    req.body = lostPassword1;
    User.findOne.mockResolvedValue(undefined);
    await AuthController.update.lostPassword(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      msg: '해당하는 유저정보가 없습니다.',
    });
  });
});

describe('비밀번호 변경(메일 인증)', () => {
  test('메일 인증, 비밀번호 변경 완료', async () => {
    req.body = lostPassword7;
    AuthEmail.findOne.mockResolvedValue(lostPassword7);
    AuthEmail.destroy.mockResolvedValue(lostPassword7);
    await AuthController.create.verifyNumberForOld(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      msg: '인증이 완료되었습니다. 새로운 비밀번호를 입력해주세요.',
    });
  });

  test('메일 인증, 인증 번호 오류', async () => {
    req.body = lostPassword7;
    AuthEmail.findOne.mockResolvedValue(undefined);
    await AuthController.create.verifyNumberForOld(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      msg: '인증 번호가 틀렸습니다.',
    });
  });
});
