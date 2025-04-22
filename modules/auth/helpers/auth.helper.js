const User = require('../../../models/User');
const { statusCodes } = require('../../../utils/response/response.handler');
const { ERROR_MESSAGES } = require('../constants/auth.constant');
const { generateToken } = require('../../../middlewares//auth/auth.middleware');

async function checkUserExists({ email, phone }) {
  const findClause = {
    $or: [{ email }, { phone }],
  };
  const user = await User.countDocuments(findClause);
  return !!user;
}

const registerUserHelper = async ({ name, email, phone, password }) => {
  const isUserExists = await checkUserExists({ email, phone });
  if (isUserExists) {
    throw {
      code: statusCodes.STATUS_CODE_DATA_CONFLICT,
      message: `${ERROR_MESSAGES.USER_EXISTS} with provided email or phone number!`,
    };
  }
  const userObj = {
    name,
    email,
    phone,
    password,
  };
  const user = new User(userObj);
  const userDetails = await user.save();
  return {
    id: userDetails._id,
  };
};

const loginHelper = async ({ email, phone, password }) => {
  const findClause = {
    $or: [{ email }, { phone }],
  };
  const projectClause = {
    password: 1,
  };
  const userDetails = await User.findOne(findClause, projectClause);
  if (!userDetails || !(await userDetails.matchPassword(password))) {
    throw {
      code: statusCodes.STATUS_CODE_DATA_CONFLICT,
      message: ERROR_MESSAGES.INVALID_USER_CREDS,
    };
  }
  const token = generateToken({ userId: userDetails._id });
  return {
    id: userDetails._id,
    token,
  };
};

module.exports = { registerUserHelper, loginHelper };
