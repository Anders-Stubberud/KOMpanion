import requests
import fetch_segments
import fetch_coordinates
import urllib3
from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route('/api/test')
def testing():
    return "teste"

@app.route('/api/fetch_coordinates')
@cross_origin()
def fetch_coordinates_func():
    location = request.args.get('location')
    if location : return jsonify(fetch_coordinates.fetch_coordinates(location))
    else: return jsonify({'error': 'Location parameter is missing'})

@app.route('/api/fetch_segments')
@cross_origin()
def fetch_segments_func():
    latitude = request.args.get('latitude')
    longtitude = request.args.get('longtitude')
    radius = request.args.get('radius')
    if latitude and longtitude and radius: return jsonify(fetch_segments.fetch_segments(latitude, longtitude, radius))
    else: return jsonify({'error': 'coordinates and/or radius parameters missing'})

if __name__ == "__main__":
    app.run(debug=True)