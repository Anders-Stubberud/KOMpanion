# import requests
# import urllib3
# from flask import Flask
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# auth_url = "https://www.strava.com/oauth/token"
# activites_url = "https://www.strava.com/api/v3/segments/explore?bounds=40.4774,-74.2591,40.9176,-73.7004&activity_type=riding"

# payload = {
#     #burde egentlig ha dette som backend så ikke alle har tilgang til API token'ene mine
#     'client_id': '114363',
#     'client_secret': 'a9bfc6e429eaa1ec0015f5d9d56548f555b17dbc',
#     'refresh_token': 'ca0f8fe8d148c0e7205eb9c95d1aff9d24fda193',
#     'grant_type': "refresh_token",
#     'f': 'json'
# }

# # print("Requesting Token...\n")
# res = requests.post(auth_url, data=payload, verify=False)
# access_token = res.json()['access_token']
# # print("Access Token = {}\n".format(access_token))

# header = {'Authorization': 'Bearer ' + access_token}
# # param = {'per_page': 200, 'page': 1}
# my_dataset = requests.get(activites_url, headers=header).json()

# @app.route("/data")
# def test():
#     return(my_dataset)

# # if __name__ == "__main__":
# #     app.run(debug=True)