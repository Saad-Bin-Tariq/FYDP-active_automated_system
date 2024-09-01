import React, { useEffect } from 'react';
import $ from 'jquery';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import Footer from './footer';
import L from 'leaflet';
import 'leaflet.heat';
import './Heatmap.css'

function Heatmap() {
  useEffect(() => {
    // Define color gradient for the heatmap
  const gradient = {
    0.0: '#28b019',
    0.1: '#28b019',
    0.2: '#eef73b',
    0.3: '#f7c640',
    0.4: '#d49a37',
    0.5: '#ca6702',
    0.6: '#bb3e03',
    0.7: '#ae2012',
    0.8: '#400f0a',
    0.9: '#1a0503',
    1: '#1a0503'
  };
  
  // Initialize the heatLayer variable
  let heatLayer = null;
  
  // Initialize global max_temp and min_temp variables
  let max_temp = null;
  let min_temp = null;
  
  // Initialize the map
  const map = L.map('map').setView([33.6442, 72.9920], 15); // Set to NUST H-12 Islamabad
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  
  // Create a legend control
  const legend = L.control({ position: 'bottomright' });
  
  legend.onAdd = function(map) {
    const div = L.DomUtil.create('div', 'info legend');
    const grades = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
    
    div.innerHTML = '<strong>Temperature</strong><br>';
    
    // Only update legend if max_temp and min_temp are defined
    if (max_temp !== null && min_temp !== null) {
      for (let i = 0; i < grades.length - 1; i++) {
        const startTemp = (grades[i] * (max_temp - min_temp) + min_temp).toFixed(1);
        const endTemp = (grades[i + 1] * (max_temp - min_temp) + min_temp).toFixed(1);
        div.innerHTML += `<i style="background: ${gradient[grades[i]]}; width: 20px; height: 20px; display: inline-block;"></i> ${startTemp}°C to ${endTemp}°C<br>`;
      }
    }
  
    return div;
  };
  
  // Add the legend to the map
  legend.addTo(map);
  
  // Add event listener to toggle map and image display
  document.getElementById('toggle_map_display').addEventListener('click', function() {
    const mapDiv = document.getElementById('map');
    const imageContainer = document.getElementById('image-container');
    const toggleButton = document.getElementById('toggle_map_display');
    
    // Toggle map and image display
    if (mapDiv.style.display === 'none') {
      mapDiv.style.display = 'block';
      imageContainer.style.display = 'none'; // Hide image container
      toggleButton.innerText = 'Interpolated Map'; // Change button text
    } else {
      mapDiv.style.display = 'none';
      imageContainer.style.display = 'block'; // Show image container
      toggleButton.innerText = 'Heat Map'; // Change button text
    }
  });
  
  // Add event listener to fetch data and create heatmap
  $('#get_data').click(function() {
    const start_date = $('#start_date').val();
    const end_date = $('#end_date').val();
    const temperature_type = $('#temperature_type').val();
    const sensor_type = $('input[name="sensor_type"]:checked').val();
  
    // Fetch data for heat map
    $.ajax({
      url: `https://backend.aiaware.com.pk/api/v1/map-data/${sensor_type}?start_year=${start_date.slice(0, 4)}&start_month=${start_date.slice(5, 7)}&start_day=${start_date.slice(8)}&end_year=${end_date.slice(0, 4)}&end_month=${end_date.slice(5, 7)}&end_day=${end_date.slice(8)}`,
      method: 'GET',
      success: function(data) {
        const heatMapData = [];
        max_temp = -99.9; // Initialize with default values
        min_temp = 99.9;
  
        // Calculate max and min temperatures
        data.forEach(sensor => {
          const temperature = sensor[`${temperature_type}_temperature`];
          if (temperature < min_temp) {
            min_temp = temperature;
          }
          if (temperature > max_temp) {
            max_temp = temperature;
          }
        });
  
        // Normalize temperature data and add to heatMapData
        if (min_temp !== max_temp) {
          data.forEach(sensor => {
            const temperature = sensor[`${temperature_type}_temperature`];
            const normalizedTemperature =  0.2 + ((temperature - min_temp) / (max_temp - min_temp)) * 0.8;
            heatMapData.push([sensor.latitude, sensor.longitude, normalizedTemperature]);
          });
        } else {
          console.error('Error: min_temp and max_temp are equal. Cannot normalize data.');
        }
  
        // Remove previous heatLayer if it exists
        if (heatLayer) {
          map.removeLayer(heatLayer);
        }
        console.log(heatMapData);
        // Add a new heatmap
        heatLayer = L.heatLayer(heatMapData, {
          radius: 30,
          blur: 35,
          maxZoom: 14,
          gradient: gradient
        }).addTo(map);
  
        // Update the legend with the new max and min temperatures
        legend.onAdd = function(map) {
          const div = L.DomUtil.create('div', 'info legend');
          const grades = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
          div.innerHTML = '<strong>Temperature</strong><br>';
          for (let i = 0; i < grades.length - 1; i++) {
            const startTemp = (grades[i] * (max_temp - min_temp) + min_temp).toFixed(1);
            const endTemp = (grades[i + 1] * (max_temp - min_temp) + min_temp).toFixed(1);
            div.innerHTML += `<i style="background: ${gradient[grades[i]]}; width: 20px; height: 20px;border-radius: 6px; display: inline-block;"></i> ${startTemp}°C to ${endTemp}°C<br>`;
          }
          return div;
        };
  
        // Update legend control
        map.removeControl(legend);
        legend.addTo(map);
  
        // Set the map view to the first sensor location
        if (data[0]) {
          map.setView([data[0].latitude, data[0].longitude], 15);
        }
  
      },
      error: function(xhr, status, error) {
        console.error('Error fetching data:', error);
      }
    });
  
    // Fetch data for interpolated map
    $.ajax({
      url: `http://52.63.111.54/api/v1/map-data/${sensor_type}/${temperature_type}?start_year=${start_date.slice(0, 4)}&start_month=${start_date.slice(5, 7)}&start_day=${start_date.slice(8)}&end_year=${end_date.slice(0, 4)}&end_month=${end_date.slice(5, 7)}&end_day=${end_date.slice(8)}`,
      method: 'GET',
      success: function(htmlResponse) {
        // Display the HTML response containing the image in the image-container div
        $('#image').html(htmlResponse);
      },
      error: function(xhr, status, error) {
        console.error('Error fetching image:', error);
      }
    });
  });
    //let heatLayer = null; // Declare heatLayer variable outside the function

    return () => {
      map.remove(); // Cleanup when component unmounts
    };
  }, []); // Empty dependency array to run this effect only once

  return (
    <>
    <div id="container">
      <div id="one">
        <label className="inputdiv" htmlFor="start_date">Start Date:</label>
        <input className="inputdiv" type="date" id="start_date" name="start_date"></input>
        <label className="inputdiv" htmlFor="end_date">End Date:</label>
        <input className="inputdiv" type="date" id="end_date" name="end_date"></input>
        <select className="inputdiv" id="temperature_type">
          <option value="min">Minimum Temperature</option>
          <option value="max">Maximum Temperature</option>
          <option value="avg">Average Temperature</option>
        </select>
        <label className="inputdiv">Choose Sensor Type:</label>
        <div className="inputdiv">
          <input type="radio" id="indoor" name="sensor_type" value="indoor" defaultChecked></input>
          <label htmlFor="indoor">Indoor Sensors</label>
        </div>
        <div className="inputdiv">
          <input type="radio" id="outdoor" name="sensor_type" value="outdoor"></input>
          <label htmlFor="outdoor">Outdoor Sensors</label>
        </div>
        <button id="get_data">Generate Map</button><br></br>
        <button id="toggle_map_display"></button>
        <p>Interpolated map employs sophisticated algorithm to estimate temperature values across Nust, providing a detailed depiction of temperature distribution and gradients between measured data points.</p>
      </div>
      <div id="two">
        <div id="map" style={{ width: '100%', height: '570px' }}></div>
        <div id="image-container" style={{ display: 'none' }}>
          <div id="image"></div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
}

export default Heatmap;