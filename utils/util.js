const { sequelize } = require('../models');
module.exports = {
  asyncWrapper: (asyncFn) => {
    return async (req, res, next) => {
      try {
        return await asyncFn(req, res, next);
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          isSuccess: false,
          msg: 'Internal Server Error',
        });
      }
    };
  },

  asyncWrapperWithTransaction: (asyncFn) => {
    return async (req, res, next) => {
      const t = await sequelize.transaction();

      try {
        return await asyncFn(req, res, next, t);
      } catch (error) {
        console.error(error);
        await t.rollback();
        return res.status(500).json({
          isSuccess: false,
          msg: 'Internal Server Error',
        });
      }
    };
  },

  dateFormatter: (date) => {
    var tday = new Date(date);
    let year = tday.getFullYear();
    let month = ('0' + (tday.getMonth() + 1)).slice(-2);
    let day = ('0' + tday.getDate()).slice(-2);
    let dateString = year + '-' + month + '-' + day;

    let hours = ('0' + tday.getHours()).slice(-2);
    let minutes = ('0' + tday.getMinutes()).slice(-2);
    let seconds = ('0' + tday.getSeconds()).slice(-2);
    let timeString = hours + ':' + minutes + ':' + seconds;

    return dateString + ' ' + timeString;
  },

  attributesOption: () => {
    let option = {
      exclude: ['id', 'createdAt', 'updatedAt'],
    };

    return option;
  },

  invalidToken: (user) => {
    if (!user) {
      return res.status(400).json({
        isSuccess: false,
        msg: '토큰값이 이상한데요?',
      });
    }
  },

};
