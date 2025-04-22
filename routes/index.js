// setup all routes
const express = require('express');

const router = express.Router();

require('../modules/auth/routes/auth.routes')(router);
require('../modules/itineraries/routes/itineraries.routes')(router);

module.exports = router;
