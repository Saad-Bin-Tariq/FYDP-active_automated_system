from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
from scipy.interpolate import griddata
from shapely.geometry import Polygon
import json
import requests
import matplotlib.pyplot as plt
import io
import base64
import pandas as pd
# model libs
from flask import Flask, request
from sklearn.model_selection import train_test_split
from xgboost import XGBRegressor
from sklearn.preprocessing import MinMaxScaler
from sklearn.compose import ColumnTransformer
from sklearn.metrics import mean_absolute_error, explained_variance_score, r2_score


app = Flask(__name__)
CORS(app)

# Load the data
data = pd.read_csv("./model_fdata1.csv")

# Separate features and target
X = data[['tree_cat', 'ot_avgtemp', 'tree_den', 'build_den', 'dis_to_bui', 'dis_to_wat']]
y = data['in_avgtemp']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Normalize the numerical features
numerical_features = ['ot_avgtemp', 'tree_den', 'build_den', 'dis_to_bui', 'dis_to_wat']
preprocessor = ColumnTransformer(transformers=[('num', MinMaxScaler(), numerical_features)],
                                 remainder='passthrough')

# Train the model
model = XGBRegressor(max_depth=2, min_child_weight=5, subsample=0.9, colsample_bytree=0.8,
                      reg_alpha=2.0, reg_lambda=2.0, n_estimators=2000, learning_rate=0.01,
                      random_state=42, importance_type='total_cover',
                      tree_method='hist')
model.fit(preprocessor.fit_transform(X_train), y_train)

@app.route('/predict', methods=['GET'])
def predict():
    # Get new data as query parameters
    tree_cat = float(request.args.get('tree_cat'))
    ot_avgtemp = float(request.args.get('ot_avgtemp'))
    tree_den = float(request.args.get('tree_den'))
    build_den = float(request.args.get('build_den'))
    dis_to_bui = float(request.args.get('dis_to_bui'))
    dis_to_wat = float(request.args.get('dis_to_wat'))

    # Create a DataFrame for the new data point
    new_data = {
        'tree_cat': [tree_cat],
        'ot_avgtemp': [ot_avgtemp],
        'tree_den': [tree_den],
        'build_den': [build_den],
        'dis_to_bui': [dis_to_bui],
        'dis_to_wat': [dis_to_wat]
    }

    new_df = pd.DataFrame(new_data)

    # Ensure the new data has the same columns and order as the training data
    new_df = new_df[X_train.columns]

    # Make a prediction for the new data
    new_prediction = model.predict(preprocessor.transform(new_df))
    new_prediction = round(float(new_prediction[0]), 2)

    # Return the prediction as a JSON response
    return json.dumps({'prediction': new_prediction})


@app.route('/api/v1/map-data/<string:sensor_type>/<string:temp>', methods=['GET'])
def get_outdoor_data(sensor_type, temp):
    # Extract start and end date parameters from the request URL
    start_year = request.args.get('start_year')
    start_month = request.args.get('start_month')
    start_day = request.args.get('start_day')
    end_year = request.args.get('end_year')
    end_month = request.args.get('end_month')
    end_day = request.args.get('end_day')

    # Make the HTTP GET request to the external API
    url = f"http://backend.aiaware.com.pk/api/v1/map-data/{sensor_type}?start_year={start_year}&start_month={start_month}&start_day={start_day}&end_year={end_year}&end_month={end_month}&end_day={end_day}"
    response = requests.get(url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Extract data from the JSON response
        data = response.json()

        # Initialize arrays to store the extracted data
        x = []
        y = []
        min_temp = []
        avg_temp = []
        max_temp = []

        # Extract data from each sensor entry in the response
        for entry in data:
            x.append(entry['longitude'])
            y.append(entry['latitude'])
            min_temp.append(entry['min_temperature'])
            avg_temp.append(entry['avg_temperature'])
            max_temp.append(entry['max_temperature'])

    
        

        vmin_temp=min(min_temp)
        vavg_temp=min(avg_temp)
        vmax_temp=min(max_temp)
    
        # JSON data
        json_data = '''
        {"type":"FeatureCollection","features":[{"type":"Feature","id":0,"geometry":{"type":"Polygon","coordinates":[[[72.995541061903396,33.654904472769488],[72.979693851604566,33.646409796978617],[72.988973749527361,33.633846242867776],[73.004749575996016,33.642055383337947],[72.995541061903396,33.654904472769488]]]},"properties":{"FID":0,"Id":0}}]}
        '''
        # Parse the JSON data
        data = json.loads(json_data)
        coordinates = data['features'][0]['geometry']['coordinates'][0]

        # Extract x and y coordinates from the JSON data
        json_x = [round(coord[0], 4) for coord in coordinates]
        json_y = [round(coord[1], 4) for coord in coordinates]
        json_x.pop()
        json_y.pop()

        # Add the JSON points to the existing data
        x.extend(json_x)
        y.extend(json_y)
        min_temp.extend([vmin_temp] * 4)
        avg_temp.extend([vavg_temp] * 4)
        max_temp.extend([vmax_temp] * 4)
        # Print the extracted data
        print("x:", x)
        print("y:", y)
        print("min_temp:", min_temp)
        print("avg_temp:", avg_temp)
        print("max_temp:", max_temp)
        print(temp)
        if temp == 'max':
            z = max_temp
        elif temp == 'avg':
            z = avg_temp
        else :
            z = min_temp
        

        # Step 2: Define the grid for interpolation
        x_min, x_max = min(x), max(x)
        y_min, y_max = min(y), max(y)
        grid_x, grid_y = np.meshgrid(np.linspace(x_min, x_max, 100), np.linspace(y_min, y_max, 100))

        # Step 3: Interpolate the data
        grid_z = griddata((x, y), z, (grid_x, grid_y), method='cubic')

        # Create a polygon from the geojson data
        geojson_data = '''
        {"type":"FeatureCollection","features":[{"type":"Feature","id":0,"geometry":{"type":"Polygon","coordinates":[[[72.995541061903396,33.654904472769488],[72.979693851604566,33.646409796978617],[72.988973749527361,33.633846242867776],[73.004749575996016,33.642055383337947],[72.995541061903396,33.654904472769488]]]},"properties":{"FID":0,"Id":0}}]}
        '''
        geojson_data = json.loads(geojson_data)
        coordinates = geojson_data['features'][0]['geometry']['coordinates'][0]
        polygon = Polygon(coordinates)

         # Step 4: Visualize the interpolated map
        plt.figure(figsize=(10, 8))

        # Plot the interpolated map
        plt.imshow(grid_z, extent=[min(x), max(x), min(y), max(y)], origin='lower', cmap='coolwarm')
        
        # Plot the GeoJSON polygon
        x_coords = [point[0] for point in coordinates]
        y_coords = [point[1] for point in coordinates]
        plt.plot(x_coords + [x_coords[0]], y_coords + [y_coords[0]], color='black')

        # Plot the original data points
        plt.scatter(x, y, c=z, cmap='coolwarm', edgecolors='k')

        # Add color bar
        plt.colorbar(label='Temperature (°C)', shrink=0.8)

        # Add labels and title
    #     plt.title('Interpolated Temperature Map')
        # Remove outline and axis labels
        plt.axis('off')
        plt.box(False)
        # Remove grid
        plt.grid(False)


        # Save the plot as an image file
        img_bytes = io.BytesIO()
        plt.savefig(img_bytes, format='png')
        img_bytes.seek(0)

        # Encode the image bytes into base64 format
        img_base64 = base64.b64encode(img_bytes.read()).decode('utf-8')

        # Generate the HTML response with the embedded image
        html_response = f'<img src="data:image/png;base64,{img_base64}" style="height: 700px;width: 820px" />'
      
        # Return the HTML response
        return html_response

    else:
        return jsonify({'error': 'Failed to fetch data from external API'}), 500

if __name__ == '__main__':
    app.run(debug=True)
