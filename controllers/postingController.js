// utils
const { asyncWrapper, dateFormatter } = require('../utils/util');

// models
const { User, user_schedule, Schedule, Posting, Career, Companytype, City, Job } = require('../models');

module.exports = {
    create: {},
    update: {
        category: asyncWrapper(async(req,res)=>{
            const{career,companytype,cityId,jobId} = req.body
            // const { token } = req.header;
            if (!career || 
              !companytype || 
              !cityId ||
              !jobId) {
              return res.status(400).json({
                isSuccess: false,
                msg  : '카테고리 선택 실패',
              });
            }
          
            await Career.update({where :{career}}),
            await Companytype.update({where :{companytype}}),
            await City.update({where :{cityId}}),
            await Job.update({where :{jobId}}), 
              res.send(200)({
                  success : true,
                  message : "카테고리 선택 완료"
              })
          }),
    },
    get : {},
    delete : {},

}