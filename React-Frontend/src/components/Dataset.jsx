import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import './Dataset.css';
import 'datatables.net';
import Footer from './footer';
function Dataset() {
    const [table, setTable] = useState(null);

    useEffect(() => {
      if (!$.fn.DataTable) {
          // DataTables not loaded, return or handle error
          console.error('DataTables not loaded');
          return;
      }
  
      // Initialize DataTable if not already initialized
      if (!table) {
          const newTable = $('#example').DataTable({
              dom: 'Bfrtip',
              buttons: [
                  { extend: 'copyHtml5', className: 'button' },
                  { extend: 'excelHtml5', className: 'button' },
                  { extend: 'csvHtml5', className: 'button' },
                  { extend: 'pdfHtml5', className: 'button' }
              ]
          });
          setTable(newTable);
      }
  
      // Event handler for dropdown change
      $('#indoorDropdown, #outdoorDropdown, #portableDropdown').change(function () {
          var selectedValue = $(this).val();
          if (selectedValue !== '') {
              fetchData(selectedValue);
              displayData(selectedValue);
          }
      });
  
      // Fetch and display data for the default value
      fetchData(1);
      displayData(1);
  
      return () => {
          // Cleanup
          if ($.fn.DataTable.isDataTable('#example')) {
              $('#example').DataTable().destroy();
            
          }
      };
  }, [table]); // Only re-run the effect if table changes
  

    function displayData(selectedValue) {
        $.ajax({
            url: 'https://backend.aiaware.com.pk/api/v1/single-sensor-data/' + selectedValue,
            method: 'GET',
            success: function (response) {
                if (response.length > 0) {
                    // Display sensor details
                    $('#deptName').text("Location: " + response[0].dept_name);
                    $('#coordinates').text('Latitude: ' + response[0].latitude + ', Longitude: ' + response[0].longitude);
                    $('#sensorDetails').show();
                } else {
                    // Hide sensor details if no data found
                    $('#sensorDetails').hide();
                }
            },
            error: function (xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    function fetchData(selectedValue) {
        $.ajax({
            url: 'https://backend.aiaware.com.pk/api/v1/all-data/' + selectedValue,
            method: 'GET',
            success: function (response) {
                // Clear previous data
                table.clear().draw();
                // Add new data
                response.forEach(function (data) {
                    table.row.add([
                        data.sensor_id,
                        data.temperature,
                        data.humidity,
                        data.timestamp
                    ]).draw(false);
                });
            },
            error: function (xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    return (
        <>
        <div className="tablediv">
            <div id="sensorDetails" style={{ display: 'none' }}>
                <h1 id="deptName"></h1>
                <p id="coordinates"></p>
            </div>
            <div className="dropdown-row">
                <div className="dropdown">
                    <label htmlFor="indoorDropdown">Indoor Sensors:</label>
                    <select id="indoorDropdown">
                        <option value="">Select Indoor Sensor</option>
                        <option value="1">Ayesha Hostel</option>
                        <option value="2">SCME</option>
                        <option value="3">IGIS</option>
                        <option value="4">Attar Hostel</option>
                        <option value="5">DDME</option>
                        <option value="6">SADA</option>
                        
                    </select>
                </div>
                <div className="dropdown">
                    <label htmlFor="outdoorDropdown">Outdoor Sensors:</label>
                    <select id="outdoorDropdown">
                        <option value="">Select Outdoor Sensor</option>
                        <option value="21">Ibrahim Mess</option>
                        {/* <option value="22">22</option> */}
                        <option value="23">SINES</option>
                        <option value="24">NSHS</option>
                        <option value="25">SMME</option>
                        <option value="26">Razi Hostel</option>
                        <option value="27">Sports Complex</option>
                    </select>
                </div>
            </div>
            <div className="container">
                <table id="example" className="styled-table" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Sensor ID</th>
                            <th>Temperature</th>
                            <th>Humidity</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
        <Footer></Footer>
        </>
    );
}

export default Dataset;