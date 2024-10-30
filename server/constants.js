require("dotenv").config();

const { PORT, DB_URL } = process.env;

const CONSTANTS = {
  PORT: PORT,
  DB_URL: DB_URL,
};

module.exports = CONSTANTS;
