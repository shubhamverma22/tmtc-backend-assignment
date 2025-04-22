/**
 * Response handler methods to maintain common response format for all APIs.
 * Add your middlewares here if you wants to do something with data before sending it to user.
 */
const { logger } = require('../logs/logger');

const { NODE_ENV } = process.env;
const statusCodes = {
  STATUS_CODE_INVALID_PROMPT: 113,
  STATUS_CODE_SUCCESS: 200,
  STATUS_CODE_INVALID_FORMAT: 400,
  STATUS_CODE_UNAUTHORIZED: 401,
  STATUS_CODE_FORBIDDEN: 403,
  STATUS_CODE_DATA_NOT_FOUND: 404,
  STATUS_CODE_FAILURE: 500,
  STATUS_CODE_DATA_SOFT_DELETE: 421,
  STATUS_CODE_VALIDATION_FAILED: 422,
  STATUS_CODE_NOT_ACCEPTABLE: 406,
  STATUS_CODE_DATA_CONFLICT: 409,
};
const successResponse = ({
  // eslint-disable-next-line no-unused-vars
  req,
  res,
  data = {},
  code = 200,
  message = '',
}) => res.send({ data, code, message });


const errorResponse = ({
  // eslint-disable-next-line no-unused-vars
  req,
  res,
  data = {},
  code = statusCodes.STATUS_CODE_FAILURE,
  message = null,
  error = null,
}) => {
  // eslint-disable-next-line no-param-reassign
  code = (error && error.code) || code;
  // eslint-disable-next-line no-param-reassign
  message = (error && error.message) || message || '';
  if (error) {
    logger.error('API Error', error, message);
  }
  let debug = null;
  if (['string', 'object'].includes(typeof error) && NODE_ENV !== 'production') {
    debug = error;
  }
  return res.send(
    {
      data,
      code,
      message,
      debug,
    },
    code
  );
};
module.exports = {
  successResponse,
  errorResponse,
  statusCodes,
};
