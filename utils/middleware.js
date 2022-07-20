// modules

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// utils
const { asyncWrapper } = require('./util');
const { User } = require('../models');
const Validators = require('../validators')

module.exports = {
  auth: async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(400).json({
        isSuccess: false,
        msg: '토큰 정보가 없습니다.',
      });
    }

    const [type, value] = authorization.split(' ');
    if (type !== 'Bearer') {
      return res.status(400).json({
        isSuccess: false,
        msg: '유효하지 않은 타입의 토큰입니다.',
      });
    }

    if (!value) {
      return res.status(400).json({
        isSuccess: false,
        msg: '토큰이 없습니다.',
      });
    }

    try {
      const { email } = jwt.verify(value, process.env.JWT_SECRET_KEY);
      const user = await User.findOne({
        where: { email },
        attributes: ['id', 'email', 'username'],
      });

      if (!user) {
        return res.status(400).json({
          isSuccess: false,
          msg: '유효한 값의 토큰이 아닙니다.',
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        isSuccess: false,
        msg: 'Internal Server Error',
      });
    }
  },

  joiMiddleware: (validator) => {
    if(!Validators.hasOwnProperty(validator)) throw new Error(`존재하지 않습니다 ! '${validator}'`)
    return async function(req, res, next){
      try{
        const validated = await Validators[validator].validateAsync(req.body)
        req.body = validated
        next()
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          isSuccess: false,
          data: err.details[0].message,
          msg: 'validation error (joi)',
        });
      }
    }
  }
};
