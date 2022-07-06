const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  "development": {
    "username": process.env.MYSQL_DEVELOPMENT_DB_USERNAME,
    "password": process.env.MYSQL_DEVELOPMENT_DB_PASSWORD,
    "database": "good_job_database",
    "host": MYSQL_DEVELOPMENT_DB_HOST,
    "dialect": "mysql",
  },
  "test": {
    "username": "root",
    "password": process.env.GOOD_JOB_DB_PASSWORD,
    "database": "good_job_database",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.MYSQL_PRODUCTION_DB_USERNAME,
    "password": process.env.MYSQL_PRODUCTION_DB_PASSWORD,
    "database": "good_job_database",
    "host": process.env.MYSQL_PRODUCTION_DB_HOST,
    "dialect": "mysql",
    "timezone": "+09:00"
  }
}
