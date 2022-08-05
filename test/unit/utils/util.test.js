const httpMocks = require('node-mocks-http');
const util = require('../../../utils/util');
const { User } = require('../../../models');

// jest.fn()
User.findOne = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe('asyncWrapper', () => {
  test('asyncWrapper 통과', async () => {
    req.body = { id: 1 };
    User.findOne.mockResolvedValue( {"id": 1} );
    async function getUser(req, res) {
      const id = req.body;
      const user = await User.findOne({ id });
      return res.status(200).json({
        isSuccess: true,
        userId: user.id,
      });
    }

    util.asyncWrapper(await getUser(req, res));
    expect(res._getJSONData()).toStrictEqual({
      isSuccess: true,
      userId: 1,
    });
  });
});
