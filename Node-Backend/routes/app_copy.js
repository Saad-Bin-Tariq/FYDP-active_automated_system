const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/data_routes');
const db = require('./db/db_connection');
require('dotenv').config()


const app = express();
const port = 3000;
const HOST = '0.0.0.0';

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/', routes);

app.listen();

process.on('SIGINT', () => {
  console.log('Closing the server and MySQL connection');
  db.end((err) => {
    if (err) {
      console.error('Error closing MySQL connection', err);
      process.exit(1);
    } else {
      console.log('MySQL connection closed');
      process.exit(0);
    }
  });
});