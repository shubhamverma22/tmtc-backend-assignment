const { createClient } = require('redis');
const { logger } = require('../logs/logger');
const { config } = require('../../config/config');

// Redis client initialization (for Redis v4.x or above)
const redisClient = createClient({
  url: `redis://${config.redisConnection.hostname}:${config.redisConnection.port}`,
});

redisClient.connect();

redisClient.on('connect', () => {
  module.exports.client = redisClient;
  logger.info(`Connected to Redis server at ${config.redisConnection.hostname}:${config.redisConnection.port}`);
});

redisClient.on('error', (err) => {
  logger.error('Error while connecting to Redis:', err);
});

module.exports = redisClient;
