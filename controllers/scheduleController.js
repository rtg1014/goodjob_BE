// modules
const { Op } = require('sequelize');

// utils
const {
  asyncWrapper,
  dateFormatter,
  attributesOption,
} = require('../utils/util');

// models
const {
  User,
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
      if (!user) {
        return res.status(400).json({
          isSuccess: false,
          msg: '토큰값이 이상한데요?',
        });
      }

      if (!companyName || !title || !date || !place) {
        return res.status(400).json({
          isSuccess: false,
          msg: '양식을 완성해 주세요.',
        });
      }

      //find of create 로 바꿀것
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

    scrap: asyncWrapper(async (req, res) => {
      const { postingId } = req.body;
      const user = req.user;
      if (!user) {
        return res.status(400).json({
          isSuccess: false,
          msg: '토큰값이 이상한데요?',
        });
      }

      if (!postingId) {
        return res.status(400).json({
          isSuccess: false,
          msg: '포스팅아이디가 없음.',
        });
      }

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
      let title = posting.title;
      let place = posting.city.main + ' ' + posting.city.sub;
      let companyName = posting.companyName;
      let date = dateFormatter(posting.deadline);

      /*==================================================
      findOrCreate 메소드를 사용하면 편합니다...
      참고 https://sebhastian.com/sequelize-findorcreate/
      ===================================================*/

      // find, create 따로 사용
      // 성현님 미션 : findorcreate, 트랜잭션
      let scrapSchedule;
      let existSchedule = await Schedule.findOne({
        where: { postingId },
      });

      if (!existSchedule) {
        let newSchedule = await Schedule.create({
          title,
          place,
          date,
          companyName,
          postingId,
        });
        scrapSchedule = newSchedule;
      } else {
        scrapSchedule = existSchedule;
      }

      // findOrCreate 사용
      const [mine, created] = await user_schedule.findOrCreate({
        where: {
          userId: user.id,
          scheduleId: scrapSchedule.id,
        },
        defaults: {
          color: 0,
          sticker: 0,
          coverImage: 0,
        },
      });

      if (created) {
        return res.status(201).json({
          isSuccess: true,
          msg: '스크랩 완료!.',
        });
      } else {
        return res.status(400).json({
          isSuccess: false,
          msg: '이미 스크랩 된 포스팅입니다.',
        });
      }
    }),
  },
  // mySchedule: asyncWrapper(async (req, res) => {
  update: {},

  get: {
    daily: asyncWrapper(async (req, res) => {
      const { startDate } = req.body;
      const user = req.user;
      if (!user) {
        return res.status(400).json({
          isSuccess: false,
          msg: '토큰값이 이상한데요?',
        });
      }

      const startedDate = new Date(startDate); // 7월 20일 00시 00분 00초
      let tDate = new Date(startDate);
      tDate.setDate(tDate.getDate() + 1);
      const endDate = tDate; // 7월 21일 00시 00분 00초

      let manualSchedules = await user_schedule.findAll({
        where: {
          [Op.and]: [
            { userId: user.id },
            { '$Schedule.postingId$': { [Op.eq]: null } },
            { '$Schedule.date$': { [Op.gte]: startedDate } },
            { '$Schedule.date$': { [Op.lt]: endDate } },
          ],
        },
        attributes: ['scheduleId', 'color', 'memo', 'sticker', 'coverImage'],
        include: [
          {
            model: Schedule,
            attributes: attributesOption(),
          },
        ],
      });

      let manual = [];
      for (x of manualSchedules) {
        let temp = {
          scheduleId: x.scheduleId,
          color: x.color,
          memo: x.memo,
          sticker: x.sticker,
          coverImage: x.coverImage,
          title: x.schedule.title,
          place: x.schedule.place,
          date: dateFormatter(x.schedule.date),
          companyName: x.schedule.companyName,
        };
        manual.push(temp);
      }

      let autoSchedules = await user_schedule.findAll({
        where: {
          [Op.and]: [
            { userId: user.id },
            { '$Schedule.postingId$': { [Op.gte]: 1 } },
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

      let auto = [];
      for (x of autoSchedules) {
        let temp = {
          scheduleId: x.scheduleId,
          color: x.color,
          memo: x.memo,
          sticker: x.sticker,
          coverImage: x.coverImage,
          title: x.schedule.title,
          place: x.schedule.place,
          date: dateFormatter(x.schedule.date),
          companyName: x.schedule.companyName,
        };
        auto.push(temp);
      }
      let data = {
        manual,
        auto,
      };
      return res.status(200).json({
        isSuccess: true,
        data,
        msg: '일간 일정 조회 완료!',
      });
    }),

    weekly: asyncWrapper(async (req, res) => {
      const { startDate } = req.body;
      const user = req.user;
      console.log(user)
      if (!user) {
        console.log(user)
        return res.status(400).json({
          isSuccess: false,
          msg: '토큰값이 이상한데요?',
        });
      }
      const startedDate = new Date(startDate); // 7월 10일 00시 00분 00초
      let tDate = new Date(startDate);
      tDate.setDate(tDate.getDate() + 7);
      const endDate = tDate; // 7월 17일 00시 00분 00초

      let manualSchedules = await user_schedule.findAll({
        where: {
          [Op.and]: [
            { userId: user.id },
            { '$Schedule.postingId$': { [Op.eq]: null } },
            { '$Schedule.date$': { [Op.gte]: startedDate } },
            { '$Schedule.date$': { [Op.lt]: endDate } },
          ],
        },
        attributes: ['scheduleId', 'color', 'memo', 'sticker', 'coverImage'],
        include: [
          {
            model: Schedule,
            attributes: attributesOption(),
          },
        ],
      });

      let manual = [];
      for (x of manualSchedules) {
        let temp = {
          scheduleId: x.scheduleId,
          color: x.color,
          memo: x.memo,
          sticker: x.sticker,
          coverImage: x.coverImage,
          title: x.schedule.title,
          place: x.schedule.place,
          date: dateFormatter(x.schedule.date),
          companyName: x.schedule.companyName,
        };
        manual.push(temp);
      }

      let autoSchedules = await user_schedule.findAll({
        where: {
          [Op.and]: [
            { userId: user.id },
            { '$Schedule.postingId$': { [Op.gte]: 1 } },
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

      let auto = [];
      for (x of autoSchedules) {
        let temp = {
          scheduleId: x.scheduleId,
          color: x.color,
          memo: x.memo,
          sticker: x.sticker,
          coverImage: x.coverImage,
          title: x.schedule.title,
          place: x.schedule.place,
          date: dateFormatter(x.schedule.date),
          companyName: x.schedule.companyName,
        };
        auto.push(temp);
      }
      let data = {
        manual,
        auto,
      };

      return res.status(200).json({
        isSuccess: true,
        data,
        msg:'주간 일정 조회 완료!'
      });
    }),

    montly: asyncWrapper(async (req, res) => {
      const { startDate } = req.body;
      const user = req.user;
      if (!user) {
        return res.status(400).json({
          isSuccess: false,
          msg: '토큰값이 이상한데요?',
        });
      }

      const startedDate = new Date(startDate); // 7월 01일 00시 00분 00초
      let tDate = new Date(startDate);
      tDate.setMonth(tDate.getMonth() + 1);
      const endDate = tDate; // 8월 1일 0시 0분 0초

      let manualSchedules = await user_schedule.findAll({
        where: {
          [Op.and]: [
            { userId: user.id },
            { '$Schedule.postingId$': { [Op.eq]: null } },
            { '$Schedule.date$': { [Op.gte]: startedDate } },
            { '$Schedule.date$': { [Op.lt]: endDate } },
          ],
        },
        attributes: ['scheduleId', 'color', 'memo', 'sticker', 'coverImage'],
        include: [
          {
            model: Schedule,
            attributes: attributesOption(),
          },
        ],
      });

      let manual = [];
      for (x of manualSchedules) {
        let temp = {
          scheduleId: x.scheduleId,
          color: x.color,
          memo: x.memo,
          sticker: x.sticker,
          coverImage: x.coverImage,
          title: x.schedule.title,
          place: x.schedule.place,
          date: dateFormatter(x.schedule.date),
          companyName: x.schedule.companyName,
        };
        manual.push(temp);
      }
      let autoSchedules = await user_schedule.findAll({
        where: {
          [Op.and]: [
            { userId: user.id },
            { '$Schedule.postingId$': { [Op.gte]: 1 } },
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

      let auto = [];
      for (x of autoSchedules) {
        let temp = {
          scheduleId: x.scheduleId,
          color: x.color,
          memo: x.memo,
          sticker: x.sticker,
          coverImage: x.coverImage,
          title: x.schedule.title,
          place: x.schedule.place,
          date: dateFormatter(x.schedule.date),
          companyName: x.schedule.companyName,
        };
        auto.push(temp);
      }
      let data = {
        manual,
        auto,
      };
      return res.status(200).json({
        isSuccess: true,
        data,
        msg: '월간 일정 조회 완료!',
      });
    }),
  },

  delete: {},
};

/*==================

라이브쉐어 아이콘클릭 , 세션 챗 클릭
하시면 채팅가능합니다

=================*/
