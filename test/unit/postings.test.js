const httpMocks = require('node-mocks-http');
const PostingController = require('../../controllers/postingController');
const { User, AuthEmail, User_info } = require('../../models');
const user = require('../data/posting/user.json');
const category1 = require('../data/posting/category1.json');
const category2 = require('../data/posting/category2.json');

// jest.fn()
User.findOne = jest.fn();
User.create = jest.fn();
User.updateOne = jest.fn();
AuthEmail.findOne = jest.fn();
AuthEmail.create = jest.fn();
AuthEmail.updateOne = jest.fn();
AuthEmail.destroy = jest.fn();
User_info.findOne = jest.fn();
sendMailMock = jest.fn()

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
    req.user = user
});

describe('카테고리 조회', () => {
    test('조회 성공', async () => {
        User_info.findOne.mockResolvedValue(category1)
        await PostingController.get.category(req, res, next);
        expect(res._getJSONData()).toStrictEqual({
            isSuccess: true,
            data: category2,
            msg: '카테고리 조회 완료!',
        });
    });

    test('조회 실패 에러', async () => {
        User_info.findOne.mockResolvedValue(undefined)
        await PostingController.get.category(req, res, next);
        expect(res._getJSONData()).toStrictEqual({
            isSuccess: false,
            msg: '카테고리 조회 실패',
        });
    });
});