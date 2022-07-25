const Joi = require('joi');

const lostPasswordSchema = Joi.object({
  email: Joi.string().email().empty().required().messages({
    'string.email': '이메일 형식이 아닙니다.',
    'string.empty': '이메일을 입력해 주세요.',
  }),
  userName: Joi.string().empty().required().messages({
    'string.empty': '이름을 입력해 주세요.',
  }),
});

module.exports = lostPasswordSchema;
