const Joi = require('joi');

const categorySchema = Joi.object({
  career: Joi.string().empty().required().messages({
    'string.required': 'career를 입력해 주세요.',
    'string.empty': 'career를 입력해 주세요.',
  }),
  companyType: Joi.string().empty().required().messages({
    'string.required': 'companyType을 입력해 주세요.',
    'string.empty': 'companyType을 입력해 주세요.',
  }),
  cityMain: Joi.string().empty().required().messages({
    'string.required': 'cityMain을 입력해 주세요.',
    'string.empty': 'cityMain을 입력해 주세요.',
  }),
  citySub: Joi.string().empty().required().messages({
    'string.required': 'citySub를 입력해 주세요.',
    'string.empty': 'citySub를 입력해 주세요.',
  }),
  jobMain: Joi.string().empty().required().messages({
    'string.required': 'jobMain을 입력해 주세요.',
    'string.empty': 'jobMain을 입력해 주세요.',
  }),
  jobSub: Joi.string().empty().required().messages({
    'string.required': 'jobSub를 입력해 주세요.',
    'string.empty': 'jobSub를 입력해 주세요.',
  }),
});

module.exports = categorySchema;
