const {
  errorResponse,
  statusCodes,
} = require('../../../utils/response/response.handler');
const { isValidObjectId } = require('mongoose');
const { ERROR_MESSAGES } = require('../constants/itineraries.constant');
const { isValidDate } = require('../../../utils/common-utils');

function throwValidationError(message) {
  throw {
    code: statusCodes.STATUS_CODE_VALIDATION_FAILED,
    message,
  };
}

function validateCreateItineraryPayload(req, res, next) {
  try {
    const { title, destination, startDate, endDate, activities } = req.body;

    if (!title) throwValidationError(ERROR_MESSAGES.TITLE_REQUIRED);
    if (!destination) throwValidationError(ERROR_MESSAGES.DESTINATION_REQUIRED);
    if (!startDate) throwValidationError(ERROR_MESSAGES.START_DATE_REQUIRED);
    if (!endDate) throwValidationError(ERROR_MESSAGES.END_DATE_REQUIRED);

    if (!Array.isArray(activities)) {
      throw {
        code: statusCodes.STATUS_CODE_VALIDATION_FAILED,
        message: ERROR_MESSAGES.ACTIVITIES_REQUIRED,
      };
    }

    activities.forEach((activity, index) => {
      if (!activity.time || typeof activity.time !== 'string') {
        throw {
          code: statusCodes.STATUS_CODE_VALIDATION_FAILED,
          message: `${ERROR_MESSAGES.INVALID_TIME} at index ${index}`,
        };
      }
      if (!activity.description || typeof activity.description !== 'string' || activity.description.trim() === '') {
        throw {
          code: statusCodes.STATUS_CODE_VALIDATION_FAILED,
          message: `${ERROR_MESSAGES.INVALID_DESCRIPTION} at index ${index}`,
        };
      }
      if (!activity.location || typeof activity.location !== 'string' || activity.location.trim() === '') {
        throw {
          code: statusCodes.STATUS_CODE_VALIDATION_FAILED,
          message: `${ERROR_MESSAGES.INVALID_LOCATION} at index ${index}`,
        };
      }
    });

    if (startDate && !isValidDate(startDate)) {
      throwValidationError(ERROR_MESSAGES.INVALID_START_DATE);
    }
    if (endDate && !isValidDate(endDate)) {
      throwValidationError(ERROR_MESSAGES.INVALID_END_DATE);
    }
    return next();
  } catch (error) {
    return errorResponse({ error, req, res });
  }
}

function validateGetItineraryByIdParams(req, res, next) {
  try {
    const { id: itineraryId } = req.params;
    if (!itineraryId || !isValidObjectId(itineraryId)) {
      throw {
        code: statusCodes.STATUS_CODE_VALIDATION_FAILED,
        message: ERROR_MESSAGES.INVALID_MISSING_ITINERARY_ID,
      };
    }
    return next();
  } catch (error) {
    return errorResponse({ error, req, res });
  }
}

function validateUpdateItineraryPayload(req, res, next) {
  try {
    const { id } = req.params;
    const { startDate, endDate, activities } = req.body;

    if (!id || !isValidObjectId(id)) {
      throw {
        code: statusCodes.STATUS_CODE_VALIDATION_FAILED,
        message: ERROR_MESSAGES.INVALID_MISSING_ITINERARY_ID,
      };
    }
    if (activities.length) {
      activities.forEach((activity, index) => {
        if (!activity.time || typeof activity.time !== 'string') {
          throw {
            code: statusCodes.STATUS_CODE_VALIDATION_FAILED,
            message: `${ERROR_MESSAGES.INVALID_TIME} at index ${index}`,
          };
        }
        if (
          !activity.description ||
          typeof activity.description !== 'string' ||
          activity.description.trim() === ''
        ) {
          throw {
            code: statusCodes.STATUS_CODE_VALIDATION_FAILED,
            message: `${ERROR_MESSAGES.INVALID_DESCRIPTION} at index ${index}`,
          };
        }
        if (
          !activity.location ||
          typeof activity.location !== 'string' ||
          activity.location.trim() === ''
        ) {
          throw {
            code: statusCodes.STATUS_CODE_VALIDATION_FAILED,
            message: `${ERROR_MESSAGES.INVALID_LOCATION} at index ${index}`,
          };
        }
      });
    }

    if (startDate && !isValidDate(startDate)) {
      throwValidationError(ERROR_MESSAGES.INVALID_START_DATE);
    }
    if (endDate && !isValidDate(endDate)) {
      throwValidationError(ERROR_MESSAGES.INVALID_END_DATE);
    }

    return next();
  } catch (error) {
    return errorResponse({ error, req, res });
  }
}

function validateDeleteItineraryParams(req, res, next) {
  try {
    const { id } = req.params;
    if (!id || !isValidObjectId(id)) {
      throw {
        code: statusCodes.STATUS_CODE_VALIDATION_FAILED,
        message: ERROR_MESSAGES.INVALID_MISSING_ITINERARY_ID,
      };
    }
    return next();
  } catch (error) {
    return errorResponse({ error, req, res });
  }
}

function validateSharedItineraryParams(req, res, next) {
  try {
    const { shareableId } = req.params;
    if (!shareableId || shareableId.length < 10) {
      throw {
        code: statusCodes.STATUS_CODE_VALIDATION_FAILED,
        message: ERROR_MESSAGES.INVALID_MISSING_SHAREABLE_ID,
      };
    }
    return next();
  } catch (error) {
    return errorResponse({ error, req, res });
  }
}


module.exports = {
  validateCreateItineraryPayload,
  validateGetItineraryByIdParams,
  validateUpdateItineraryPayload,
  validateDeleteItineraryParams,
  validateSharedItineraryParams
};
