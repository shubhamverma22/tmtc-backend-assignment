const {
  errorResponse,
  successResponse,
  statusCodes,
} = require('../../../utils/response/response.handler');
const {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} = require('../constants/itineraries.constant');

const {
  createItineraryHelper,
  getItinerariesHelper,
  getUserItineraryDetailsByIdHelper,
  updateUserItineraryDetailsHelper,
  deleteUserItineraryDetailsByIdHelper,
  getShareableItineraryHelper,
} = require('../helpers/itineraries.helper');

/**
 * @param {Object} req
 * @param {string} req.userId - user id.
 * @param {String} req.body.title title of the itinerary
 * @param {String} req.body.destination destination of the itinerary
 * @param {String} req.body.startDate start date of the itinerary
 * @param {String} req.body.endDate end date of the itinerary
 * @param {Array} req.body.activities activities of the itinerary
 * @description Create itinerary
 * @returns {object} itinerary details
 * @throws {object} error
 */
const createItinerary = async (req, res) => {
  try {
    const { userId } = req;
    const { title, destination, startDate, endDate, activities } = req.body;
    await createItineraryHelper({
      userId,
      title,
      destination,
      startDate,
      endDate,
      activities,
    });
    return successResponse({
      req,
      res,
      data: {},
      code: statusCodes.STATUS_CODE_SUCCESS,
      message: SUCCESS_MESSAGES.ITINERARIES_CREATED_SUCCESS,
    });
  } catch (error) {
    return errorResponse({
      req,
      res,
      error,
      code: statusCodes.STATUS_CODE_FAILURE,
      message: ERROR_MESSAGES.ITINERARIES_CREATED_FAILED,
    });
  }
};

/**
 * @param {Object} req.query
 * @param {string} req.userId - user id.
 * @param {string} req.query.destination - destination.
 * @param {string} req.query.pagination - pagination boolean
 * @param {string} req.query.pageNumber - page number
 * @param {string} req.query.pageSize - page size
 * @description Get iteineraries details
 * @returns {object} iteineraries details
 */
const getItineariesData = async (req, res) => {
  try {
    const { userId } = req;
    const {
      destination,
      pagination,
      pageNumber,
      pageSize,
      sortBy,
      sortOrder,
    } = req.query;
    const { itineraries = [], paginationData = {} } = await getItinerariesHelper({
      userId,
      destination,
      pagination,
      pageNumber,
      pageSize,
      sortBy,
      sortOrder,
    });
    return successResponse({
      req,
      res,
      data: { itineraries, ...paginationData },
      code: statusCodes.STATUS_CODE_SUCCESS,
      message: SUCCESS_MESSAGES.ITINERARIES_FETCHED_SUCCESS,
    });
  } catch (error) {
    return errorResponse({
      req,
      res,
      error,
      code: statusCodes.STATUS_CODE_FAILURE,
      message: ERROR_MESSAGES.ITINERARIES_FETCHED_FAILED,
    });
  }
};

/**
 * @param {Object} req.params
 * @param {string} req.userId - user id.
 * @param {string} req.params.itineraryId - itinerary id.
 * @description Get iteinerary details by id
 * @returns {object} iteinerary details
 */
const getItineararyById = async (req, res) => {
  try {
    const { userId } = req;
    const { id: itineraryId } = req.params;
    const { itineraryDetails = {} } = await getUserItineraryDetailsByIdHelper({
      userId,
      itineraryId,
    });
    return successResponse({
      req,
      res,
      data: { itineraryDetails },
      code: statusCodes.STATUS_CODE_SUCCESS,
      message: SUCCESS_MESSAGES.ITINERARIES_FETCHED_SUCCESS,
    });
  } catch (error) {
    return errorResponse({
      req,
      res,
      error,
      code: statusCodes.STATUS_CODE_FAILURE,
      message: ERROR_MESSAGES.ITINERARIES_FETCHED_FAILED,
    });
  }
};

const updateItineararyDetails = async (req, res) => {
  try {
    const { userId } = req;
    const { id: itineraryId } = req.params;
    const { title, destination, startDate, endDate, activities } = req.body;
    const { itineraryDetails = {} } = await updateUserItineraryDetailsHelper({
      userId,
      itineraryId,
      title,
      destination,
      startDate,
      endDate,
      activities,
    });
    return successResponse({
      req,
      res,
      data: { itineraryDetails },
      code: statusCodes.STATUS_CODE_SUCCESS,
      message: SUCCESS_MESSAGES.ITINERARIES_FETCHED_SUCCESS,
    });
  } catch (error) {
    return errorResponse({
      req,
      res,
      error,
      code: statusCodes.STATUS_CODE_FAILURE,
      message: ERROR_MESSAGES.ITINERARIES_FETCHED_FAILED,
    });
  }
};

const deleteItineraryById = async (req, res) => {
  try {
    const { userId, itineraryId } = req.params;
    await deleteUserItineraryDetailsByIdHelper({ userId, itineraryId });
    return successResponse({
      req,
      res,
      data: {},
      code: statusCodes.STATUS_CODE_SUCCESS,
      message: SUCCESS_MESSAGES.ITINERARIES_DELETED_SUCCESS,
    });
  } catch (error) {
    return errorResponse({
      req,
      res,
      error,
      code: statusCodes.STATUS_CODE_FAILURE,
      message: ERROR_MESSAGES.ITINERARIES_DELETED_FAILED,
    });
  }
};

const getShareableItinerary = async (req, res) => {
  try {
    const { shareableId } = req.params;
    const { itineraryDetails = {} } = await getShareableItineraryHelper({ shareableId });
    return successResponse({
      req,
      res,
      data: { itineraryDetails },
      code: statusCodes.STATUS_CODE_SUCCESS,
      message: SUCCESS_MESSAGES.ITINERARIES_SHARED_SUCCESS,
    });
  } catch (error) {
    return errorResponse({
      req,
      res,
      error,
      code: statusCodes.STATUS_CODE_FAILURE,
      message: ERROR_MESSAGES.ITINERARIES_SHARED_FAILED,
    });
  }
};

module.exports = {
  createItinerary,
  getItineariesData,
  getItineararyById,
  updateItineararyDetails,
  deleteItineraryById,
  getShareableItinerary,
};
