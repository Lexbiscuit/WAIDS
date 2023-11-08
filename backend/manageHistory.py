from flask import Blueprint, Flask, request, render_template, send_file, jsonify
import pandas as pd
import json
import matplotlib.pyplot as plt
import ipinfo
import geopandas as gpd
from pymongo import MongoClient
import os
from datetime import datetime, timedelta
import requests
import zipfile

manageHistory = Blueprint('manageHistory', __name__)

# Determine the latest timestamp and calculate timestamps for the last 5 hours
latest_timestamp = datetime.strptime("9/10/2023 19:26:02", "%d/%m/%Y %H:%M:%S")
timestamps = [latest_timestamp - timedelta(hours=i) for i in range(5)]

# Initialize a list to store image files
bar_chart_image_files = []
world_map_image_files = []

# Create a list to store paths to both bar chart and world map images
all_image_files = []

# Initialize a dictionary to store the geolocation data for each event type
event_type_geolocations = {}

# Initialize a dictionary to store the count of source IPs
ip_count = {}

client = MongoClient("localhost", 27017)
db = client.WAIDS
Aggregated_collection = db.Aggregated_collection

# Image directory
image_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "database_images"))
                         
def flatten_list(lst):
    return ', '.join(map(str, lst))

# Define a route to serve image files
@manageHistory.route('/serve_image/<int:image_index>', methods=['GET'])
def serve_image(image_index):
    # Make sure 'image_index' is within a valid range
    if image_index < 0 or image_index >= len(world_map_image_files):
        return jsonify({'error': 'Invalid image index'})

    # Construct the full path to the image file based on image_index
    script_dir = os.path.abspath(os.path.dirname(__file__))
    #image_dir = os.path.join(script_dir, "..", "frontend", "public", "database_images")
    image_filename = f"world_map_{image_index}.png"  # Adjust the filename format if needed
    image_path = os.path.join(image_dir, image_filename)

    try:
        return send_file(image_path, as_attachment=True)
    except Exception as e:
        return jsonify({'error': str(e)})
    
@manageHistory.route('/serve_zip/<zip_filename>', methods=['GET'])
def serve_zip(zip_filename):
    #image_dir = "frontend/public/database_images"
    script_dir = os.path.abspath(os.path.dirname(__file__))
    #image_dir = os.path.join(script_dir, "..", "frontend", "public", "database_images")
    zip_path = os.path.join(image_dir, zip_filename)
    
    return send_file(zip_path, as_attachment=True)


@manageHistory.route('/process_data', methods=['POST'])
def process_data():
    data = list(Aggregated_collection.find({}))
    try:
        if not data:
            print("No data found in MongoDB.")
            return "No data found in MongoDB."

        # Terminal Visualization
        df = pd.DataFrame(data).fillna('Unknown')
        print(df)

        # Find the latest timestamp in the DataFrame
        latest_timestamp = df['timestamp'].max()

        # Determine the latest timestamp and calculate timestamps for the last 5 hours
        timestamps = [latest_timestamp - timedelta(hours=i) for i in range(5)]

        # Counter for world map images
        world_map_counter = 1  # Start at 1 for the first image

        # Create bar charts for the last 5 hours
        for i, timestamp in enumerate(timestamps):
            # Filter the DataFrame to select rows within the hour's time range
            start_time = timestamp - timedelta(hours=1)
            end_time = timestamp
            hour_data = df[(df['timestamp'] >= start_time) & (df['timestamp'] <= end_time)]

            # Create a bar chart to visualize unique event_type values for the hour
            event_type_counts = hour_data['event_type'].value_counts()
            event_type_counts.plot(kind='bar')
            plt.xlabel('event_type Values')
            plt.ylabel('Count')
            plt.title(f'Event_type Values from \n{start_time} to {end_time}')

            # Specify the image save directory (one folder up from the script location)
            script_dir = os.path.abspath(os.path.dirname(__file__))
            image_dir = os.path.join(script_dir, "..", "frontend", "public", "database_images")
            if not os.path.exists(image_dir):
                os.makedirs(image_dir)  # Create the directory if it doesn't exist

            # Save the bar chart as an image in the image directory
            image_filename = f'bar_chart_{i + 1}.png'
            image_path = os.path.join(image_dir, image_filename)
            plt.savefig(image_path)
            bar_chart_image_files.append(image_path)

            # Add the bar chart image to the list
            all_image_files.append(image_path)

            plt.clf()  # Clear the current plot

##################################################################################################################

        # Create pie charts for the last 5 hours
        for i, timestamp in enumerate(timestamps):
            # Filter the DataFrame to select rows within the hour's time range
            start_time = timestamp - timedelta(hours=1)
            end_time = timestamp
            hour_data = df[(df['timestamp'] >= start_time) & (df['timestamp'] <= end_time)]

            # Filter data for event_type 'alert' and non-null 'severity'
            filtered_data = hour_data[(hour_data['event_type'] == 'alert') & hour_data['alert'].notnull()]

            # Extract severity values
            severity_values = filtered_data['alert'].apply(lambda x: x['severity'])

            # Count the occurrences of each severity value
            severity_counts = severity_values.value_counts()

            # Create a pie chart for severity distribution
            plt.pie(severity_counts, labels=severity_counts.index, autopct='%1.1f%%', startangle=140)

            # Set a title for the severity distribution pie chart
            plt.title(f"Alert Severity distribution for \n{start_time} to {end_time}")

            # Annotate the pie chart with the total count
            total_severity_count = len(filtered_data)
            plt.text(0, 0, f"Total Count: {total_severity_count}", ha='center', va='center', fontsize=12)

            # Show the pie chart
            plt.axis('equal')  # Equal aspect ratio ensures that the pie chart is drawn as a circle.

            # Specify the image save directory (one folder up from the script location)
            script_dir = os.path.abspath(os.path.dirname(__file__))
            image_dir = os.path.join(script_dir, "..", "frontend", "public", "database_images")
            if not os.path.exists(image_dir):
                os.makedirs(image_dir)  # Create the directory if it doesn't exist

            # Save the severity distribution pie chart as an image
            severity_chart_filename = f'pie_chart_{i + 1}.png'  # Adjust the filename as needed
            severity_chart_image_path = os.path.join(image_dir, severity_chart_filename)
            plt.savefig(severity_chart_image_path)
            all_image_files.append(severity_chart_image_path)
                
            plt.clf()  # Clear the current plot

##################################################################################################################
        # Calculate the timestamp for the past hour
        past_hour_timestamp = latest_timestamp - timedelta(hours=1)

        # Filter your MongoDB data for the past hour
        cursor = Aggregated_collection.find({
            "event_type": "alert",
            "timestamp": {"$gte": past_hour_timestamp, "$lt": latest_timestamp}
        })

        # Initialize a dictionary to store the count of source IPs for the past hour
        ip_count_past_hour = {}

        # Iterate through the MongoDB cursor for the past hour
        for document in cursor:
            src_ip = document.get('src_ip')
            if src_ip in ip_count_past_hour:
                ip_count_past_hour[src_ip] += 1
            else:
                ip_count_past_hour[src_ip] = 1

        # Find the source IP with the highest count in the past hour
        max_src_ip_past_hour = max(ip_count_past_hour, key=ip_count_past_hour.get)

        access_token = '59861b3ba2a013'

        # Use ipinfo.io API to get location information for the highest count IP
        ipinfo_api_url = f'https://ipinfo.io/{max_src_ip_past_hour}/json?token={access_token}'
        response = requests.get(ipinfo_api_url)
        ip_info_past_hour = response.json()

        # Print location information for the past hour
        print("For the past hour:")
        print(f"Source IP with the highest count: {max_src_ip_past_hour}")
        print(f"Location: {ip_info_past_hour.get('country')}, {ip_info_past_hour.get('region')}, {ip_info_past_hour.get('city')}, {ip_info_past_hour.get('continent')}")


##################################################################################################################

        print("Printing world Maps")
        # Generate world maps
        for i, timestamp in enumerate(timestamps):
            start_time = timestamp - timedelta(hours=1)
            end_time = timestamp
            hour_data = df[(df['timestamp'] >= start_time) & (df['timestamp'] <= end_time)]

            # Choose a specific event_type value to find corresponding data
            chosen_event_types = ['alert','anomaly']

            # Loop through the chosen event types
            for chosen_event_type in chosen_event_types:
                # Filter the DataFrame to find all rows with the chosen event type and extract IP addresses
                event_data = hour_data[hour_data['event_type'] == chosen_event_type]
                alert_ips = event_data['src_ip'].tolist()

                # Testing ipinfo
                access_token = '59861b3ba2a013'
                handler = ipinfo.getHandler(access_token)

                # Create a list to store the geolocation data for this event type
                geolocation_data = []
                for ip in alert_ips:
                    details = handler.getDetails(ip)
                    geolocation_data.append(details.all)

                event_type_geolocations[chosen_event_type] = geolocation_data

            # Create a single scatter plot for all event types on the world map
            world = gpd.read_file(gpd.datasets.get_path('naturalearth_lowres'))
            ax = world.boundary.plot(figsize=(10, 8))

            color_mapping = {
                'alert': 'red',
                'anomaly': 'green'
            }

            for event_type, geolocation_data in event_type_geolocations.items():
                geolocation_df = pd.DataFrame(geolocation_data)
                if 'longitude' in geolocation_df and 'latitude' in geolocation_df:
                    geolocation_df['longitude'] = pd.to_numeric(geolocation_df['longitude'])
                    geolocation_df['latitude'] = pd.to_numeric(geolocation_df['latitude'])
                else:
                    # Handle the case where the required columns are missing (e.g., log the issue)
                    print(f"Missing 'longitude' and 'latitude' columns for {event_type} on {start_time} to {end_time}")
                    continue

                # Plot all IP addresses for this event type
                geolocation_df.plot.scatter(x='longitude', y='latitude', s=50, ax=ax, label=f'IP Addresses for {event_type}', color=color_mapping[event_type],alpha=0.5)

            plt.title(f'IP Addresses for Alert and Anomalies on World Map from \n{start_time} to {end_time}')
            plt.legend()

            # Specify the image save directory (one folder up from the script location)
            script_dir = os.path.abspath(os.path.dirname(__file__))
            #image_dir = os.path.join(script_dir, "..", "frontend", "public", "database_images")
            if not os.path.exists(image_dir):
                os.makedirs(image_dir)  # Create the directory if it doesn't exist
            
            # Save the world map plot as an image in the script directory
            map_image_file = os.path.join(image_dir, f"world_map_{world_map_counter}.png")
            plt.savefig(map_image_file)
            world_map_image_files.append(map_image_file)
            all_image_files.append(map_image_file)

            world_map_counter += 1

            plt.clf()

            zip_filename = "images.zip"
            zip_path = os.path.join(image_dir, zip_filename)

            # Delete the existing 'images.zip' file if it already exists
            if os.path.exists(zip_path):
                os.remove(zip_path)

            with zipfile.ZipFile(zip_path, 'w') as zipf:
                for image_file in all_image_files:
                    image_filename = os.path.basename(image_file)
                    zipf.write(image_file, image_filename)

        return json.dumps({
            'message': "Bar charts and world maps created and saved.",
             #'zip_url': f'http://localhost:5000/serve_zip/{zip_filename}'
             'zip_url': f'http://159.223.47.93:5000/serve_zip/{zip_filename}'
        })

    except json.JSONDecodeError as e:
        print(f"JSON decoding error: {e}")
