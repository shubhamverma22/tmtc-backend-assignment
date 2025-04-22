const {
  errorResponse,
  statusCodes,
} = require('../../../utils/response/response.handler');
const { ERROR_MESSAGES } = require('../constants/auth.constant');
const {
  validateNumber,
  validateEmail,
} = require('../../../utils/common-utils');

function throwValidationError(message) {
  throw {
    code: statusCodes.STATUS_CODE_VALIDATION_FAILED,
    message,
  };
}

function validateRegisterPayload(req, res, next) {
  try {
    const { name, email, phone, password } = req.body;

    if (!name) throwValidationError(ERROR_MESSAGES.NAME_REQUIRED);
    if (!email) throwValidationError(ERROR_MESSAGES.EMAIL_REQUIRED);
    if (!phone) throwValidationError(ERROR_MESSAGES.PHONE_REQUIRED);

    if (phone && !validateNumber(phone)) {
      throwValidationError(ERROR_MESSAGES.INVALID_PHONE);
    }

    if (email && !validateEmail(email)) {
      throwValidationError(ERROR_MESSAGES.INVALID_EMAIL);
    }

    if (!password) throwValidationError(ERROR_MESSAGES.PASSWORD_REQUIRED);

    next();
  } catch (error) {
    errorResponse({ error, req, res });
  }
}

function validateLoginParams(req, res, next) {
  try {
    const { email, phone, password } = req.body;
    if (!email && !phone) {
      throwValidationError(ERROR_MESSAGES.EMAIL_OR_PHONE_REQUIRED);
    }
    if (!password) throwValidationError(ERROR_MESSAGES.PASSWORD_REQUIRED);

    next();
  } catch (error) {
    errorResponse({ error, req, res });
  }
}

module.exports = {
  validateRegisterPayload,
  validateLoginParams,
};
