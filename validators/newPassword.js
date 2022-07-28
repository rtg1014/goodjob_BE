const Joi = require('joi');

const newPasswordSchema = Joi.object({
  email: Joi.string().email().empty().required().messages({
    'string.email': '이메일 형식이 아닙니다.',
    'string.empty': '이메일을 입력해 주세요.',
  }),
  newPassword: Joi.string()
    .min(6)
    .max(15)
    .empty()
    .pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d`~!@#$%^&*()-_=+ "'{}]{6,15}$/)
    .required()
    .messages({
      'string.min': '6글자 ~ 15글자 이내로 작성해 주세요.',
      'string.max': '6글자 ~ 15글자 이내로 작성해 주세요.',
      'string.empty': '패스워드를 입력해 주세요.',
      'string.pattern.base':
        '비밀번호는 숫자(필수),알파벳(필수),특수문자(선택)로 이루어져야 합니다.',
    }),
  confirmNewPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
    'any.only': '비밀번호가 일치하지 않습니다.',
  }),
});

module.exports = newPasswordSchema;
