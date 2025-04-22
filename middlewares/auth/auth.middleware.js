const JWT = require('jsonwebtoken');
const userModel = require('../../models/User');
const { statusCodes } = require('../../utils/response/response.handler');

const { config } = require('../../config/config');
const { jwtSecretKey, expiresIn } = config;

/**
 * @description Returns new JWT token of User
 * @param {Object} userId  UserId of the user
 * @returns {String} token: String
 */
const generateToken = (params) => {
  const { userId } = params;
  const options = { expiresIn };
  const jwtValues = { userId };
  const token = JWT.sign(jwtValues, jwtSecretKey, options);
  return token;
};

const jwtVerify = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.json({
        data: { message: 'Unauthorized Access', code: statusCodes.STATUS_CODE_UNAUTHORIZED },
      });
    }
    const authToken = req.headers.authorization;
    const authDecode = JWT.verify(authToken, jwtSecretKey);
    // 6. Database Validation
    const userDetails = await userModel
      .findOne({ isDeleted: false, _id: authDecode.userId })
      .lean();

    if (!userDetails) {
      return res.json({
        data: { message: 'User not found', code: statusCodes.STATUS_CODE_UNAUTHORIZED },
      });
    }
    req.userId = authDecode.userId;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  jwtVerify,
  generateToken,
};
