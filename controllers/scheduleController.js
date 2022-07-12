// modules
const { Op } = require('sequelize');

// utils
const { asyncWrapper, dateFormatter } = require('../utils/util');

// models
const { User, user_schedule, Schedule, Posting } = require('../models');

module.exports = {
  create: {
    mySchedule: asyncWrapper(async (req, res) => {
      // 스케줄 수동
      const { image, companyName, title, sticker, date, place, memo } =
        req.body;
      // const { token } = req.header; // 토큰에 저장된 유저 이메일
      if (!companyName || !title || !date || !place) {
        return res.status(400).json({
          isSuccess: false,
          msg: '양식을 완성해 주세요.',
        });
      }
      if (!sticker) sticker = 0;
      if (!image) image = 0;

      const schedule = await Schedule.create({
        date,
        title,
        place,
        companyName,
      });

      // const user = await User.findOne({
      //   where: { email: token.email },
      // });
      await user_schedule.create({
        userId: 1, //토큰되면 수정
        scheduleId: schedule.id,
        sticker,
        coverImage: image,
        memo,
      });
      return res.status(201).json({
        isSuccess: true,
        msg: '개인 스케줄 작성이 완료되었습니다.',
      });
    }),

    scrap: asyncWrapper(async (req, res) => {
      const { token } = req.header;
      const { postingId } = req.body;
      // if (!token || !postingId) { // 토큰되면 수정
      if (!postingId) {
        return res.status(400).json({
          isSuccess: false,
          msg: '토큰이나 포스팅아이디가 없음.',
        });
      }

      /*==================================================
      findOrCreate 메소드를 사용하면 편합니다...
      참고 https://sebhastian.com/sequelize-findorcreate/
      ===================================================*/

      // find, create 따로 사용
      let scrapSchedule;
      let existSchedule = await Schedule.findOne({
        where: { postingId },
      });

      if (!existSchedule) {
        let newSchedule = await Schedule.Create({
          postingId,
        });
        scrapSchedule = newSchedule;
      } else {
        scrapSchedule = existSchedule;
      }

      // const user = await User.findOne({  //토큰 되면 수정
      //   where: { email: token.email },
      // });

      // findOrCreate 사용
      await user_schedule
        .findOrCreate({
          where: {
            userId: 1,
            postingId,
          },
          defaults: {
            color: 0,
            sticker: 0,
            coverImage: 0,
          },
        })
        .spread((mine, created) => {
          if (created) {
            console.log('New scrap:', mine);
            return res.status(201).json({
              isSuccess: true,
              msg: '스크랩 완료!.',
            });
          } else {
            console.log('Old scrap:', mine);
            return res.status(400).json({
              isSuccess: false,
              msg: '이미 스크랩 된 포스팅입니다.',
            });
          }
        });
    }),
  },
  // mySchedule: asyncWrapper(async (req, res) => {
  update: {},

  get: {
    weekly: asyncWrapper(async (req, res) => {
      // 주간 일정 조회 ✨테스트 필요
      const { startDate } = req.body;
      // const { token } = req.header;
      const startedDate = new Date(startDate);

      // 재 선언 때문에 var를 굳이 썼습니다..
      var tDate = new Date(startDate);
      tDate.setDate(tDate.getDate() + 6);
      tDate.setHours(tDate.getHours() + 23);
      tDate.setMinutes(tDate.getMinutes() + 59);
      const endDate = dateFormatter(tDate);

      // const user = await User.findOne({    //토큰되면 수정
      //   where: { email: token.email },
      // });

      // 수동 스크랩 조회
      const manual = await user_schedule.findAll({
        where: { userId: 1 }, //토큰되면 수정
        include: [
          {
            model: Schedule,
            where: {
              [Op.and]: [{ date: { [Op.between]: [startedDate, endDate] } }],
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
                  [Op.and]: [
                    { deadline: { [Op.between]: [startedDate, endDate] } },
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
