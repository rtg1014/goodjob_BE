const httpMocks = require('node-mocks-http');
const ScheduleController = require('../../controllers/scheduleController');
const { user_schedule, Schedule, Posting } = require('../../models');
const user = require('../data/schedule/user.json');
const mySchedule1 = require('../data/schedule/mySchedule1.json');
const mySchedule2 = require('../data/schedule/mySchedule2.json');
const mySchedule3 = require('../data/schedule/mySchedule3.json');
const scrap1 = require('../data/schedule/scrap1.json');
const scrap2 = require('../data/schedule/scrap2.json');
const scrap3 = require('../data/schedule/scrap3.json');
const scrap4 = require('../data/schedule/scrap4.json');
const scrap5 = require('../data/schedule/scrap5.json');
const schedule1 = require('../data/schedule/schedule1.json');
const schedule2 = require('../data/schedule/schedule2.json');
const schedule3 = require('../data/schedule/schedule3.json');
const schedule4 = require('../data/schedule/schedule4.json');
const schedule5 = require('../data/schedule/schedule5.json');

// jest.fn()
Schedule.create = jest.fn();
Schedule.findOrCreate = jest.fn();
user_schedule.findAll = jest.fn();
user_schedule.create = jest.fn();
user_schedule.findOrCreate = jest.fn();
Posting.findOne = jest.fn();

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
  req.user = user;
});

describe('스케줄 생성(작성)', () => {
  test('생성 성공', async () => {
    req.body = mySchedule1;
    Schedule.create.mockResolvedValue(mySchedule2);
    user_schedule.create.mockResolvedValue(mySchedule3);
    await ScheduleController.create.mySchedule(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      msg: '개인 스케줄 작성이 완료되었습니다.',
    });
  });
});

describe('스케줄 생성(스크랩)', () => {
  test('생성 성공', async () => {
    req.body = scrap1;
    Posting.findOne.mockResolvedValue(scrap2);
    Schedule.findOrCreate.mockResolvedValue(scrap3);
    user_schedule.findOrCreate.mockResolvedValue(scrap4);
    await ScheduleController.create.scrap(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      msg: '스크랩 완료!',
    });
  });

  test('이미 스크랩 된 포스팅', async () => {
    req.body = scrap1;
    Posting.findOne.mockResolvedValue(scrap2);
    Schedule.findOrCreate.mockResolvedValue(scrap3);
    user_schedule.findOrCreate.mockResolvedValue(scrap5);
    await ScheduleController.create.scrap(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      msg: '이미 스크랩 된 포스팅입니다.',
    });
  });

  test('postingId에 해당하는 공고가 없음', async () => {
    req.body = scrap1;
    Posting.findOne.mockResolvedValue(undefined);
    await ScheduleController.create.scrap(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      msg: '해당 공고가 없습니다!',
    });
  });
});

describe('일간 일정 조회', () => {
  test('조회 성공', async () => {
    req.query = schedule1;
    user_schedule.findAll.mockResolvedValue(schedule2);
    await ScheduleController.get.daily(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      data: schedule3,
      msg: '일간 일정 조회 완료!',
    });
  });

  test('조회 실패', async () => {
    req.query = schedule1;
    user_schedule.findAll.mockResolvedValue(undefined);
    await ScheduleController.get.daily(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      msg: '일간 일정이 없습니다!',
    });
  });
});

describe('주간 일정 조회', () => {
  test('조회 성공', async () => {
    req.query = schedule1;
    user_schedule.findAll.mockResolvedValue(schedule4);
    await ScheduleController.get.weekly(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      data: schedule5,
      msg: '주간 일정 조회 완료!',
    });
  });

  test('조회 실패', async () => {
    req.query = schedule1;
    user_schedule.findAll.mockResolvedValue(undefined);
    await ScheduleController.get.weekly(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      msg: '주간 일정이 없습니다!',
    });
  });
});
