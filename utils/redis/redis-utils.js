const redisClient = require('./redis-connection');

const setKey = redisClient.set.bind(redisClient);
const getKey = redisClient.get.bind(redisClient);
const setRedisKeyExpiry = redisClient.expire.bind(redisClient);

/**
 * Retrieves value from Redis using key. Saves method returned data to Redis if none exists.
 * @param {Function} method
 * @param {Object} params
 * @param {String} key
 * @param {Number} expiryTimeInSeconds
 * @param {Boolean} isAPICall
 */
async function cacheToRedis(
  method,
  params,
  key,
  expiryTimeInSeconds,
  isAPICall = false
) {
  let data = await getKey(key);
  if (data) return JSON.parse(data);
  data = await method(params);
  if (isAPICall) {
    if (data.code && data.code !== 200) return data;
    if (data.statusCode && data.statusCode !== 200) return data;
    if (data.status && data.status.code && data.status.code !== 200)
      return data;
  }
  await setKey(key, JSON.stringify(data));
  await setRedisKeyExpiry(key, expiryTimeInSeconds);
  return data;
}

module.exports = {
  setKey,
  getKey,
  cacheToRedis,
  setRedisKeyExpiry,
};
