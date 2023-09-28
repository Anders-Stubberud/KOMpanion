import requests
import data_fetch
import data_process
import urllib3
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

@app.route('/data', methods=['GET'])    
def test():
    # param1 = request.args.get(param1)
    # param2 = request.args.get(param2)

    #sende til prosessering
    # print(param1 + "\n" + param1)
    if request.args.get("param3") == None : print("oke") 
    return("dette er en testetest")

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5001, debug=True)