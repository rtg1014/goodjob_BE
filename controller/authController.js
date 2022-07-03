const { regex, asyncWrapper } = require('../utils/util');

module.exports = {
  create: {
    local: asyncWrapper(async (req, res) => {
      const { email, password, confirmPassword, userName } = req.body;
      if (!regex.checkEmail(email)) {
        return res.status(400).json({
          isSuccess: false,
          msg: '이메일 형식이 올바르지 않습니다.',
        });
      }
    }),
  },
  update: {},
  get: {},
  delete: {},
};


//디나이 실험