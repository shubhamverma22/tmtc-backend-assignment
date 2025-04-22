const {
  errorResponse,
  successResponse,
  statusCodes,
} = require('../../../utils/response/response.handler');
const {
    SUCCESS_MESSAGES,
    ERROR_MESSAGES,
} = require('../constants/auth.constant');

const { registerUserHelper, loginHelper } = require('../helpers/auth.helper');

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const { id } = await registerUserHelper({ name, email, phone, password });
    return successResponse({
      req,
      res,
      data: { id },
      message: SUCCESS_MESSAGES.REGISTER_SUCCESS,
    });
  } catch (error) {
    return errorResponse({
      req,
      res,
      error,
      code: statusCodes.STATUS_CODE_FAILURE,
      message: ERROR_MESSAGES.REGISTER_FAILED,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    const loggedInUserDetails = await loginHelper({ email, phone, password });
    return successResponse({
      req,
      res,
      data: { loggedInUserDetails },
      message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
    });
  } catch (error) {
    return errorResponse({
      req,
      res,
      error,
      code: statusCodes.STATUS_CODE_FAILURE,
      message: ERROR_MESSAGES.LOGIN_FAILED,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
