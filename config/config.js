require('dotenv').config();

const config = {
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.JWT_EXPIRATION_TIME,
  email: {
    host: 'smtp.netcorecloud.net',
    port: 587,
    auth: {
      user: 'iiflhfconehomeeapi',
      pass: 'ef24b!99a9b47',
    },
    from: 'care@iiflonehome.com',
  },
  redisConnection: {
    hostname: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};

module.exports = {
  config,
};
