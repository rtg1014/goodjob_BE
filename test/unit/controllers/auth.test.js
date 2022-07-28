const httpMocks = require('node-mocks-http');
const AuthController = require('../../../controllers/authController');
const { User, AuthEmail, User_info } = require('../../../models');
const signup1 = require('../../data/auth/signup1.json');
const signup2 = require('../../data/auth/signup2.json');
const signup3 = require('../../data/auth/signup3.json');
const signup4 = require('../../data/auth/signup4.json');
const signup5 = require('../../data/auth/signup5.json');
const signup6 = require('../../data/auth/signup6.json');
const signup7 = require('../../data/auth/signup7.json');
const signup8 = require('../../data/auth/signup8.json');
const lostPassword1 = require('../../data/auth/lostPassword1.json');
const lostPassword2 = require('../../data/auth/lostPassword2.json');
const lostPassword3 = require('../../data/auth/lostPassword3.json');
const lostPassword4 = require('../../data/auth/lostPassword4.json');
const lostPassword5 = require('../../data/auth/lostPassword5.json');
const lostPassword6 = require('../../data/auth/lostPassword6.json');
const lostPassword7 = require('../../data/auth/lostPassword7.json');
const newPassword1 = require('../../data/auth/newPassword1.json');
const newPassword2 = require('../../data/auth/newPassword2.json');
const login1 = require('../../data/auth/login1.json');
const login2 = require('../../data/auth/login2.json');
const login3 = require('../../data/auth/login3.json');

jest.mock('nodemailer');
const nodemailer = require('nodemailer');
let sendMailMock;
// jest.fn()
User.findOne = jest.fn();
User.create = jest.fn();
User.updateOne = jest.fn();
AuthEmail.findOne = jest.fn();
AuthEmail.create = jest.fn();
AuthEmail.updateOne = jest.fn();
AuthEmail.destroy = jest.fn();
User_info.create = jest.fn();
sendMailMock = jest.fn();

//nodemailer mocking
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

let req;
let res;
let next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
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
  test('메일 인증, 새로운 비밀번호 입력', async () => {
    req.body = lostPassword7;
    AuthEmail.findOne.mockResolvedValue(lostPassword7);
    AuthEmail.destroy.mockResolvedValue(lostPassword7);
    await AuthController.create.verifyNumberForOld(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      msg: '인증이 완료되었습니다. 새로운 비밀번호를 입력해주세요.',
    });
  });

  test('메일 인증, 인증 번호 에러', async () => {
    req.body = lostPassword7;
    AuthEmail.findOne.mockResolvedValue(undefined);
    await AuthController.create.verifyNumberForOld(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      msg: '인증 번호가 틀렸습니다.',
    });
  });
});

describe('비밀번호 변경(인증 완료)', () => {
  test('비밀번호 변경 완료', async () => {
    req.body = newPassword1;
    User.updateOne.mockResolvedValue(newPassword2);
    await AuthController.update.newPassword(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      msg: '비밀번호 변경완료!',
    });
  });
});

describe('로그인', () => {
  test('로그인 완료', async () => {
    req.body = login1;
    User.findOne.mockResolvedValue(login2);
    await AuthController.get.auth(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy(); // token값 계속 바뀜
  });

  test('로그인 실패 에러(이메일)', async () => {
    req.body = login1;
    User.findOne.mockResolvedValue(undefined);
    await AuthController.get.auth(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      msg: '이메일 혹은 비밀번호를 확인해주세요.',
    });
  });

  test('로그인 실패 에러(비밀번호)', async () => {
    req.body = login1;
    User.findOne.mockResolvedValue(login3);
    await AuthController.get.auth(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      msg: '이메일 혹은 비밀번호를 확인해주세요.',
    });
  });
});
