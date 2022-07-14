// utils
const { asyncWrapper, dateFormatter } = require('../utils/util');

// models
const {
  User,
  user_schedule,
  Schedule,
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
      if (!user) {
        return res.status(400).json({
          isSuccess: false,
          msg: '토큰값이 이상한데요?',
        });
      }

      // if (!career || !companyType || !cityMain || !jobMain) {
      //   return res.status(400).json({
      //     isSuccess: false,
      //     msg: '카테고리 선택 실패',
      //   });
      // }
      let tempJob;
      let jobId = null;
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
      let cityId = null;
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
      let companyTypeId = null;
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
      if (!user) {
        return res.status(400).json({
          isSuccess: false,
          msg: '토큰값이 이상한데요?',
        });
      }

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
            attributes: {
              exclude: ['id', 'createdAt', 'updatedAt'],
            },
          },
          {
            model: City,
            attributes: {
              exclude: ['id', 'createdAt', 'updatedAt'],
            },
          },
          {
            model: CompanyType,
            attributes: {
              exclude: ['id', 'createdAt', 'updatedAt'],
            },
          },
          {
            model: Job,
            attributes: {
              exclude: ['id', 'createdAt', 'updatedAt'],
            },
          },
        ],
      });
      console.log(rawData)

      if (!rawData) {
        return res.status(400).json({
          isSuccess: false,
          msg: '카테고리 조회 실패',
        });
      }
      return res.status(200).json({
        isSuccess: true,
        career: rawData.career.type,
        companyType: rawData.companyType.type,
        cityMain: rawData.city.main,
        citySub: rawData.city.sub,
        jobMain: rawData.job.main,
        jobSub: rawData.job.sub,
        msg: "카테고리 조회 완료!"
      });
    }),
  },
  delete: {},
};

/*================
  await User.update(
   {
     Name: "김성현",
   },
   {
     where: { Name: '황성원' },
  }
 );

 웨얼 = Name 이라는 컬럼에서 "황성원" 이라는 로우를 찾는다는 뜻

 네임이 황ㅅ언ㄴ이잉 애들 ㄹ김성현을 바꾼다
=====================*/
