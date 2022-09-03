const config = {
  TOKEN: {
    ACCESS_SECRET: process.env.SECRET_KEY,
  },
  TIME: {
    jwtExpiration: "10000d",
  },
};

module.exports = config;
