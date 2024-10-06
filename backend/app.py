# app.py
from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS
import requests
from download_data import download_file
import json
from gpt import call_chad
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return "Flask backend is running!"

# Route to serve rodent_379.json
@app.route('/api/rodent/379', methods=['GET'])
def get_rodent_379():
    try:
        rodent_data_path = os.path.join('rodent_data', 'rodent_379.json')  # Adjust path as needed
        with open(rodent_data_path, 'r') as file:
            data = json.load(file)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to serve rodent_665.json
@app.route('/api/rodent/665', methods=['GET'])
def get_rodent_665():
    try:
        rodent_data_path = os.path.join('rodent_data', 'rodent_665.json')  # Adjust path as needed
        with open(rodent_data_path, 'r') as file:
            data = json.load(file)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint to fetch metadata from NASA
@app.route('/api/metadata', methods=['GET'])
def fetch_metadata():
    url = "https://osdr.nasa.gov/osdr/data/osd/files/379"
    headers = {
        "Content-Type": "application/json"
    }
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            json_data = response.json()
            zip_path = None
            zip_name = None
            # Extracting the remote zip path from NASA API request
            for file in json_data['studies']['OSD-379']['study_files']:
                if file['category'] == 'Study Metadata Files':
                    zip_path = file['remote_url']
                    zip_name = file['file_name']
                    break
            # Download the zip and extract
            chad_json = None
            if zip_name and zip_path:
                download_file(f'https://osdr.nasa.gov{zip_path}', "database", zip_name)
                path_name = "database/"+zip_name.split('.')[0]
                print(path_name)
                chad_json = call_chad(path_name)
            if chad_json:
                return(chad_json)
            else:
                return jsonify(response.json())
        else:
            return jsonify({"error": f"Error: {response.status_code}"}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/rodent_379', methods=['GET'])
def fetch_rodent_one_json():
    data = json.load(open('rodent_data/rodent_379.json'))
    return jsonify(data)

@app.route('/rodent_665', methods=['GET'])
def fetch_rodent_two_json():
    data = json.load(open('rodent_data/rodent_665.json'))
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
