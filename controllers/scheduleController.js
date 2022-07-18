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
const schedule = require('../models/schedule');

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

  // await myschedule.update({
  //   image : user_schedule.image,
  //   memo : user_schedule.memo,
  //   color: user_schedule.color,
  //   sticker: user_schedule.sticker,
  //   companyName : schedule.companyName,
  //   title : schedule.title,
  //   date: dateFormatter(schedule.date),
  //   place: schedule.place

  // },{
  //   where: { userId: user.id, scheduleId },
  // });

  // data = {
  //   image: myschedule.image,
  //   companyName: myschedule.companyName,
  //   color : myschedule.color,
  //   title : myschedule.title,
  //   sticker : myschedule.sticker,
  //   date: myschedule.date,
  //   place: myschedule.place,
  //   memo: myschedule.memo
  // };

  // await user_schedule.update(
  //   {
  //     image,
  //     companyName,
  //     color,
  //     title,
  //     sticker,
  //     date: dateFormatter(date),
  //     place,
  //     memo ,
  //   },
  //   {
  //     where: { userId: user.id, scheduleId },
  //   }
  // );
  // console.log('result', result);
  update: {
    modify: asyncWrapper(async (req, res) => {
      const user = req.user;
      if (!user) {
        return res.status(400).json({
          isSuccess: false,
          msg: '토큰값이 이상한데요?',
        });
      }

      const { scheduleId } = req.params;
      const { image, companyName, color, title, sticker, date, place, memo } =
        req.body;

      await user_schedule.update(
        {
          coverImage :image,
          color,
          memo,
          sticker,
        },
        {
          where: { userId: user.id, scheduleId }, // user_sc => userId(9) , scheduleId(25)
        }
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
        }
      );

      return res.status(200).json({
        isSuccess: true,

        msg: '일정 내용 수정하기 완료!',
      });
    }),
  },

  get: {
    detail: asyncWrapper(async (req, res) => {
      const user = req.user;
      if (!user) {
        return res.status(400).json({
          isSuccess: false,
          msg: '토큰값이 이상한데요?',
        });
      }
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
      const { startDate } = req.query;
      const user = req.user;
      console.log(user);
      if (!user) {
        console.log(user);
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
        msg: '주간 일정 조회 완료!',
      });
    }),

    montly: asyncWrapper(async (req, res) => {
      const { startDate } = req.query;
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

  delete: {
    delete: asyncWrapper(async (req, res) => {
      const { scheduleId } = req.params;
      const user = req.user;
      if (!user) {
        return res.status(400).json({
          isSuccess: false,
          msg: '토큰값이 이상한데요?',
        });
      }

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

      let shareSchedule = await user_schedule.findOne({
        where: {
          [Op.and]: [{ userId: { [Op.ne]: user.id } }, { scheduleId }],
        },
      });
      if (shareSchedule) {
        await user_schedule.destroy({
          where: { userId: user.id, scheduleId },
        });
      } else {
        await Schedule.destroy({
          // schedule에서 없애면 user_schedule에서도 없어집니다!
          where: { id: scheduleId },
        });
      }

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
