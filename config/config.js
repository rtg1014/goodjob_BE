const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  "development": {
    "username": process.env.MYSQL_DEVELOPMENT_DB_USERNAME,
    "password": process.env.MYSQL_DEVELOPMENT_DB_PASSWORD,
    "database": "good_job",
    "host": process.env.MYSQL_DEVELOPMENT_DB_HOST,
    "dialect": "mysql",
    "timezone": "+09:00"
  },
  "test": {
    "username": process.env.MYSQL_TEST_DB_USERNAME,
    "password": process.env.MYSQL_TEST_DB_PASSWORD,
    "database": "good_job",
    "host": process.env.MYSQL_TEST_DB_HOST,
    "dialect": "mysql",
    "timezone": "+09:00"
  },
  "production": {
    "username": process.env.MYSQL_PRODUCTION_DB_USERNAME,
    "password": process.env.MYSQL_PRODUCTION_DB_PASSWORD,
    "database": "good_job",
    "host": process.env.MYSQL_PRODUCTION_DB_HOST,
    "dialect": "mysql",
    "timezone": "+09:00"
  }
}
