const { Posting, Schedule } = require("./models");
const { sequelize } = require('./models');
const { dateFormatter } = require('./utils/util')
const { Op } = require('sequelize');

async function destroying() {
    let now = dateFormatter(new Date())
    try {
        await Posting.destroy({ where: { deadline: { [Op.lte]: now } } })
        console.log('데이터 삭제 완료!');
    } catch (error) {
        console.log('데이터 삭제 실패!');
    }
}

module.exports = destroying