const httpMocks = require('node-mocks-http');
const PostingController = require('../../controllers/postingController');
const { Posting, User_info } = require('../../models');
const user = require('../data/posting/user.json');
const category1 = require('../data/posting/category1.json');
const category2 = require('../data/posting/category2.json');
const category3 = require('../data/posting/category3.json');
const category4 = require('../data/posting/category4.json');
const category5 = require('../data/posting/category5.json');
const category6 = require('../data/posting/category6.json');
const category7 = require('../data/posting/category7.json');
const category8 = require('../data/posting/category8.json');
const category9 = require('../data/posting/category9.json');
const category10 = require('../data/posting/category10.json');
const category11 = require('../data/posting/category11.json');
// const postings = require('../data/posting/postings.json');

// jest.fn()
User_info.findOne = jest.fn();
User_info.updateOne = jest.fn();
Posting.findAll = jest.fn();

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
  req.user = user;
});

describe('카테고리 조회', () => {
  test('조회 성공', async () => {
    User_info.findOne.mockResolvedValue(category1);
    await PostingController.get.category(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      data: category2,
      msg: '카테고리 조회 완료!',
    });
  });

  test('조회 실패 에러', async () => {
    User_info.findOne.mockResolvedValue(undefined);
    await PostingController.get.category(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      msg: '카테고리 조회 실패',
    });
  });
});

describe('카테고리 변경', () => {
  test('변경 성공(경력)', async () => {
    req.body = category3;
    User_info.updateOne.mockResolvedValue(category4);
    await PostingController.update.category(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      msg: '카테고리 변경 완료',
    });
  });

  test('변경 성공(기업 형태)', async () => {
    req.body = category5;
    User_info.updateOne.mockResolvedValue(category6);
    await PostingController.update.category(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      msg: '카테고리 변경 완료',
    });
  });

  test('변경 성공(근무지)', async () => {
    req.body = category7;
    User_info.updateOne.mockResolvedValue(category8);
    await PostingController.update.category(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      msg: '카테고리 변경 완료',
    });
  });

  test('변경 성공(직무)', async () => {
    req.body = category9;
    User_info.updateOne.mockResolvedValue(category10);
    await PostingController.update.category(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      msg: '카테고리 변경 완료',
    });
  });

  test('변경 실패 에러', async () => {
    req.body = category11;
    User_info.updateOne.mockResolvedValue(undefined);
    await PostingController.update.category(req, res, next);
    expect(res.statusCode).toBe(500);
  });
});

// describe('추천채용 조회', () => {
//     test('조회 성공', async () => {
//       User_info.findOne.mockResolvedValue(category1);
//       Posting.findAll.mockResolvedValue(postings);
//       await PostingController.get.postings(req, res, next);
//       expect(res._getJSONData()).toStrictEqual({
//         isSuccess: true,
//         data,
//         updatedAt,
//         msg: '추천채용 여기있어요!',
//       });
//     });
//   });