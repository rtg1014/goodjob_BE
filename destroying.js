const { Posting, Schedule } = require("./models");
const { sequelize } = require('./models');
const { dateFormatter } = require('./utils/util')
const { Op } = require('sequelize');

async function destroying() {
    let now = dateFormatter(new Date())

    const t = await sequelize.transaction();

    try {
        await Schedule.destroy({
            where: {
                date: { [Op.lte]: now },
                postingId: { [Op.ne]: null }
            }
        }, { transaction: t })

        await Posting.destroy({
            where: {
                deadline: { [Op.lte]: now }
            }
        }, { transaction: t })

        await t.commit();
        console.log('데이터 삭제 완료!');
    } catch (error) {
        await t.rollback();
        console.log('데이터 삭제 실패!');
    }
}

destroying()

module.exports = destroying