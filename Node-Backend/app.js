const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/data_routes');
const db = require('./db/db_connection');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
require('dotenv').config()


const app = express();
const port = 3000;
const HOST = '0.0.0.0';

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/', routes);

const sensorTableMapping = {
      1: 'indoor_01',
      2: 'indoor_02',
      3: 'indoor_03',
      4: 'indoor_04',
      5: 'indoor_05',
      6: 'indoor_06',
      21: 'outdoor_01',
      23: 'outdoor_03',
      25: 'outdoor_05',
      26: 'outdoor_06',
      27: 'outdoor_07'
};

// Function to check data and send warning email if necessary
  const checkDataAndSendWarning = async () => {
  const now = new Date();

  for (const sensor_id in sensorTableMapping) {
    const tableName = sensorTableMapping[sensor_id];
    const query = `SELECT MAX(timestamp) AS last_timestamp FROM ${tableName}`;
    
    // Query to get the department name based on sensor ID
    const sensorQuery = `SELECT dept_name FROM sensors WHERE sensor_id = ?`;

    db.query(query, (error, results) => {
      if (error) {
        console.error(`Error querying ${tableName}:`, error);
        return;
      }

      const lastTimestamp = new Date(results[0].last_timestamp);
      const timeDifference = now - lastTimestamp;

      // Convert timeDifference to minutes
      // Calculate time difference in minutes and round to the nearest whole number
      const timeDifferenceInMinutes = Math.round(timeDifference / (1000 * 60));


      // Check if time difference is more than 65 minutes
      if (timeDifferenceInMinutes > 65) {
        // Query the department name for the sensor ID
        db.query(sensorQuery, [sensor_id], (sensorError, sensorResults) => {
          if (sensorError) {
            console.error(`Error querying sensor info for sensor ID ${sensor_id}:`, sensorError);
            return;
          }

          const deptName = sensorResults[0].dept_name;
          console.log(sensorResults);
          console.log(deptName);
          // Add 5 hours to the last recorded timestamp
          const adjustedLastTimestamp = new Date(lastTimestamp.getTime() + 5 * 60 * 60 * 1000);

          // Send warning email
          const mailOptions = {
            from: 'alert@aiaware.com.pk',
            to: 'saadbintariq01@gmail.com',
            subject: `Warning: Sensor Unit with ID: ${sensor_id}   NOT WORKING `,
            text: `AI Aware Active Automated detected malfunctioning of the Sensor Unit deployed in ${deptName} and has not recorded data for over ${timeDifferenceInMinutes} minutes.\n` +
                  `Last time recorded when unit was working: ${adjustedLastTimestamp}\n` +
                  `Please visit the site location as soon as possible.`+
                  `Thank You`
          };

          const transporter = nodemailer.createTransport({
                
                auth: {
                    user: 'alert@aiaware.com.pk',
                    pass: 'Saadbintariq' // Use the app password generated for your account
                },
                host: 'mail.aiaware.com.pk',
                port: 465, // Port 465 for SSL connection
                secure: true // Use true for a secure SSL/TLS connection
            });


          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.error(`Error sending email for ${tableName}:`, err);
            } else {
              console.log(`Warning email sent for ${tableName}:`, info.response);
            }
          });
        });
      }
    });
  }
};


// Schedule the cron job to run every hour
cron.schedule('0 */4 * * *', () => {
  console.log('Running data check and email warning...');
  //uncomment to run this
  //checkDataAndSendWarning();
});

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