const Joi = require('joi');

const verifyNumberForNewSchema = Joi.object({
  email: Joi.string().email().empty().required().messages({
    'string.email': '이메일 형식이 아닙니다.',
    'string.empty': '이메일을 입력해 주세요.',
  }),
  password: Joi.string().empty().required().messages({
    'string.empty': '패스워드를 입력해 주세요.',
  }),
  userName: Joi.string().empty().required().messages({
    'string.empty': '이름을 입력해 주세요.',
  }),
  authNumber: Joi.number().integer().required().messages({
    'number.empty': '인증번호를 입력해 주세요.',
  }),
});

module.exports = verifyNumberForNewSchema;
