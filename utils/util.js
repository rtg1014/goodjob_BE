const multer = require('multer');
const path = require('path');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

// AWS Config
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: '', // 리전 넣으시면됩니다  예시:"ap-northeast-2"
});

module.exports = {
  regex: {
    checkEmail: (email) => {
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

      const isValid = regex.test(email);

      return isValid;
    },
    checkPassword: (password) => {
      const regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,15}$/g;

      const isValid = regex.test(password);

      return isValid;
    },
  },

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

  s3Upload: multer({
    storage: multerS3({
      s3: new AWS.S3(),
      bucket: '만드신 버킷 이름 넣으시면됩니다',
      key(req, file, cb) {
        cb(null, `images/${Date.now()}_${path.basename(file.originalname)}`);
      },
    }),
  }),
};
