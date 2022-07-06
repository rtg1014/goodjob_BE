const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const passport = require('passport');

const { regex, asyncWrapper } = require('../utils/util');

const { User, AuthEmail } = require('../models');

module.exports = {
  create: {
    local: asyncWrapper(async (req, res) => {
      const { email, password, confirmPassword, userName } = req.body;

      if (!email || !password || !confirmPassword || !userName) {
        return res.status(400).json({
          isSuccess: false,
          msg: '회원가입 양식을 완성해 주세요.',
        });
      }

      //이름 체크
      if (userName.length < 2 && userName.length > 20) {
        return res.status(400).json({
          isSuccess: false,
          msg: '이름이 올바르지 않습니다.',
        });
      }

      // 이메일 형식체크
      if (!regex.checkEmail(email)) {
        return res.status(400).json({
          isSuccess: false,
          msg: '이메일 형식이 올바르지 않습니다.',
        });
      }

      // 이메일 중복검사
      const isExistEmail = await User.findOne({
        where: { email },
      });
      if (isExistEmail) {
        return res.status(400).json({
          isSuccess: false,
          msg: '이미 존재하는 이메일입니다.',
        });
      }

      // 비밀번호 형식체크
      if (!regex.checkPassword(password)) {
        return res.status(400).json({
          isSuccess: false,
          msg: '비밀번호 형식이 올바르지 않습니다.',
        });
      }

      // 비밀번호 confirm 체크
      if (password !== confirmPassword) {
        return res.status(400).json({
          isSuccess: false,
          msg: '비밀번호가 일치하지 않습니다.',
        });
      }

      // 인증 메일 발송
      const authNumber = Math.floor(Math.random() * 1000000);

      const mailConfig = {
        service: 'Naver',
        host: 'smtp.naver.com',
        port: process.env.MAIL_SMTP_PORT,
        auth: {
          user: process.env.MAIL_EMAIL,
          pass: process.env.MAIL_PASSWORD,
        },
      };
      let message = {
        from: process.env.MAIL_EMAIL,
        to: email,
        subject: '굿잡캘린더 이메일 인증 요청 메일입니다.',
        html: `<p> 인증번호는 ${authNumber} 입니다. </p>`,
      };
      let transporter = nodemailer.createTransport(mailConfig);
      transporter.sendMail(message);

      const isExistMail = await AuthEmail.findOne({
        where: { email },
      });

      if (isExistMail) {
        await AuthEmail.update({ authNumber }, { where: { email } });
      } else {
        await AuthEmail.create({
          email,
          authNumber,
          type: 0,
        });
      }

      return res.status(200).json({
        isSuccess: true,
        msg: '메일 발송 완료. 메일함을 확인해 주세요.',
      });
    }),

    kakao: (req, res, next) => {
      passport.authenticate(
        'kakao',
        asyncWrapper(async (error, user) => {
          ///  (error, user) 이 부분이 done 이다.
          if (error) {
            return res.status(500).json({
              isSuccess: false,
              msg: '카카오 로그인 오류',
            });
          }

          const { email } = user;
          const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);

          res.cookie(token); /// 헤더나 리스폰스 값으로 토큰값을 전해주면 탈취의 위험이 있어서 쿠키로 감싸서 보내준다.
          res.status(200).json({
            isSuccess: true,
          });
        })
      )(req, res, next); // 미들웨어 확장
    },

    verifyNumberForNew: asyncWrapper(async (req, res) => {
      const { email, password, userName, authNumber } = req.body;

      const isVerified = await AuthEmail.findOne({
        where: { email, authNumber },
      });
      if (!isVerified) {
        return res.status(400).json({
          isSuccess: false,
          msg: '인증 번호가 틀렸습니다.',
        });
      }

      // 인증완료
      await AuthEmail.destroy({ where: { email, authNumber, type: 0 } });

      const hashedPwd = bcrypt.hashSync(password, 10);
      const user = await User.create({
        email,
        password: hashedPwd,
        userName,
        type: 'local',
      });

      return res.status(200).json({
        isSuccess: true,
        msg: '회원가입이 완료되었습니다.',
      });
    }),

    verifyNumberForOld: asyncWrapper(async (req, res) => {
      const { email, authNumber } = req.body;
      const isVerified = await AuthEmail.findOne({
        where: { email, authNumber },
      });
      if (!isVerified) {
        return res.status(400).json({
          isSuccess: false,
          msg: '인증 번호가 틀렸습니다.',
        });
      }

      // 인증완료
      await AuthEmail.destroy({ where: { email, authNumber, type: 1 } });

      return res.status(200).json({
        isSuccess: true,
        msg: '인증이 완료되었습니다. 새로운 비밀번호를 입력해주세요.',
      });
    }),
  },

  update: {
    newPassword: asyncWrapper(async (req, res) => {
      const { email, newPassword, confirmNewPassword } = req.body;
      if (!newPassword || !confirmNewPassword) {
        return res.status(400).json({
          isSuccess: false,
          msg: '양식을 완성해 주세요.',
        });
      }
      if (!regex.checkPassword(newPassword)) {
        return res.status(400).json({
          isSuccess: false,
          msg: '비밀번호 형식이 올바르지 않습니다.',
        });
      }

      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({
          isSuccess: false,
          msg: '비밀번호가 일치하지 않습니다.',
        });
      }

      const hashedPwd = bcrypt.hashSync(newPassword, 10);
      await User.update(
        {
          password: hashedPwd,
        },
        {
          where: { email },
        }
      );
      return res.status(200).json({
        isSuccess: false,
        msg: '비밀번호 변경완료!',
      });
    }),

    lostPassword: asyncWrapper(async (req, res) => {
      const { email, userName } = req.body;
      if (!email || !userName) {
        return res.status(400).json({
          isSuccess: false,
          msg: '양식을 완성해 주세요.',
        });
      }
      const existUser = await User.findOne({
        where: { email, userName },
      });

      if (!existUser) {
        return res.status(400).json({
          isSuccess: false,
          msg: '해당하는 유저정보가 없습니다.',
        });
      }

      const authNumber = Math.floor(Math.random() * 1000000);

      const mailConfig = {
        service: 'Naver',
        host: 'smtp.naver.com',
        port: process.env.MAIL_SMTP_PORT,
        auth: {
          user: process.env.MAIL_EMAIL,
          pass: process.env.MAIL_PASSWORD,
        },
      };
      let message = {
        from: process.env.MAIL_EMAIL,
        to: email,
        subject: '굿잡캘린더 이메일 인증 요청 메일입니다.',
        html: `<p> 인증번호는 ${authNumber} 입니다. </p>`,
      };
      let transporter = nodemailer.createTransport(mailConfig);
      transporter.sendMail(message);

      const isExistMail = await AuthEmail.findOne({
        where: { email, type: 1 },
      });

      if (isExistMail) {
        await AuthEmail.update({ authNumber }, { where: { email } });
      } else {
        await AuthEmail.create({
          email,
          authNumber,
          type: 1,
        });
      }

      return res.status(200).json({
        isSuccess: false,
        msg: '메일 발송 완료. 메일함을 확인해 주세요.',
      });
    }),
  },

  get: {
    auth: asyncWrapper(async (req, res) => {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          isSuccess: false,
          msg: '이메일 혹은 비밀번호를 입력하세요.',
        });
      }

      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        return res.status(400).json({
          isSuccess: false,
          msg: '이메일 혹은 비밀번호를 확인해주세요.',
        });
      }

      const pwdCheck = bcrypt.compareSync(password, user.password);
      if (!pwdCheck) {
        return res.status(400).json({
          isSuccess: false,
          msg: '이메일 혹은 비밀번호를 확인해주세요.',
        });
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);
      res.cookie(token);
      return res.status(200).json({
        isSuccess: true,
        msg: '로그인 되었습니다.',
      });
    }),
  },

  delete: {},
};
