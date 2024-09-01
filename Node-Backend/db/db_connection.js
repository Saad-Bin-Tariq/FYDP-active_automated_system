// db.js
const { createPool } = require('mysql');

const dbConfig = {
  host: process.env.HOST,
  port: process.env.PORT, // Change this to your MySQL port if it's different
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const pool = createPool(dbConfig);

module.exports = pool;
