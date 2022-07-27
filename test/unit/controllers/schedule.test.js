const httpMocks = require('node-mocks-http');
const ScheduleController = require('../../../controllers/scheduleController');
const { user_schedule, Schedule, Posting } = require('../../../models');
const user = require('../../data/schedule/user.json');
const mySchedule1 = require('../../data/schedule/mySchedule1.json');
const mySchedule2 = require('../../data/schedule/mySchedule2.json');
const mySchedule3 = require('../../data/schedule/mySchedule3.json');
const scrap1 = require('../../data/schedule/scrap1.json');
const scrap2 = require('../../data/schedule/scrap2.json');
const scrap3 = require('../../data/schedule/scrap3.json');
const scrap4 = require('../../data/schedule/scrap4.json');
const scrap5 = require('../../data/schedule/scrap5.json');
const schedule1 = require('../../data/schedule/schedule1.json');
const schedule2 = require('../../data/schedule/schedule2.json');
const schedule3 = require('../../data/schedule/schedule3.json');
const schedule4 = require('../../data/schedule/schedule4.json');
const schedule5 = require('../../data/schedule/schedule5.json');
const schedule6 = require('../../data/schedule/schedule6.json');
const schedule7 = require('../../data/schedule/schedule7.json');
const schedule8 = require('../../data/schedule/schedule8.json');
const search1 = require('../../data/schedule/search1.json');
const search2 = require('../../data/schedule/search2.json');
const search3 = require('../../data/schedule/search3.json');
const search4 = require('../../data/schedule/search4.json');
const detail1 = require('../../data/schedule/detail1.json');
const detail2 = require('../../data/schedule/detail2.json');
const detail3 = require('../../data/schedule/detail3.json');
const detail4 = require('../../data/schedule/detail4.json');
const detail5 = require('../../data/schedule/detail5.json');
const detail6 = require('../../data/schedule/detail6.json');
const modify1 = require('../../data/schedule/modify1.json');
const modify2 = require('../../data/schedule/modify2.json');
const modify3 = require('../../data/schedule/modify3.json');
const modify4 = require('../../data/schedule/modify4.json');
const modify5 = require('../../data/schedule/modify5.json');
const modify6 = require('../../data/schedule/modify6.json');
const modify7 = require('../../data/schedule/modify7.json');
const modify8 = require('../../data/schedule/modify8.json');
const modify9 = require('../../data/schedule/modify9.json');
const delete1 = require('../../data/schedule/delete1.json');
const delete2 = require('../../data/schedule/delete2.json');
const delete3 = require('../../data/schedule/delete3.json');
const delete4 = require('../../data/schedule/delete4.json');
const delete5 = require('../../data/schedule/delete5.json');

// jest.fn()
Schedule.findOne = jest.fn();
Schedule.create = jest.fn();
Schedule.findOrCreate = jest.fn();
Schedule.update = jest.fn();
Schedule.destroy = jest.fn();
user_schedule.findAll = jest.fn();
user_schedule.findOne = jest.fn();
user_schedule.create = jest.fn();
user_schedule.findOrCreate = jest.fn();
user_schedule.update = jest.fn();
Posting.findOne = jest.fn();

let req;
let res;
let next;

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

describe('월간 일정 조회', () => {
  test('조회 성공', async () => {
    req.query = schedule6;
    user_schedule.findAll.mockResolvedValue(schedule7);
    await ScheduleController.get.monthly(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      data: schedule8,
      msg: '월간 일정 조회 완료!',
    });
  });

  test('조회 실패', async () => {
    req.query = schedule6;
    user_schedule.findAll.mockResolvedValue(undefined);
    await ScheduleController.get.monthly(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      msg: '월간 일정이 없습니다!',
    });
  });
});

describe('일정 검색', () => {
  test('검색 완료', async () => {
    req.query = search1;
    user_schedule.findAll.mockResolvedValue(search2);
    await ScheduleController.get.search(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      data: search3,
      msg: '일정 검색 완료!',
    });
  });

  test('검색 실패', async () => {
    req.query = search4;
    user_schedule.findAll.mockResolvedValue(undefined);
    await ScheduleController.get.search(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      msg: '검색 결과가 없습니다!',
    });
  });
});

describe('일정 상세 (조회)', () => {
  test('조회 완료(스크랩)', async () => {
    req.parmas = detail1;
    user_schedule.findOne.mockResolvedValue(detail2);
    await ScheduleController.get.detail(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      data: detail3,
      msg: '일정 상세보기 완료!',
    });
  });

  test('조회 실패(스크랩)', async () => {
    req.parmas = detail1;
    user_schedule.findOne.mockResolvedValue(undefined);
    await ScheduleController.get.detail(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      msg: '잘못된 접근입니다.',
    });
  });

  test('조회 완료(수동 작성)', async () => {
    req.parmas = detail4;
    user_schedule.findOne.mockResolvedValue(detail5);
    await ScheduleController.get.detail(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      data: detail6,
      msg: '일정 상세보기 완료!',
    });
  });

  test('조회 실패(수동 작성)', async () => {
    req.parmas = detail4;
    user_schedule.findOne.mockResolvedValue(undefined);
    await ScheduleController.get.detail(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      msg: '잘못된 접근입니다.',
    });
  });
});

describe('일정 상세 (수정)', () => {
  test('수정 완료(수동 작성)', async () => {
    req.parmas = modify5;
    req.body = modify7;
    user_schedule.findOne.mockResolvedValue(modify6);
    Schedule.findOne.mockResolvedValue(undefined);
    user_schedule.update.mockResolvedValue(modify8);
    Schedule.update.mockResolvedValue(modify9);
    await ScheduleController.update.modify(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      msg: '일정 내용 수정하기 완료!',
    });
  });

  test('scheduleId에 해당하는 일정이 없을 때 에러', async () => {
    req.parmas = modify1;
    user_schedule.findOne.mockResolvedValue(undefined);
    Schedule.findOne.mockResolvedValue(undefined);
    await ScheduleController.update.modify(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      msg: '잘못된 접근입니다.',
    });
  });

  test('스크랩한 일정을 수정할 때 에러', async () => {
    req.parmas = modify2;
    user_schedule.findOne.mockResolvedValue(modify3);
    Schedule.findOne.mockResolvedValue(modify4);
    await ScheduleController.update.modify(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      msg: '스크랩 일정은 수정할 수 없습니다.',
    });
  });
});

describe('일정 상세 (삭제)', () => {
  test('삭제 완료(수동 작성)', async () => {
    req.parmas = delete3;
    user_schedule.findOne.mockResolvedValue(delete4);
    Schedule.destroy.mockResolvedValue(undefined);
    await ScheduleController.delete.delete(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      msg: '일정 삭제 완료!',
    });
  });

  test('삭제 완료(스크랩)', async () => {
    req.parmas = delete2;
    user_schedule.findOne.mockResolvedValue(delete5);
    Schedule.destroy.mockResolvedValue(undefined);
    await ScheduleController.delete.delete(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      msg: '일정 삭제 완료!',
    });
  });

  test('scheduleId에 해당하는 일정이 없을 때 에러', async () => {
    req.parmas = delete1;
    user_schedule.findOne.mockResolvedValue(undefined);
    Schedule.destroy.mockResolvedValue(undefined);
    await ScheduleController.delete.delete(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: false,
      msg: '잘못된 접근입니다.',
    });
  });
});
