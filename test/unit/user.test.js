const httpMocks = require('node-mocks-http');
const AuthController = require('../../controllers/authController');
const User = require('../../models/user');
const AuthEmail = require('../../models/authEmail');
const locals = require('../data/locals.json');
const signup1 = require('../data/signup1.json');
const signup2 = require('../data/signup2.json');
const signup3 = require('../data/signup3.json');
const {auth, joiMiddleware} = require('../../utils/middleware');


User.findOne = jest.fn();
User.create = jest.fn();
User.updateOne = jest.fn();
AuthEmail.findOne = jest.fn();
AuthEmail.create = jest.fn();
AuthEmail.updateOne = jest.fn();

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
  res.locals.user = locals;
});
describe('회원가입', () => {
  test('회원가입 가능할 때', async () => {
    req.body = signup1;
    joiMiddleware('localSchema')
    AuthEmail.create.mockResolvedValue(signup2);
    await AuthController.create.local(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      msg: '메일 발송 완료. 메일함을 확인해 주세요.',
    });
  });
//   test('password와 confirmPassword 다른 경우', async () => {
//       req.body = signup3;
//       joiMiddleware('localSchema')(req,res,next)
//       await AuthController.create.local(req, res, next);
//       expect(res._getJSONData()).toStrictEqual({
//           fail: '비밀번호가 일치하지 않습니다.',
//       });
//   });

});