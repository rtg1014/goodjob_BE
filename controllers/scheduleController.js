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
    weekly: asyncWrapper(async (req, res) => {
      // 주간 일정 조회 ✨테스트 필요
      const user = req.user;
      if (!user) {
        return res.status(400).json({
          isSuccess: false,
          msg: '토큰값이 이상한데요?',
        });
      }
      const { startDate } = req.body;
      // const { token } = req.header;
      const startedDate = new Date(startDate); // 7월 11일 00시 00분 00초

      // 재 선언 때문에 var를 굳이 썼습니다..
      var tDate = new Date(startDate);
      tDate.setDate(tDate.getDate() + 6);
      tDate.setHours(tDate.getHours() + 23);
      tDate.setMinutes(tDate.getMinutes() + 59);
      tDate.setSeconds(tDate.getSeconds() + 59);
      const endDate = dateFormatter(tDate); // 7월 17일 23시 59분 59초

      // const user = await User.findOne({    //토큰되면 수정
      //   where: { email: token.email },
      // });

      // 수동 스크랩 조회
      const manual = await user_schedule.findAll({
        where: { userId: user.id }, //토큰되면 수정
        include: [
          {
            model: Schedule,
            where: {
              [Op.or]: [
                { date: { [Op.between]: [startedDate, endDate] } },
                { date: startedDate },
                { date: endDate },
              ],
            },
          },
        ],
      });

      // 자동 스크랩 조회 (attributes, through 옵션 넣기)
      const auto = await user_schedule.findAll({
        where: { userId: 1 }, //토큰되면 수정
        include: [
          {
            model: Schedule,
            include: [
              {
                model: Posting,
                where: {
                  [Op.or]: [
                    { deadline: { [Op.between]: [startedDate, endDate] } },
                    { deadline: startedDate },
                    { deadline: endDate },
                  ],
                },
              },
            ],
          },
        ],
      });
      return res.status(200).json({
        isSuccess: true,
        manual,
        auto,
      });
    }),

    montly: asyncWrapper(async (req, res) => {
      // 주간 일정 조회 ✨테스트 필요
      const { startDate } = req.body;
      const { token } = req.header;
      const startedDate = new Date(startDate);

      // 재 선언 때문에 var를 굳이 썼습니다..
      var tDate = new Date(startDate);
      tDate.setMonth(tDate.getMonth() + 1);
      const endDate = dateFormatter(tDate);

      const user = await User.findOne({
        where: { email: token.email },
      });

      // 수동 스크랩 조회
      const manual = await user_schedule.findAll({
        where: { userId: user.id },
        include: [
          {
            model: Schedule,
            where: {
              [Op.or]: [
                { date: { [Op.between]: [startedDate, endDate] } },
                { date: startedDate },
              ],
            },
          },
        ],
      });

      // 자동 스크랩 조회 (attributes, through 옵션 넣기)
      const auto = await user_schedule.findAll({
        where: { userId: user.id },
        include: [
          {
            model: Schedule,
            include: [
              {
                model: Posting,
                where: {
                  [Op.or]: [
                    { deadline: { [Op.between]: [startedDate, endDate] } },
                    { deadline: startedDate },
                  ],
                },
              },
            ],
          },
        ],
      });
      return res.status(200).json({
        isSuccess: true,
        manual,
        auto,
      });
    }),
  },

  delete: {},
};

/*==================

라이브쉐어 아이콘클릭 , 세션 챗 클릭
하시면 채팅가능합니다

=================*/
