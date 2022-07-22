const httpMocks = require('node-mocks-http');
const ScheduleController = require('../../controllers/scheduleController');
const {
  user_schedule,
  Schedule,
  Posting,
  Career,
  City,
  CompanyType,
} = require('../models');
const user = require('../data/posting/user.json');

// jest.fn()
Schedule.create = jest.fn();
user_schedule.create = jest.fn();

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
  req.user = user;
});

describe('스케줄 생성(작성)', () => {
  test('생성 성공', async () => {
    User_info.findOne.mockResolvedValue(category1);
    await ScheduleController.create.mySchedule(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
        isSuccess: true,
        msg: '개인 스케줄 작성이 완료되었습니다.',
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

  test("Just pass", () => {
    expect(() => {
    }).not.toThrow();
  });
});
