// config.js
require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT;
const MONGO_URI = NODE_ENV === 'test' ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;

module.exports = {
  NODE_ENV,
  MONGO_URI,
  PORT,
};