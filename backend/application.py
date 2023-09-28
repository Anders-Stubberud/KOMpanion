import requests
import get_segments
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
    print(location + "   application")
    if location : return jsonify(fetch_coordinates.fetch_coordinates(location))
    return jsonify({'error': 'Location parameter is missing'})

if __name__ == "__main__":
    app.run(debug=True)