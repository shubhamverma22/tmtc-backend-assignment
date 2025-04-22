const {
  validateRegisterPayload,
  validateLoginParams,
} = require('../middlewares/auth.middleware');

const { registerUser, loginUser } = require('../controllers/auth.controller');

const BASE_URL = '/auth';

module.exports = (router) => {
  router.post(`${BASE_URL}/register`, validateRegisterPayload, registerUser);
  router.get(`${BASE_URL}/login`, validateLoginParams, loginUser);
};
