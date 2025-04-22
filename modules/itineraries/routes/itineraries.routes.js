const { jwtVerify } = require('../../../middlewares/auth/auth.middleware');
const {
  validateCreateItineraryPayload,
  validateGetItineraryByIdParams,
  validateUpdateItineraryPayload,
  validateDeleteItineraryParams,
  validateSharedItineraryParams,
} = require('../middlewares/itineraries.middleware');

const {
  createItinerary,
  getItineariesData,
  getItineararyById,
  updateItineararyDetails,
  deleteItineraryById,
  getShareableItinerary,
} = require('../controllers/itineraries.controller');

const BASE_URL = '/itineraries';

module.exports = (router) => {
  router.post(`${BASE_URL}/`, jwtVerify, validateCreateItineraryPayload, createItinerary);
  router.get(`${BASE_URL}/`, jwtVerify, getItineariesData);
  router.get(`${BASE_URL}/:id`, jwtVerify, validateGetItineraryByIdParams, getItineararyById);
  router.get(`${BASE_URL}/share/:shareId`, validateSharedItineraryParams, getShareableItinerary);
  router.put(`${BASE_URL}/:id`, jwtVerify, validateUpdateItineraryPayload, updateItineararyDetails);
  router.delete(`${BASE_URL}/:id`, jwtVerify, validateDeleteItineraryParams, deleteItineraryById);
};
