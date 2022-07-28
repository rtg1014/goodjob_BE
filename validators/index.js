const localSchema = require('./local.js');
const verifyNumberForNewSchema = require('./verifyNumberForNew.js');
const verifyNumberForOldSchema = require('./verifyNumberForOld.js');
const lostPasswordSchema = require('./lostPassword.js');
const newPasswordSchema = require('./newPassword.js');
const authSchema = require('./auth.js');
const categorySchema = require('./category.js');
const myScheduleSchema = require('./mySchedule.js');
const scrapSchema = require('./scrap.js');

module.exports = {
  localSchema,
  verifyNumberForNewSchema,
  verifyNumberForOldSchema,
  lostPasswordSchema,
  newPasswordSchema,
  authSchema,
  categorySchema,
  myScheduleSchema,
  scrapSchema,
};
