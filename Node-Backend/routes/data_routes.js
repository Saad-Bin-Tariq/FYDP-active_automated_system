const express = require('express')
const router = express.Router()
const tasks = require('../controllers/data_handle')

//all routes have backend.aiaware.com.pk/api/v1/  before them & sensor_ids are from 1 to 4

//get routes
router.route('/all-data/:sensor_id').get(tasks.getAllData)
router.route('/latest-data/:sensor_id').get(tasks.getLatestData)
router.route('/sensor-data').get(tasks.getAllSensorData)
router.route('/single-sensor-data/:sensorId').get(tasks.getSingleSensorData)
router.route('/maxmin-data/:sensor_id').get(tasks.getMaxMinData)
//?interval=daily or weekly or monthly
router.route('/interval-data/:sensor_id').get(tasks.getIntervalData)
//?year=2024&month=2&day=6
router.route('/single-data/:sensor_id').get(tasks.getDataByDate)
router.route('/map-data/:sensor_type').get(tasks.getMapData)

//post routes
router.route('/sensor-push-data/:sensor_id').post(tasks.postNodeData)
router.route('/sim-push-data/:sensor_id/:temperature/:humidity').post(tasks.postSimData)
router.route('/sensor-portable-data/:sensor_id').post(tasks.postPortableData)


module.exports = router
