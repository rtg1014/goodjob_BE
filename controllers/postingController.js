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
} = require('../models');

module.exports = {
  create: {},
  update: {
    category: asyncWrapper(async (req, res) => {
      const { career, companyType, cityMain, citySub, jobMain, jobSub } =
        req.body;

      /// 로그인확인부분 (어스 미들웨어)
      const user = req.user;
      invalidToken(user);

      let tempJob;
      let jobId = 1;
      if (jobMain) {
        if (!jobSub && jobSub === '전체') {
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
        if (!citySub && citySub === '전체') {
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

      await User_info.update(
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

      return res.status(200).json({
        isSuccess: true,
        msg: '카테고리 선택 완료',
      });
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

      const data = {
        career: rawData.career.type,
        companyType: rawData.companyType.type,
        cityMain: rawData.city.main,
        citySub: rawData.city.sub,
        jobMain: rawData.job.main,
        jobSub: rawData.job.sub,
      };

      if (!rawData) {
        return res.status(400).json({
          isSuccess: false,
          msg: '카테고리 조회 실패',
        });
      }

      return res.status(200).json({
        isSuccess: true,
        data,
        msg: '카테고리 조회 완료!',
      });
    }),

    postings: asyncWrapper(async (req, res) => {
      // let {page} = req.query
      // let limit = 10;
      // let offset = 0 + (page - 1) * limit;
      // Posting.findAndCountAll({
      //   offset: offset,
      //   limit: limit,
      // })
    
   
      const user = req.user;
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
        jobOption = { '$jobs.Id$': { [Op.between]: [min, max] } };
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

      const postings = await Posting.findAll({
        where: {
          [Op.and]: [careerOption, cityOption, companyTypeOption, jobOption],
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
            model: Job,
            attributes: attributesOption(),
            through: {
              attributes: ['jobId'],
            },
          },
        ],
      });

      let data = [];

      // 프론트에서 job 정보를 받길 원한다면 반복문 안에 반복문 써야함
      for (x of postings) {
        let posting = {
          postingId: x.id,
          companyName: x.companyName,
          title: x.title,
          companyType: x.companyType.type,
          career: x.career.type,
          city: x.city.main + ' ' + x.city.sub,
          deadline: dateFormatter(x.deadline),
        };
        data.push(posting);
      }

    var today = new Date();
    var updatedAt = `'${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일 00시' 업데이트 완료`
    
      return res.status(200).json({
        isSuccess: true,
        data,
        updatedAt,
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

      let job = [];
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
      };

      return res.status(200).json({
        isSuccess: true,
        data,
        msg: '추천채용 상세조회 여기있어요!',
      });
    }),
  },

  delete: {},
};
