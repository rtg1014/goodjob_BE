// modules
const { Op } = require('sequelize');

// utils
const {
  asyncWrapper,
  attributesOption,
  dateFormatter,
  invalidToken,
} = require('../utils/util');

// models
const {
  Posting,
  Career,
  CompanyType,
  City,
  Job,
  User_info,
  user_schedule,
  Schedule,
  user_posting,
  User,
} = require('../models');

module.exports = {
  create: {
    like: asyncWrapper(async (req, res, next) => {
      const user = req.user;
      invalidToken(user);
      const { postingId } = req.params;
      const posting = await Posting.findOne({
        where: { id: postingId },
      });

      if (!posting)
        return res.status(400).json({
          isSuccess: false,
          msg: '해당 포스팅이 존재하지 않습니다.',
        });

      const likePosting = await user_posting.create({
        userId: user.id,
        postingId,
      });

      return res.status(200).json({
        isSuccess: true,
        data: likePosting,
        msg: '찜하기 완료!',
      });
    }),
  },

  update: {
    category: asyncWrapper(async (req, res, next) => {
      const { career, companyType, cityMain, citySub, jobMain, jobSub } =
        req.body;

      /// 로그인확인부분 (어스 미들웨어)
      const user = req.user;
      invalidToken(user);

      let tempJob;
      let jobId = 1;
      if (jobMain) {
        if (!jobSub || jobSub === '전체') {
          tempJob = await Job.findOne({
            where: { main: jobMain },
          });
          jobId = tempJob.id;
        } else {
          tempJob = await Job.findOne({
            where: { main: jobMain, sub: jobSub },
          });
          jobId = tempJob.id;
        }
      }

      let tempCity;
      let cityId = 1;
      if (cityMain) {
        if (!citySub || citySub === '전체') {
          tempCity = await City.findOne({
            where: { main: cityMain },
          });
          cityId = tempCity.id;
        } else {
          tempCity = await City.findOne({
            where: { main: cityMain, sub: citySub },
          });
          cityId = tempCity.id;
        }
      }

      let tempCompanyType;
      let companyTypeId = 1;
      if (companyType) {
        tempCompanyType = await CompanyType.findOne({
          where: { type: companyType },
        });
        companyTypeId = tempCompanyType.id;
      }

      let tempCareer;
      let careerId;
      if (career) {
        tempCareer = await Career.findOne({
          where: { type: career },
        });
        careerId = tempCareer.id;
      } else {
        let unselectedUser = await User_info.findOne({
          where: { userId: user.id },
        });
        careerId = unselectedUser.careerId;
      }

      let newcategory = await User_info.update(
        {
          careerId,
          companyTypeId,
          cityId,
          jobId,
        },
        {
          where: { userId: user.id },
        }
      );

      next();
    }),
  },

  get: {
    category: asyncWrapper(async (req, res) => {
      const user = req.user;
      invalidToken(user);

      const rawData = await User_info.findOne({
        where: { userId: user.id },
        attributes: {
          exclude: [
            'id',
            'type',
            'createdAt',
            'updatedAt',
            'careerId',
            'cityId',
            'companyTypeId',
            'jobId',
            'userId',
          ],
        },
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
          {
            model: Job,
            attributes: attributesOption(),
          },
        ],
      });

      if (!rawData) {
        return res.status(400).json({
          isSuccess: false,
          msg: '카테고리 조회 실패',
        });
      }

      const data = {
        career: rawData.career.type,
        companyType: rawData.companyType.type,
        cityMain: rawData.city.main,
        citySub: rawData.city.sub,
        jobMain: rawData.job.main,
        jobSub: rawData.job.sub,
      };

      return res.status(200).json({
        isSuccess: true,
        data,
        msg: '카테고리 조회 완료!',
      });
    }),

    postings: asyncWrapper(async (req, res) => {
      const user = req.user;
      let { nextCursor } = req.query;
      let { previousCursor } = req.query;
      invalidToken(user);

      // user가 선택한 카테고리
      const myCategory = await User_info.findOne({
        where: { userId: user.id },
      });

      let myCity = await City.findOne({
        where: { id: myCategory.cityId },
      });

      let myjob = await Job.findOne({
        where: { id: myCategory.jobId },
      });

      let careerOption = { careerId: myCategory.careerId };
      let cityOption = { cityId: myCategory.cityId };
      let companyTypeOption = { companyTypeId: myCategory.companyTypeId };
      let jobOption = { '$jobs.id$': myCategory.jobId };
      if (myCategory.careerId === 3) {
        careerOption = {};
      }

      if (myjob.main === '전체') {
        jobOption = {};
      } else if (myjob.sub === '전체') {
        let jobMain = await Job.findAll({
          where: { main: myjob.main },
        });
        let min = jobMain[0].id;
        let max = jobMain[jobMain.length - 1].id;
        jobOption = { '$jobs.id$': { [Op.between]: [min, max] } };
      }

      if (myCity.main === '전체') {
        cityOption = {};
      } else if (myCity.sub === '전체') {
        let cityMain = await City.findAll({
          where: { main: myCity.main },
        });
        let min = cityMain[0].id;
        let max = cityMain[cityMain.length - 1].id;
        cityOption = { cityId: { [Op.between]: [min, max] } };
      }

      if (myCategory.companyTypeId === 1) {
        companyTypeOption = {};
      }
      let paginationOption;
      let orderBy = 'DESC';
      if (!(nextCursor >= 1) && !(previousCursor >= 1)) {
        paginationOption = {};
        orderBy = 'DESC';
      } else if (nextCursor >= 1 && !(previousCursor >= 1)) {
        paginationOption = { id: { [Op.lt]: nextCursor } };
        orderBy = 'DESC';
      } else if (!(nextCursor >= 1) && previousCursor >= 1) {
        paginationOption = { id: { [Op.gt]: previousCursor } };
        orderBy = 'ASC';
      }

      let postings;
      if (myjob.main === '전체') {
        postings = await Posting.findAll({
          where: {
            [Op.and]: [
              careerOption,
              cityOption,
              companyTypeOption,
              jobOption,
              paginationOption,
            ],
          },
          attributes: ['id', 'companyName', 'title', 'deadline'],
          order: [['id', orderBy]],
          limit: 10,
          subQuery: false,
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
      } else {
        postings = await Posting.findAll({
          where: {
            [Op.and]: [
              careerOption,
              cityOption,
              companyTypeOption,
              paginationOption,
            ],
          },
          attributes: ['id', 'companyName', 'title', 'deadline'],
          order: [['id', orderBy]],
          limit: 10,
          subQuery: false,
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
            {
              model: Job,
              where: jobOption,
              attributes: attributesOption(),
              through: {
                attributes: ['jobId'],
              },
            },
          ],
        });
      }

      let data = [];
      let x;
      for (x of postings) {
        let posting = {
          postingId: x.id,
          companyName: x.companyName,
          title: x.title,
          companyType: x.companyType.type,
          career: x.career.type,
          city: x.city.main + ' ' + x.city.sub,
          deadline: dateFormatter(x.deadline),
          isLike: false,
        };
        const likePosting = await user_posting.findOne({
          where: { userId: user.id, postingId: x.id },
        });
        if (likePosting) posting.isLike = true;
        data.push(posting);
      }
      if (orderBy === 'ASC') data = data.reverse();

      nextCursor = data[data.length - 1].postingId;
      previousCursor = data[0].postingId;

      var now = new Date();
      var updatedAt = `${now.getFullYear()}년 ${
        now.getMonth() + 1
      }월 ${now.getDate()}일 ${now.getHours()}시 업데이트 완료`;

      return res.status(200).json({
        isSuccess: true,
        data,
        updatedAt,
        nextCursor,
        previousCursor,
        msg: '추천채용 여기있어요!',
      });
    }),

    posting: asyncWrapper(async (req, res) => {
      const user = req.user;
      invalidToken(user);
      const { postingId } = req.params;
      const posting = await Posting.findOne({
        where: { id: postingId },
        attributes: ['companyName', 'title', 'deadline', 'url'],
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
          {
            model: Job,
            attributes: attributesOption(),
            through: {
              attributes: [],
            },
          },
        ],
      });

      const schedule = await Schedule.findAll({
        where: { postingId },
      });

      let isScrap = false;
      let e;
      if (schedule) {
        for (e of schedule) {
          const scrap = await user_schedule.findOne({
            where: { userId: user.id, scheduleId: e.id },
          });
          if (scrap) isScrap = true;
        }
      }

      const likePosting = await user_posting.findOne({
        where: { userId: user.id, postingId },
      });
      let isLike = false;
      if (likePosting) isLike = true;

      if (!posting) {
        return res.status(400).json({
          isSuccess: false,
          msg: '해당공고가 없습니다!',
        });
      }

      let job = [];
      let x;
      for (x of posting.jobs) {
        job.push(x.sub);
      }

      const data = {
        companyName: posting.companyName,
        title: posting.title,
        deadline: dateFormatter(posting.deadline),
        url: posting.url,
        career: posting.career.type,
        city: posting.city.main + ' ' + posting.city.sub,
        companyType: posting.companyType.type,
        job,
        isScrap,
        isLike,
      };

      return res.status(200).json({
        isSuccess: true,
        data,
        msg: '추천채용 상세조회 여기있어요!',
      });
    }),

    likes: asyncWrapper(async (req, res, next) => {
      const user = req.user;
      const { condition, orderBy } = req.query;
      invalidToken(user);
      const likePostings = await user_posting.findAll({
        where: { userId: user.id },
      });

      if (condition !== 'scrapping' && condition !== 'deadline') {
        return res.status(400).json({
          isSuccess: false,
          data: null,
          msg: 'plz insert correct query',
        });
      }

      if (orderBy !== 'asc' && orderBy !== 'desc') {
        return res.status(400).json({
          isSuccess: false,
          data: null,
          msg: 'plz insert correct query',
        });
      }

      const likepostingIds = [];
      for (const likePosting of likePostings) {
        likepostingIds.push(likePosting.postingId);
      }

      const data = await Posting.findAll({
        where: {
          id: { [Op.in]: likepostingIds },
        },
        attributes: ['id', 'companyName', 'title', 'deadline'],
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
          {
            model: User,
            attributes: ['createdAt'],
            where: { id: user.id },
          },
        ],
        order: [['deadline', 'ASC']],
      });

      if (condition === 'scrapping') {
        data.sort(
          (a, b) =>
            a.users[0].user_posting.createdAt -
            b.users[0].user_posting.createdAt
        );
      }

      if (orderBy === 'desc') {
        data.reverse()
      }

      return res.status(200).json({
        isSuccess: true,
        data,
        msg: '찜 목록 조회 완료!',
      });
    }),
  },

  delete: {
    like: asyncWrapper(async (req, res, next) => {
      const user = req.user;
      invalidToken(user);
      const { postingId } = req.params;
      const posting = await Posting.findOne({
        where: { id: postingId },
      });
      const likePosting = await user_posting.findOne({
        userId: user.id,
        postingId,
      });

      if (!posting || !likePosting)
        return res.status(400).json({
          isSuccess: false,
          msg: '해당 포스팅이 존재하지 않습니다.',
        });

      await user_posting.destroy({
        where: {
          userId: user.id,
          postingId,
        },
      });

      return res.status(200).json({
        isSuccess: true,
        data: { userId: user.id, postingId },
        msg: '찜 취소 완료!',
      });
    }),
  },
};
