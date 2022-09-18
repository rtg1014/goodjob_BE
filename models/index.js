const Sequelize = require('sequelize');
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const config = require('../config/config')[env];
const db = {};

// MySQL 연결 부분
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.AuthEmail = require('./authEmail')(sequelize, Sequelize);
db.Career = require('./career')(sequelize, Sequelize);
db.City = require('./city')(sequelize, Sequelize);
db.CompanyType = require('./companyType')(sequelize, Sequelize);
db.Job = require('./job')(sequelize, Sequelize);
db.Schedule = require('./schedule')(sequelize, Sequelize);
db.user_schedule = require('./user_schedule')(sequelize, Sequelize);
db.User_info = require('./user_info')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.Posting = require('./posting')(sequelize, Sequelize);
db.posting_job = require('./posting_job')(sequelize, Sequelize);
db.user_posting = require('./user_posting')(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
