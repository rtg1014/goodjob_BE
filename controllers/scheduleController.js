// modules
const { Op } = require('sequelize');

// utils
const {
  asyncWrapper,
  asyncWrapperWithTransaction,
  dateFormatter,
  attributesOption,
  invalidToken,
} = require('../utils/util');
const { processing } = require('../utils/dataProcessing');

// models
const {
  user_schedule,
  Schedule,
  Posting,
  Career,
  City,
  CompanyType,
} = require('../models');

module.exports = {
  create: {
    mySchedule: asyncWrapper(async (req, res) => {
      // 스케줄 수동
      const { image, companyName, color, title, sticker, date, place, memo } =
        req.body;
      const user = req.user;
      invalidToken(user);

      const schedule = await Schedule.create({
        date,
        title,
        place,
        companyName,
      });

      await user_schedule.create({
        userId: user.id,
        scheduleId: schedule.id,
        sticker,
        coverImage: image,
        memo,
        color,
      });
      return res.status(201).json({
        isSuccess: true,
        msg: '개인 스케줄 작성이 완료되었습니다.',
      });
    }),

    scrap: asyncWrapperWithTransaction(async (req, res, next, t) => {
      const { postingId } = req.body;
      const user = req.user;
      invalidToken(user);

      let posting = await Posting.findOne({
        where: { id: postingId },
        include: [
          {
            model: Career,
            attributes: attributesOption(),
          },
          {
            model: City,
            attributes: attributesOption(),
          },
          {
            model: CompanyType,
            attributes: attributesOption(),
          },
        ],
      });
      if (!posting) {
        return res.status(400).json({
          isSuccess: false,
          msg: '해당 공고가 없습니다!',
        });
      }
      let title = posting.title;
      let place = posting.city.main + ' ' + posting.city.sub;
      let companyName = posting.companyName;
      let date = dateFormatter(posting.deadline);
      /*==================================================
      findOrCreate 
      참고 https://sebhastian.com/sequelize-findorcreate/
      ===================================================*/

      let scrapSchedule = await Schedule.findOrCreate(
        {
          // scrapSchedule === [a, b]  a=== 결과물 b === create 트루, find false
          where: { postingId },
          defaults: {
            title,
            place,
            date,
            companyName,
            postingId,
          },
        }
        // { transaction: t } //findOrCreate에 트랜잭션 사용이 안되는듯 합니다..
      );

      // findOrCreate 사용
      const [mine, created] = await user_schedule.findOrCreate(
        {
          where: {
            userId: user.id,
            scheduleId: scrapSchedule[0].id,
          },
          defaults: {
            color: 1,
            sticker: 1,
            coverImage: 1,
          },
        }
        // { transaction: t }
      );

      await t.commit();

      if (created) {
        return res.status(201).json({
          isSuccess: true,
          msg: '스크랩 완료!',
        });
      } else {
        return res.status(400).json({
          isSuccess: false,
          msg: '이미 스크랩 된 포스팅입니다.',
        });
      }
    }),
  },

  update: {
    modify: asyncWrapperWithTransaction(async (req, res, next, t) => {
      const user = req.user;
      invalidToken(user);

      const { scheduleId } = req.params;
      const { image, companyName, color, title, sticker, date, place, memo } =
        req.body;

      let myschedule = await user_schedule.findOne({
        where: { userId: user.id, scheduleId },
      });

      if (!myschedule) {
        return res.status(400).json({
          isSuccess: false,
          msg: '잘못된 접근입니다.',
        });
      }

      let scrapSchedule = await Schedule.findOne({
        where: {
          [Op.and]: [{ id: scheduleId }, { postingId: { [Op.ne]: null } }], //null이 아니다 === 값이 있다 === 스크랩해왔다
        },
      });

      if (scrapSchedule) {
        return res.status(400).json({
          isSuccess: false,
          msg: '스크랩 일정은 수정할 수 없습니다.',
        });
      }

      await user_schedule.update(
        {
          coverImage: image,
          color,
          memo,
          sticker,
        },
        {
          where: { userId: user.id, scheduleId }, // user_sc => userId(9) , scheduleId(25)
        },
        { transaction: t }
      );

      await Schedule.update(
        {
          title,
          place,
          date,
          companyName,
        },
        {
          where: { Id: scheduleId }, // Schedule => Id(25) === sceduleId(25)
        },
        { transaction: t }
      );

      await t.commit();

      return res.status(200).json({
        isSuccess: true,
        msg: '일정 내용 수정하기 완료!',
      });
    }),
  },

  get: {
    detail: asyncWrapper(async (req, res) => {
      const user = req.user;
      invalidToken(user);
      const { scheduleId } = req.params;

      let myschedule = await user_schedule.findOne({
        where: { userId: user.id, scheduleId },
        include: [
          {
            model: Schedule,
            attributes: attributesOption(),
          },
        ],
      });

      if (!myschedule) {
        return res.status(400).json({
          isSuccess: false,
          msg: '잘못된 접근입니다.',
        });
      }

      const data = {
        userId: myschedule.userId,
        scheduleId: myschedule.scheduleId,
        color: myschedule.color,
        memo: myschedule.memo,
        sticker: myschedule.sticker,
        coverImage: myschedule.coverImage,
        title: myschedule.schedule.title,
        place: myschedule.schedule.place,
        date: dateFormatter(myschedule.schedule.date),
        companyName: myschedule.schedule.companyName,
        postingId: myschedule.schedule.postingId,
      };

      return res.status(200).json({
        isSuccess: true,
        data,
        msg: '일정 상세보기 완료!',
      });
    }),

    daily: asyncWrapper(async (req, res) => {
      const { startDate } = req.query;
      const user = req.user;
      invalidToken(user);

      const startedDate = new Date(startDate); // 7월 20일 00시 00분 00초
      let tDate = new Date(startDate);
      tDate.setDate(tDate.getDate() + 1);
      const endDate = tDate; // 7월 21일 00시 00분 00초

      let schedules = await user_schedule.findAll({
        where: {
          [Op.and]: [
            { userId: user.id },
            { '$Schedule.date$': { [Op.gte]: startedDate } },
            { '$Schedule.date$': { [Op.lt]: endDate } },
          ],
        },
        attributes: ['scheduleId', 'color', 'memo', 'sticker', 'coverImage'],
        include: [
          {
            model: Schedule,
            attributes: attributesOption(),
            include: [
              {
                model: Posting,
                attributes: attributesOption(),
              },
            ],
          },
        ],
      });

      let data = processing(schedules);
      return res.status(200).json({
        isSuccess: true,
        data,
        msg: '일간 일정 조회 완료!',
      });
    }),

    weekly: asyncWrapper(async (req, res) => {
      const { startDate } = req.query;
      const user = req.user;
      invalidToken(user);

      const startedDate = new Date(startDate); // 7월 10일 00시 00분 00초
      let tDate = new Date(startDate);
      tDate.setDate(tDate.getDate() + 7);
      const endDate = tDate; // 7월 17일 00시 00분 00초

      let schedules = await user_schedule.findAll({
        where: {
          [Op.and]: [
            { userId: user.id },
            { '$Schedule.date$': { [Op.gte]: startedDate } },
            { '$Schedule.date$': { [Op.lt]: endDate } },
          ],
        },
        attributes: ['scheduleId', 'color', 'memo', 'sticker', 'coverImage'],
        include: [
          {
            model: Schedule,
            attributes: attributesOption(),
            include: [
              {
                model: Posting,
                attributes: attributesOption(),
              },
            ],
          },
        ],
      });

      let data = processing(schedules);

      return res.status(200).json({
        isSuccess: true,
        data,
        msg: '주간 일정 조회 완료!',
      });
    }),

    monthly: asyncWrapper(async (req, res) => {
      const { startDate } = req.query;
      const user = req.user;
      invalidToken(user);

      const startedDate = new Date(startDate); // 7월 01일 00시 00분 00초
      let tDate = new Date(startDate);
      tDate.setMonth(tDate.getMonth() + 1);
      const endDate = tDate; // 8월 1일 0시 0분 0초

      let schedules = await user_schedule.findAll({
        where: {
          [Op.and]: [
            { userId: user.id },
            { '$Schedule.date$': { [Op.gte]: startedDate } },
            { '$Schedule.date$': { [Op.lt]: endDate } },
          ],
        },
        attributes: ['scheduleId', 'color', 'memo', 'sticker', 'coverImage'],
        include: [
          {
            model: Schedule,
            attributes: attributesOption(),
            include: [
              {
                model: Posting,
                attributes: attributesOption(),
              },
            ],
          },
        ],
      });

      let data = processing(schedules);

      return res.status(200).json({
        isSuccess: true,
        data,
        msg: '월간 일정 조회 완료!',
      });
    }),

    search: asyncWrapper(async (req, res) => {
      const { keyword } = req.query;
      const user = req.user;
      invalidToken(user);

      let schedules = await user_schedule.findAll({
        where: {
          userid: user.id,
          [Op.or]: [
            { '$Schedule.title$': { [Op.like]: '%' + keyword + '%' } },
            { memo: { [Op.like]: '%' + keyword + '%' } },
            { '$Schedule.place$': { [Op.like]: '%' + keyword + '%' } },
            { '$Schedule.companyName$': { [Op.like]: '%' + keyword + '%' } },
          ],
        },
        include: [
          {
            model: Schedule,
            attributes: attributesOption(),
            include: [
              {
                model: Posting,
                attributes: attributesOption(),
              },
            ],
          },
        ],
      });

      let data = processing(schedules);

      return res.status(200).json({
        isSuccess: true,
        data,
        msg: '일정 검색 완료!',
      });
    }),
  },

  delete: {
    delete: asyncWrapper(async (req, res) => {
      const { scheduleId } = req.params;
      const user = req.user;
      invalidToken(user);

      let myschedule = await user_schedule.findOne({
        where: { userId: user.id, scheduleId },
        include: [
          {
            model: Schedule,
            attributes: attributesOption(),
          },
        ],
      });

      if (!myschedule) {
        return res.status(400).json({
          isSuccess: false,
          msg: '잘못된 접근입니다.',
        });
      }

      await Schedule.destroy({
        where: { id: scheduleId },
      });

      return res.status(200).json({
        isSuccess: true,
        msg: '일정 삭제 완료!',
      });
    }),
  },
};

/*==================

라이브쉐어 아이콘클릭 , 세션 챗 클릭
하시면 채팅가능합니다

=================*/
