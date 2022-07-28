const Joi = require('joi');

const myScheduleSchema = Joi.object({
  image: Joi.number().integer().empty().messages({
    'string.empty': 'image 값을 입력해 주세요.',
  }),
  companyName: Joi.string().empty().required().messages({
    'string.empty': 'companyName 값을 입력해 주세요.',
    'string.required': 'companyName을 입력해 주세요.',
  }),
  color: Joi.number().integer().empty().messages({
    'string.empty': 'color 값을 입력해 주세요.',
  }),
  title: Joi.string().empty().required().messages({
    'string.empty': 'title 값을 입력해 주세요.',
    'string.required': 'title을 입력해 주세요.',
  }),
  sticker: Joi.number().integer().empty().messages({
    'string.empty': 'sticker 값을 입력해 주세요.',
  }),
  date: Joi.string().min(19).max(19).empty().required().messages({
    'string.empty': 'date 값을 입력해 주세요.',
    'string.required': 'date를 입력해 주세요.',
    'string.min': 'date 형식에 맞게 입력해 주세요.',
    'string.max': 'date 형식에 맞게 입력해 주세요.',
  }),
  place: Joi.string().empty().required().messages({
    'string.empty': 'place 값을 입력해 주세요.',
    'string.required': 'place를 입력해 주세요.',
  }),
  memo: Joi.string().messages({
  }),
});

module.exports = myScheduleSchema;