
# ACTIVE AUTOMATED SENSING SYSTEM FOR URBAN TURBULENT AND RADIANT HEAT - DYDP 2024 IGIS, NUST

## Overview

The **Active Automated Sensing System for Urban Turbulent and Radiant Heat** is a comprehensive project aimed at monitoring and mitigating the impacts of micro-climate changes in urban areas. This project leverages Geographic Information Systems (GIS) and real-time sensing systems to analyze urban heat islands and the cooling effects of different tree species. The project integrates several technologies, including IoT sensors, Machine Learning, and a React-based web dashboard, to provide insights for sustainable urban planning and climate change adaptation.

### Project Components
1. **Data Collection:**
   - **QField:** Used for collecting data on 45 species of trees.
   - **IoT Sensors:** 8000 samples of temperature and humidity data were collected using four different types of sensors, including static, portable with GPS, and solar-powered sensors.
   - **Drone Imaging:** 37 drone flights captured over 7000 images of the study area.

2. **Machine Learning:**
   - **Model:** XGBoost Regression Model was used to predict indoor temperature.
   - **Features:** The model considers various features such as tree species, distance to buildings, distance to water bodies, tree density, building density, and outdoor temperature.
   - **Performance:** The model achieved an R² Score of 0.8593 after hyperparameter tuning.

3. **Web Dashboard:**
   - **Frontend:** Built with React, the dashboard displays sensor data, heatmaps, a digital twin, and tree data with pictures and species information.
   - **Backend:**
     - **Flask:** Hosts the ML model for indoor temperature prediction.
     - **Node.js:** Collects and stores temperature and humidity data from sensors.
   - **Hosting:** The dashboard is live at [https://dashboard.aiaware.com.pk/](https://dashboard.aiaware.com.pk/).

4. **GIS as a Service:**
   - The system harnesses GIS to provide valuable insights across various use cases, such as identifying bio-climatic variables, insect-prone areas, heat zones, and the cooling effects of different tree species.

### Key Findings
- Certain tree species, such as **Red Bottle Brush** and **River Tea Tree**, have been identified to significantly lower temperatures.
- Trees like **Pilkhan** and **Bishop Tree** showed little to no effect on temperature mitigation.
- The ideal new building site was identified to have a cooling effect if planned at a moderate distance from existing structures.
- It was observed that tree species provide a certain cooling effect as long as they are not densely planted.

## Project Structure

### 1. **Backend - Flask**
   - Contains the code for the ML model that predicts indoor temperature.
   - Flask API endpoints serve predictions based on the input parameters.
   - Directory: `Flask-Backend/`

### 2. **Backend - Node.js**
   - Handles the collection and storage of temperature and humidity data from IoT sensors.
   - Provides APIs to fetch sensor data for the frontend dashboard.
   - Directory: `Node-Backend/`

### 3. **Frontend - React**
   - The React-based dashboard displays sensor data, heatmaps, digital twin, and tree data.
   - Integrates with both the Flask and Node.js backends to provide real-time insights.
   - Directory: `React-Frontend/`

### 4. **IoT Sensor Codes**
   - Contains the code for all types of sensors (static, portable with GPS, and solar).
   - Sensors transmit temperature and humidity data to the database.
   - Directory: `IoT_devices-arduino_codes/`

## Setup Instructions

### Prerequisites
- Python 3.x
- Node.js
- React
- PostgreSQL
- AWS Account (for hosting APIs and database)

### Installation

#### Flask Backend
1. Navigate to the `flask-backend/` directory.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the Flask server:
   ```bash
   python app.py
   ```

#### Node.js Backend
1. Navigate to the `node-backend/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Node.js server:
   ```bash
   npm start
   ```

#### React Frontend
1. Navigate to the `react-frontend/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the React development server:
   ```bash
   npm start
   ```

## Project Team

- **Project Advisor:**
  - **Name:** Dr. Salman Atif
  - **Department:** Institute of Geographical Information System, SCEE, NUST
- **Project Co-Advisor:**
  - **Name:** Ms. Ayman Aslam
  - **Department:** Institute of Geographical Information System, SCEE, NUST

### Project Members
1. **Group Leader:** 
   - **Name:** Muhammad Saad Bin Tariq
2. **Member:** 
   - **Name:** Iman Noor
3. **Member:** 
   - **Name:** Saifullah Khan Jadoon
4. **Member:** 
   - **Name:** Tahira Siddique

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to the Institute of Geographical Information System, SCEE, NUST for their support.
- Thanks to all project members for their hard work and dedication.

---

This README file should provide a clear and organized overview of your project, making it easy for others to understand and set up the system.
