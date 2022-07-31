// modules
const { Op } = require('sequelize');

// models
const {
  Posting,
  Career,
  // CompanyType,
  City,
  Job,
  posting_job,
  sequelize,
} = require('../../models');

async function InsertData(
  len,
  resultCN,
  resultTT,
  resultCR,
  resultAD,
  resultCD,
  resultUrl,
  resultKD
) {
  for (let i = 0; i < len; i++) {
    const t = await sequelize.transaction();
    try {
      let career = await Career.findOne({
        where: { type: resultCR[i] },
      });

      // let companyType = await CompanyType.findOne({
      //   where: { type: '대기업' },
      // });

      const city = await City.findOne({
        where: {
          [Op.and]: [
            { main: resultAD[i].split(' ')[0] },
            { sub: resultAD[i].split(' ')[1] },
          ],
        },
      });
      let [post, created] = await Posting.findOrCreate({
        where: {
          companyName: resultCN[i],
          title: resultTT[i],
          deadline: resultCD[i],
          url: resultUrl[i],
          // companyTypeId: companyType.id,
          companyTypeId: 2,
          careerId: career.id,
          cityId: city.id,
        },
      });

      if (!created) throw new error();

      let jobSub = resultKD[i].split(',');
      for (let j = 0; j < jobSub.length; j++) {
        let job = await Job.findOne({
          where: { sub: jobSub[j] },
        });

        await posting_job.create(
          {
            postingId: post.id,
            jobId: job.id,
          },
          { transaction: t }
        );
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      console.log('크롤링 완료');
      process.exit(0);
    }
  }
}
module.exports = InsertData;
