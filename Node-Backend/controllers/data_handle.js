// dataController.js
const pool = require('../db/db_connection');

const getAllData = async (req, res) => {
  try {
    const { sensor_id } = req.params;
    const sensorTableMapping = {
      1: 'indoor_01',
      2: 'indoor_02',
      3: 'indoor_03',
      4: 'indoor_04',
      5: 'indoor_05',
      6: 'indoor_06',
      21: 'outdoor_01',
      23: 'outdoor_03',
      24: 'outdoor_04',
      25: 'outdoor_05',
      26: 'outdoor_06',
      27: 'outdoor_07',
      41: 'portable_01',
      42: 'portable_02'
      // Add more mappings as needed
    };
    // Get the table name based on the sensor_id
    const tableName = sensorTableMapping[sensor_id];
    if (!tableName) {
      return res.status(400).json({ error: 'Invalid sensor_id' });
    }
    const query = `SELECT * FROM ${tableName} ORDER BY timestamp DESC`;
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Adjust timestamps to GMT+5
        results.forEach(result => {
          // Convert timestamp string to Date object
          const timestamp = new Date(result.timestamp);
          // Add 5 hours to the timestamp to convert it to GMT+5
          timestamp.setHours(timestamp.getHours() + 5);
          // Convert back to string and update the result
          result.timestamp = timestamp.toISOString();
        });
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getSingleSensorData = async (req, res) => {
  try {
    // Extract sensorId from the request parameters
    const { sensorId } = req.params;

    // Query to fetch all fields from the sensors table where sensorId matches
    const query = 'SELECT * FROM sensors WHERE sensor_id = ?';

    // Execute the query with the sensorId parameter
    pool.query(query, [sensorId], (error, results) => {
      if (error) {
        console.error('Error retrieving sensor data:', error);
        // Return 500 Internal Server Error if there's an error
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Return the fetched sensor data if successful
        res.status(200).json(results);
      }
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error retrieving sensor data:', error);
    // Return 500 Internal Server Error if there's an unexpected error
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const getAllSensorData = async (req, res) => {
  try {
    // Query to fetch all fields from the sensors table
    const query = 'SELECT * FROM sensors';

    // Execute the query
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error retrieving sensor data:', error);
        // Return 500 Internal Server Error if there's an error
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Return the fetched sensor data if successful
        res.status(200).json(results);
      }
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error retrieving sensor data:', error);
    // Return 500 Internal Server Error if there's an unexpected error
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const getMaxMinData = async (req, res) => {
  try {
    const { sensor_id } = req.params;
    const sensorTableMapping = {
      1: 'indoor_01',
      2: 'indoor_02',
      3: 'indoor_03',
      4: 'indoor_04',
      5: 'indoor_05',
      6: 'indoor_06',
      21: 'outdoor_01',
      23: 'outdoor_03',
      24: 'outdoor_04',
      25: 'outdoor_05',
      26: 'outdoor_06',
      27: 'outdoor_07',
      41: 'portable_01',
      42: 'portable_02'
      // Add more mappings as needed
    };
    // Get the table name based on the sensor_id
    const tableName = sensorTableMapping[sensor_id];
    if (!tableName) {
      return res.status(400).json({ error: 'Invalid sensor_id' });
    }
    const query = `SELECT 
          MAX(temperature) AS max_temperature, 
          MIN(temperature) AS min_temperature, 
          MAX(humidity) AS max_humidity, 
          MIN(humidity) AS min_humidity, 
          (SELECT timestamp FROM ${tableName} WHERE temperature = (SELECT MAX(temperature) FROM ${tableName}) ORDER BY timestamp DESC LIMIT 1) AS max_temperature_timestamp,
          (SELECT timestamp FROM ${tableName} WHERE temperature = (SELECT MIN(temperature) FROM ${tableName}) ORDER BY timestamp DESC LIMIT 1) AS min_temperature_timestamp,
          (SELECT timestamp FROM ${tableName} WHERE humidity = (SELECT MAX(humidity) FROM ${tableName}) ORDER BY timestamp DESC LIMIT 1) AS max_humidity_timestamp,
          (SELECT timestamp FROM ${tableName} WHERE humidity = (SELECT MIN(humidity) FROM ${tableName}) ORDER BY timestamp DESC LIMIT 1) AS min_humidity_timestamp
      FROM ${tableName}`;
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Convert timestamps and adjust to GMT+5
        const convertTimestampToGMT5 = timestamp => {
          const date = new Date(timestamp);
          date.setUTCHours(date.getUTCHours() + 5);
          if (date.getUTCHours() >= 24) {
            date.setDate(date.getDate() + 1);
            date.setUTCHours(date.getUTCHours() - 24);
          }
          return date;
        };

        const formatTimestamp = timestamp => {
          const date = convertTimestampToGMT5(timestamp);
          const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"];
          const month = monthNames[date.getMonth()];
          const day = date.getDate();
          const year = date.getFullYear();
          let hours = date.getHours();
          let minutes = date.getMinutes();
          const ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? '0' + minutes : minutes;
          const strTime = hours + ':' + minutes + ' ' + ampm;
          return month + ' ' + day + ', ' + year + ' ' + strTime;
        };

        results.forEach(result => {
          result.max_temperature_timestamp = formatTimestamp(result.max_temperature_timestamp);
          result.min_temperature_timestamp = formatTimestamp(result.min_temperature_timestamp);
          result.max_humidity_timestamp = formatTimestamp(result.max_humidity_timestamp);
          result.min_humidity_timestamp = formatTimestamp(result.min_humidity_timestamp);
        });
        
        res.status(200).json(results[0]); // Return only the first row
      }
    });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const getIntervalData = async (req, res) => {
  try {
    const { sensor_id } = req.params;
    const { interval } = req.query;

    const sensorTableMapping = {
      1: 'indoor_01',
      2: 'indoor_02',
      3: 'indoor_03',
      4: 'indoor_04',
      5: 'indoor_05',
      6: 'indoor_06',
      21: 'outdoor_01',
      23: 'outdoor_03',
      24: 'outdoor_04',
      25: 'outdoor_05',
      26: 'outdoor_06',
      27: 'outdoor_07',
      41: 'portable_01',
      42: 'portable_02'
      // Add more mappings as needed
    };

    // Get the table name based on the sensor_id
    const tableName = sensorTableMapping[sensor_id];

    if (!tableName) {
      return res.status(400).json({ error: 'Invalid sensor_id' });
    }

    let query = '';

    switch (interval) {
      case 'daily':
        query = `SELECT
            timestamp AS date,
            YEAR(timestamp) AS year,
            MONTH(timestamp) AS month,
            DAY(timestamp) AS date,
            CASE
                WHEN HOUR(timestamp) >= 19 OR HOUR(timestamp) < 1 THEN 'time1'
                WHEN HOUR(timestamp) BETWEEN 1 AND 7 THEN 'time2'
                WHEN HOUR(timestamp) BETWEEN 7 AND 13 THEN 'time3'
                WHEN HOUR(timestamp) BETWEEN 13 AND 19 THEN 'time4'
            END AS time_interval,
            ROUND(AVG(temperature), 1) AS avg_temperature,
            ROUND(AVG(humidity), 1) AS avg_humidity
        FROM
            ${tableName}    
        GROUP BY
            YEAR(timestamp),
            MONTH(timestamp),
            DAY(timestamp),
            time_interval
        ORDER BY
            YEAR(timestamp),
            MONTH(timestamp),
            DAY(timestamp),
            time_interval`;
        break;

      case 'weekly':
        query = `SELECT
            YEAR(timestamp) AS year,
            MONTH(timestamp) AS month,
            CASE
                WHEN DAY(timestamp) >= 1 AND DAY(timestamp) <= 7 THEN 1
                WHEN DAY(timestamp) > 7 AND DAY(timestamp) <= 15 THEN 2
                WHEN DAY(timestamp) > 15 AND DAY(timestamp) <= 23 THEN 3
                WHEN DAY(timestamp) > 23 AND DAY(timestamp) <= 31 THEN 4
            END AS week,
            CASE
                WHEN HOUR(timestamp) BETWEEN 5 AND 11 THEN 'time1'
                WHEN HOUR(timestamp) BETWEEN 11 AND 17 THEN 'time2'
                WHEN HOUR(timestamp) BETWEEN 17 AND 23 THEN 'time3'
                WHEN HOUR(timestamp) >= 0 OR HOUR(timestamp) < 5 THEN 'time4'
            END AS time_interval,
            ROUND(AVG(temperature), 1) AS avg_temperature,
            ROUND(AVG(humidity), 1) AS avg_humidity
        FROM
            ${tableName}
        GROUP BY
            YEAR(timestamp),
            MONTH(timestamp),
            week,
            time_interval
        ORDER BY
            YEAR(timestamp),
            MONTH(timestamp),
            week,
            time_interval`;
        break;

      case 'monthly':
        query = `SELECT
            YEAR(timestamp) AS year,
            MONTH(timestamp) AS month,
            CASE
                WHEN HOUR(timestamp) BETWEEN 5 AND 11 THEN 'time1'
                WHEN HOUR(timestamp) BETWEEN 11 AND 17 THEN 'time2'
                WHEN HOUR(timestamp) BETWEEN 17 AND 23 THEN 'time3'
                WHEN HOUR(timestamp) >= 0 OR HOUR(timestamp) < 5 THEN 'time4'
                ELSE 'time5'
            END AS time_interval,
            ROUND(AVG(temperature), 1) AS avg_temperature,
            ROUND(AVG(humidity), 1) AS avg_humidity
        FROM
            ${tableName}
        GROUP BY
            YEAR(timestamp),
            MONTH(timestamp),
            time_interval
        ORDER BY
            YEAR(timestamp),
            MONTH(timestamp),
            time_interval`;
        break;

      default:
        return res.status(400).json({ error: 'Invalid interval' });
    }

    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Restructure the data before sending the response
        const formattedData = [];
        let currentEntry = {};

        results.forEach(result => {
          const { year, month, week, date, time_interval, avg_temperature, avg_humidity } = result;
          if (!currentEntry.year || currentEntry.year !== year || currentEntry.month !== month || currentEntry.week !== week || currentEntry.date !== date) {
            // If the current entry is different from the previous one, push the current entry to the formatted data array
            if (Object.keys(currentEntry).length > 0) {
              formattedData.push(currentEntry);
            }
            // Start a new entry
            currentEntry = {
              date,
              year,
              month,
              week,
              time1: {},
              time2: {},
              time3: {},
              time4: {},
              time5: {}
            };
          }
          // Assign the average temperature and humidity to the corresponding time interval
          currentEntry[time_interval] = { temperature: avg_temperature, humidity: avg_humidity };
        });

        // Push the last entry to the formatted data array
        if (Object.keys(currentEntry).length > 0) {
          formattedData.push(currentEntry);
        }

        // Calculate the average for time5
        formattedData.forEach(entry => {
          const { time1, time2, time3, time4 } = entry;
          const validTimes = ['time1', 'time2', 'time3', 'time4'].filter(time => Object.keys(entry[time]).length > 0);
          if (validTimes.length > 0) {
            const avgTemperature = (validTimes.reduce((acc, curr) => acc + entry[curr].temperature, 0) / validTimes.length).toFixed(1);
            const avgHumidity = (validTimes.reduce((acc, curr) => acc + entry[curr].humidity, 0) / validTimes.length).toFixed(1);
            entry.time5 = { temperature: parseFloat(avgTemperature), humidity: parseFloat(avgHumidity) };
          }
        });

        res.status(200).json(formattedData);
      }
    });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const getMapData = async (req, res) => {
  try {
    const { sensor_type } = req.params;
    const { start_year, start_month, start_day, end_year, end_month, end_day } = req.query;

    // Check if start and end year, month, and day are provided and valid
    if (!start_year || !start_month || !start_day || !end_year || !end_month || !end_day ||
        isNaN(start_year) || isNaN(start_month) || isNaN(start_day) ||
        isNaN(end_year) || isNaN(end_month) || isNaN(end_day)) {
      return res.status(400).json({ error: 'Invalid date parameters. Please provide valid start and end year, month, and day.' });
    }

    let query;

    if (sensor_type === 'indoor') {
      query = `
                (SELECT
            s.sensor_id,
            MIN(i1.temperature) AS min_temperature,
            MAX(i1.temperature) AS max_temperature,
         	ROUND(AVG(i1.temperature),1) AS avg_temperature,
            MIN(i1.humidity) AS min_humidity,
            MAX(i1.humidity) AS max_humidity,
         	ROUND(AVG(i1.humidity),1) AS avg_humidity,
            s.latitude,
            s.longitude
        FROM
            sensors s
        LEFT JOIN
            indoor_01 i1 ON s.sensor_id = 1 AND DATE(i1.timestamp) BETWEEN '${start_year}-${start_month}-${start_day}' AND '${end_year}-${end_month}-${end_day}'
        
        WHERE
            (i1.sensor_id IS NOT NULL )
        GROUP BY
            s.sensor_id,
            s.latitude,
            s.longitude)
            
        UNION ALL
        (SELECT
            s.sensor_id,
            MIN(i2.temperature) AS min_temperature,
            MAX(i2.temperature) AS max_temperature,
         	ROUND(AVG(i2.temperature),1) AS avg_temperature,
            MIN(i2.humidity) AS min_humidity,
            MAX(i2.humidity) AS max_humidity,
         	ROUND(AVG(i2.humidity),1) AS avg_humidity,
            s.latitude,
            s.longitude
        FROM
            sensors s
        LEFT JOIN
            indoor_02 i2 ON s.sensor_id = 2 AND DATE(i2.timestamp) BETWEEN '${start_year}-${start_month}-${start_day}' AND '${end_year}-${end_month}-${end_day}'
        
        WHERE
            (i2.sensor_id IS NOT NULL )
        GROUP BY
            s.sensor_id,
            s.latitude,
            s.longitude)
        
        UNION ALL
        (SELECT
            s.sensor_id,
            MIN(i3.temperature) AS min_temperature,
            MAX(i3.temperature) AS max_temperature,
         	ROUND(AVG(i3.temperature),1) AS avg_temperature,
            MIN(i3.humidity) AS min_humidity,
            MAX(i3.humidity) AS max_humidity,
         	ROUND(AVG(i3.humidity),1) AS avg_humidity,
            s.latitude,
            s.longitude
        FROM
            sensors s
        LEFT JOIN
            indoor_03 i3 ON s.sensor_id = 3 AND DATE(i3.timestamp) BETWEEN '${start_year}-${start_month}-${start_day}' AND '${end_year}-${end_month}-${end_day}'
        
        WHERE
            (i3.sensor_id IS NOT NULL )
        GROUP BY
            s.sensor_id,
            s.latitude,
            s.longitude)
        
        UNION ALL
        (SELECT
            s.sensor_id,
            MIN(i4.temperature) AS min_temperature,
            MAX(i4.temperature) AS max_temperature,
         	ROUND(AVG(i4.temperature),1) AS avg_temperature,
            MIN(i4.humidity) AS min_humidity,
            MAX(i4.humidity) AS max_humidity,
         	ROUND(AVG(i4.humidity),1) AS avg_humidity,
            s.latitude,
            s.longitude
        FROM
            sensors s
        LEFT JOIN
            indoor_04 i4 ON s.sensor_id = 4 AND DATE(i4.timestamp) BETWEEN '${start_year}-${start_month}-${start_day}' AND '${end_year}-${end_month}-${end_day}'
        
        WHERE
            (i4.sensor_id IS NOT NULL )
        GROUP BY
            s.sensor_id,
            s.latitude,
            s.longitude)
        
        UNION ALL
        (SELECT
            s.sensor_id,
            MIN(i5.temperature) AS min_temperature,
            MAX(i5.temperature) AS max_temperature,
         	ROUND(AVG(i5.temperature),1) AS avg_temperature,
            MIN(i5.humidity) AS min_humidity,
            MAX(i5.humidity) AS max_humidity,
         	ROUND(AVG(i5.humidity),1) AS avg_humidity,
            s.latitude,
            s.longitude
        FROM
            sensors s
        LEFT JOIN
            indoor_05 i5 ON s.sensor_id = 5 AND DATE(i5.timestamp) BETWEEN '${start_year}-${start_month}-${start_day}' AND '${end_year}-${end_month}-${end_day}'
        
        WHERE
            (i5.sensor_id IS NOT NULL )
        GROUP BY
            s.sensor_id,
            s.latitude,
            s.longitude)
        
        UNION ALL
        (SELECT
            s.sensor_id,
            MIN(i6.temperature) AS min_temperature,
            MAX(i6.temperature) AS max_temperature,
         	ROUND(AVG(i6.temperature),1) AS avg_temperature,
            MIN(i6.humidity) AS min_humidity,
            MAX(i6.humidity) AS max_humidity,
         	ROUND(AVG(i6.humidity),1) AS avg_humidity,
            s.latitude,
            s.longitude
        FROM
            sensors s
        LEFT JOIN
            indoor_06 i6 ON s.sensor_id = 6 AND DATE(i6.timestamp) BETWEEN '${start_year}-${start_month}-${start_day}' AND '${end_year}-${end_month}-${end_day}'
        
        WHERE
            (i6.sensor_id IS NOT NULL )
        GROUP BY
            s.sensor_id,
            s.latitude,
            s.longitude)

      `;
    } else if (sensor_type === 'outdoor') {
      query = `
                (SELECT
            s.sensor_id,
            MIN(o1.temperature) AS min_temperature,
            MAX(o1.temperature) AS max_temperature,
         	ROUND(AVG(o1.temperature),1) AS avg_temperature,
            MIN(o1.humidity) AS min_humidity,
            MAX(o1.humidity) AS max_humidity,
         	ROUND(AVG(o1.humidity),1) AS avg_humidity,
            s.latitude,
            s.longitude
        FROM
            sensors s
        LEFT JOIN
            outdoor_01 o1 ON s.sensor_id = 21 AND DATE(o1.timestamp) BETWEEN '${start_year}-${start_month}-${start_day}' AND '${end_year}-${end_month}-${end_day}'
        
        WHERE
            (o1.sensor_id IS NOT NULL )
        GROUP BY
            s.sensor_id,
            s.latitude,
            s.longitude)

        UNION ALL
        (SELECT
            s.sensor_id,
            MIN(o3.temperature) AS min_temperature,
            MAX(o3.temperature) AS max_temperature,
         	ROUND(AVG(o3.temperature),1) AS avg_temperature,
            MIN(o3.humidity) AS min_humidity,
            MAX(o3.humidity) AS max_humidity,
         	ROUND(AVG(o3.humidity),1) AS avg_humidity,
            s.latitude,
            s.longitude
        FROM
            sensors s
        LEFT JOIN
            outdoor_03 o3 ON s.sensor_id = 23 AND DATE(o3.timestamp) BETWEEN '${start_year}-${start_month}-${start_day}' AND '${end_year}-${end_month}-${end_day}'
        
        WHERE
            (o3.sensor_id IS NOT NULL )
        GROUP BY
            s.sensor_id,
            s.latitude,
            s.longitude)
            
        UNION ALL
        (SELECT
            s.sensor_id,
            MIN(o4.temperature) AS min_temperature,
            MAX(o4.temperature) AS max_temperature,
         	ROUND(AVG(o4.temperature),1) AS avg_temperature,
            MIN(o4.humidity) AS min_humidity,
            MAX(o4.humidity) AS max_humidity,
         	ROUND(AVG(o4.humidity),1) AS avg_humidity,
            s.latitude,
            s.longitude
        FROM
            sensors s
        LEFT JOIN
            outdoor_04 o4 ON s.sensor_id = 24 AND DATE(o4.timestamp) BETWEEN '${start_year}-${start_month}-${start_day}' AND '${end_year}-${end_month}-${end_day}'
        
        WHERE
            (o4.sensor_id IS NOT NULL )
        GROUP BY
            s.sensor_id,
            s.latitude,
            s.longitude)
        
        UNION ALL
        (SELECT
            s.sensor_id,
            MIN(o5.temperature) AS min_temperature,
            MAX(o5.temperature) AS max_temperature,
         	ROUND(AVG(o5.temperature),1) AS avg_temperature,
            MIN(o5.humidity) AS min_humidity,
            MAX(o5.humidity) AS max_humidity,
         	ROUND(AVG(o5.humidity),1) AS avg_humidity,
            s.latitude,
            s.longitude
        FROM
            sensors s
        LEFT JOIN
            outdoor_05 o5 ON s.sensor_id = 25 AND DATE(o5.timestamp) BETWEEN '${start_year}-${start_month}-${start_day}' AND '${end_year}-${end_month}-${end_day}'
        
        WHERE
            (o5.sensor_id IS NOT NULL )
        GROUP BY
            s.sensor_id,
            s.latitude,
            s.longitude)
        
        UNION ALL
        (SELECT
            s.sensor_id,
            MIN(o6.temperature) AS min_temperature,
            MAX(o6.temperature) AS max_temperature,
         	ROUND(AVG(o6.temperature),1) AS avg_temperature,
            MIN(o6.humidity) AS min_humidity,
            MAX(o6.humidity) AS max_humidity,
         	ROUND(AVG(o6.humidity),1) AS avg_humidity,
            s.latitude,
            s.longitude
        FROM
            sensors s
        LEFT JOIN
            outdoor_06 o6 ON s.sensor_id = 26 AND DATE(o6.timestamp) BETWEEN '${start_year}-${start_month}-${start_day}' AND '${end_year}-${end_month}-${end_day}'
        
        WHERE
            (o6.sensor_id IS NOT NULL )
        GROUP BY
            s.sensor_id,
            s.latitude,
            s.longitude)
        
        UNION ALL
        (SELECT
            s.sensor_id,
            MIN(o7.temperature) AS min_temperature,
            MAX(o7.temperature) AS max_temperature,
         	ROUND(AVG(o7.temperature),1) AS avg_temperature,
            MIN(o7.humidity) AS min_humidity,
            MAX(o7.humidity) AS max_humidity,
         	ROUND(AVG(o7.humidity),1) AS avg_humidity,
            s.latitude,
            s.longitude
        FROM
            sensors s
        LEFT JOIN
            outdoor_07 o7 ON s.sensor_id = 27 AND DATE(o7.timestamp) BETWEEN '${start_year}-${start_month}-${start_day}' AND '${end_year}-${end_month}-${end_day}'
        
        WHERE
            (o7.sensor_id IS NOT NULL )
        GROUP BY
            s.sensor_id,
            s.latitude,
            s.longitude)
      `;
    } else {
      return res.status(400).json({ error: 'Invalid sensor_type parameter. Please provide either "indoor" or "outdoor".' });
    }

    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Restructure the data before sending the response
        const formattedData = results.map(result => ({
          sensor_id: result.sensor_id,
          min_temperature: result.min_temperature,
          max_temperature: result.max_temperature,
          avg_temperature: result.avg_temperature,
          min_humidity: result.min_humidity,
          max_humidity: result.max_humidity,
          avg_humidity: result.avg_humidity,
          latitude: result.latitude,
          longitude: result.longitude
        }));
        res.status(200).json(formattedData);
      }
    });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const getDataByDate = async (req, res) => {
  try {
    const { sensor_id } = req.params;
    const { year, month, day } = req.query;

    // Check if year, month, and day are provided and valid
    if (!year || !month || !day || isNaN(year) || isNaN(month) || isNaN(day)) {
      return res.status(400).json({ error: 'Invalid date parameters. Please provide valid year, month, and day.' });
    }

    const sensorTableMapping = {
      1: 'indoor_01',
      2: 'indoor_02',
      3: 'indoor_03',
      4: 'indoor_04',
      5: 'indoor_05',
      6: 'indoor_06',
      21: 'outdoor_01',
      23: 'outdoor_03',
      24: 'outdoor_04',
      25: 'outdoor_05',
      26: 'outdoor_06',
      27: 'outdoor_07',
      41: 'portable_01',
      42: 'portable_02'
      // Add more mappings as needed
    };

    // Get the table name based on the sensor_id
    const tableName = sensorTableMapping[sensor_id];

    if (!tableName) {
      return res.status(400).json({ error: 'Invalid sensor_id' });
    }

    const query = `(SELECT
                        CASE
                            WHEN HOUR(timestamp) BETWEEN 19 AND 21 THEN '0000'
                            WHEN HOUR(timestamp) BETWEEN 21 AND 22 THEN '0200'
                            WHEN HOUR(timestamp) BETWEEN 22 AND 23 THEN '0400'
                            
                        END AS time_interval,
                        ROUND(AVG(temperature), 1) AS temperature,
                        ROUND(AVG(humidity), 1) AS humidity
                      FROM
                        ${tableName}
                      WHERE
                        YEAR(timestamp) = ${year} AND
                        MONTH(timestamp) = ${month} AND
                        DAY(timestamp) = ${day} - 1 AND
                        (HOUR(timestamp) BETWEEN 19 AND 24)
                      GROUP BY
                        YEAR(timestamp),
                        MONTH(timestamp),
                        DAY(timestamp),
                        time_interval
                      ORDER BY
                        YEAR(timestamp),
                        MONTH(timestamp),
                        DAY(timestamp),
                        time_interval
                    )
                    UNION ALL
                    
                    (SELECT
                        CASE
                            WHEN HOUR(timestamp) BETWEEN 1 AND 3 THEN '0600'
                            WHEN HOUR(timestamp) BETWEEN 3 AND 5 THEN '0800'
                            WHEN HOUR(timestamp) BETWEEN 5 AND 7 THEN '1000'
                            WHEN HOUR(timestamp) BETWEEN 7 AND 9 THEN '1200'
                            WHEN HOUR(timestamp) BETWEEN 9 AND 11 THEN '1400'
                            WHEN HOUR(timestamp) BETWEEN 11 AND 13 THEN '1600'
                            WHEN HOUR(timestamp) BETWEEN 13 AND 15 THEN '1800'
                            WHEN HOUR(timestamp) BETWEEN 15 AND 17 THEN '2000'
                            WHEN HOUR(timestamp) BETWEEN 17 AND 19 THEN '2200'
                        END AS time_interval,
                        ROUND(AVG(temperature), 1) AS temperature,
                        ROUND(AVG(humidity), 1) AS humidity
                      FROM
                        ${tableName}
                      WHERE
                        YEAR(timestamp) = ${year} AND
                        MONTH(timestamp) = ${month} AND
                        DAY(timestamp) = ${day} AND
                        (HOUR(timestamp) BETWEEN 1 AND 19)
                      GROUP BY
                        YEAR(timestamp),
                        MONTH(timestamp),
                        DAY(timestamp),
                        time_interval
                      ORDER BY
                        YEAR(timestamp),
                        MONTH(timestamp),
                        DAY(timestamp),
                        time_interval
                    )`;

    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Restructure the data before sending the response
        const formattedData = results.map(result => ({
          time_interval: result.time_interval,
          temperature: result.temperature,
          humidity: result.humidity
        }));
        res.status(200).json(formattedData);
      }
    });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const getLatestData = async (req, res) => {
    try {
      const { sensor_id } = req.params;
      const sensorTableMapping = {
          1: 'indoor_01',
          2: 'indoor_02',
          3: 'indoor_03',
          4: 'indoor_04',
          5: 'indoor_05',
          6: 'indoor_06',
          21: 'outdoor_01',
          23: 'outdoor_03',
          24: 'outdoor_04',
          25: 'outdoor_05',
          26: 'outdoor_06',
          27: 'outdoor_07',
          41: 'portable_01',
          42: 'portable_02'
          // Add more mappings as needed
        };
        // Get the table name based on the sensor_id
        const tableName = sensorTableMapping[sensor_id];
        if (!tableName) {
          return res.status(400).json({ error: 'Invalid sensor_id' });
        }
      const query = `SELECT * FROM ${tableName} ORDER BY timestamp DESC LIMIT 1`;
      pool.query(query, (error, results) => {
        if (error) {
          console.error('Error retrieving data:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(200).json(results);
        }
      });
    } catch (error) {
      console.error('Error retrieving data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };




const postNodeData = async (req, res) => {
    try {
        // Extract parameters from the request body and URL
        const { temperature, humidity} = req.body;
        const { sensor_id } = req.params;
      
        // Define a dictionary to map sensor_id to table names
        const sensorTableMapping = {
          1: 'indoor_01',
          2: 'indoor_02',
          3: 'indoor_03',
          4: 'indoor_04',
          5: 'indoor_05',
          6: 'indoor_06',
          21: 'outdoor_01',
          22: 'outdoor_02',
          23: 'outdoor_03',
          24: 'outdoor_04',
          25: 'outdoor_05',
          26: 'outdoor_06',
          27: 'outdoor_07'
          // Add more mappings as needed
        };
      
        // Get the table name based on the sensor_id
        const tableName = sensorTableMapping[sensor_id];
      
        // Check if a valid table name was retrieved
        if (!tableName) {
          return res.status(400).json({ error: 'Invalid sensor_id' });
        }
      
        // Build the dynamic query
        const query = `INSERT INTO ${tableName} (temperature, humidity, sensor_id) VALUES (?, ?, ?)`;
        const values = [temperature, humidity, sensor_id];
  
       pool.query(query, values, (error, results) => {
          if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            // Respond to the client
            res.status(200).json({ message: 'Data received and inserted successfully' });
          }
        });
      } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      
  };
  
  const postSimData = async (req, res) => {
    try {
        // Extract parameters from the request body and URL
    
        const { sensor_id, temperature, humidity } = req.params;
      
        // Define a dictionary to map sensor_id to table names
        const sensorTableMapping = {
          1: 'indoor_01',
          2: 'indoor_02',
          3: 'indoor_03',
          4: 'indoor_04',
          5: 'indoor_05',
          6: 'indoor_06',
          21: 'outdoor_01',
          22: 'outdoor_02',
          23: 'outdoor_03',
          24: 'outdoor_04',
          25: 'outdoor_05',
          26: 'outdoor_06',
          27: 'outdoor_07'
          
          // Add more mappings as needed
        };
      
        // Get the table name based on the sensor_id
        const tableName = sensorTableMapping[sensor_id];
      
        // Check if a valid table name was retrieved
        if (!tableName) {
          return res.status(400).json({ error: 'Invalid sensor_id' });
        }
      
        // Build the dynamic query
        const query = `INSERT INTO ${tableName} (temperature, humidity, sensor_id) VALUES (?, ?, ?)`;
        const values = [temperature, humidity, sensor_id];
  
       pool.query(query, values, (error, results) => {
          if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            // Respond to the client
            res.status(200).json({ message: 'Data received and inserted successfully' });
          }
        });
      } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      
  };

  const postPortableData = async (req, res) => {
    try {
        // Extract parameters from the request body and URL
        const { temperature, humidity, GPS} = req.body;
        
        const { latitude, longitude } = GPS;
        const { sensor_id } = req.params;
      
        // Define a dictionary to map sensor_id to table names
        const sensorTableMapping = {
          41: 'portable_01',
          42: 'portable_02'
       
          // Add more mappings as needed
        };
      
        // Get the table name based on the sensor_id
        const tableName = sensorTableMapping[sensor_id];
      
        // Check if a valid table name was retrieved
        if (!tableName) {
          return res.status(400).json({ error: 'Invalid sensor_id' });
        }
      
        // Log the extracted values to the console
        console.log('Sensor ID:', sensor_id);
        console.log('Temperature:', temperature);
        console.log('Humidity:', humidity);
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
      
        // Build the dynamic query
        const query = `INSERT INTO ${tableName} SET ?`;
        const values = { temperature, humidity, latitude, longitude };
      
        // Execute the database query
        pool.query(query, values, (error, results) => {
          if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            // Respond to the client
            res.status(200).json({ message: 'Data received and inserted successfully' });
          }
        });
      } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      
  };

module.exports = {
  getAllData,
  getSingleSensorData,
  getAllSensorData,
  getLatestData,
  getMapData,
  getDataByDate,
  getMaxMinData,
  getIntervalData,
  postSimData,
  postNodeData,
  postPortableData
};
