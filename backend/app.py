# app.py
from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return "Flask backend is running!"

# Endpoint to fetch metadata from NASA
@app.route('/api/metadata', methods=['GET'])
def fetch_metadata():
    url = "https://osdr.nasa.gov/osdr/data/osd/files/87"
    headers = {
        "Content-Type": "application/json"
    }
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({"error": f"Error: {response.status_code}"}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
