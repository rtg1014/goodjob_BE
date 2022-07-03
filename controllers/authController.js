const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { regex, asyncWrapper } = require('../utils/util');

const { User } = require('../models');

module.exports = {
  create: {
    local: asyncWrapper(async (req, res) => {
      const { email, password, confirmPassword, userName } = req.body;

      //email 인증을 하지 않은 상태면 프론트에서 email을 백으로 주지마세요
      if (!password || !confirmPassword || !userName) {
        return res.status(400).json({
          isSuccess: false,
          msg: '회원가입 양식을 완성해 주세요.',
        });
      }
      if (!email) {
        return res.status(400).json({
          isSuccess: false,
          msg: '이메일 인증을 완료해 주세요',
        });
      }
      if (!regex.checkPassword(password)) {
        return res.status(400).json({
          isSuccess: false,
          msg: '비밀번호 형식이 올바르지 않습니다.',
        });
      }
      if (password !== confirmPassword) {
        return res.status(400).json({
          isSuccess: false,
          msg: '비밀번호가 일치하지 않습니다.',
        });
      }
      if (userName.length < 2 && userName.length > 20) {
        return res.status(400).json({
          isSuccess: false,
          msg: '닉네임이 올바르지 않습니다.',
        });
      }
      const hashedPwd = bcrypt.hashSync(password, 10);
      const user = await User.create({
        email,
        password: hashedPwd,
        userName,
        type: 'local',
      });

      return res.status(201).json({
        isSuccess: true,
        msg: '회원가입에 성공하였습니다.',
      });
    }),
  },
  update: {},
  get: {
    duplicate: asyncWrapper(async (req, res) => {
      const { email } = req.params;
      const isExistEmail = await User.findOne({
        where: { email },
      });
      if (isExistEmail) {
        return res.status(400).json({
          isSuccess: false,
          msg: '이미 존재하는 이메일입니다.',
        });
      }
      return res.status(200).json({
        isSuccess: true,
        msg: '사용가능한 이메일입니다.',
      });
    }),
  },
  delete: {},
};
