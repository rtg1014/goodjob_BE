const httpMocks = require('node-mocks-http');
const ScheduleController = require('../../controllers/scheduleController');
const {
  user_schedule,
  Schedule,
} = require('../../models');
const user = require('../data/schedule/user.json');
const mySchedule1 = require('../data/schedule/mySchedule1.json');
const mySchedule2 = require('../data/schedule/mySchedule2.json');
const mySchedule3 = require('../data/schedule/mySchedule3.json');

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
    req.body = mySchedule1
    Schedule.create.mockResolvedValue(mySchedule2);
    user_schedule.create.mockResolvedValue(mySchedule3);
    await ScheduleController.create.mySchedule(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
        isSuccess: true,
        msg: '개인 스케줄 작성이 완료되었습니다.',
    });
  });
});
