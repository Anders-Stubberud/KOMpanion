import requests
import data_fetch
import data_process
import urllib3
from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/data')
def data():
    return jsonify(data_process.getPartials())

if __name__ == "__main__":
    app.run(debug=True)