const Joi = require('joi');

const scrapSchema = Joi.object({
  postingId: Joi.number().integer().empty().required().messages({
    'string.empty': 'postingId 값을 입력해 주세요.',
  }),
});

module.exports = scrapSchema;
