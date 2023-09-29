import requests
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
def fetch_segments():
    auth_url = "https://www.strava.com/oauth/token"
    activites_url = f'https://www.strava.com/api/v3/segments/4199240/leaderboard'

    payload = {
        #burde egentlig ha dette som backend så ikke alle har tilgang til API token'ene mine
        'client_id': '114363',
        'client_secret': 'a9bfc6e429eaa1ec0015f5d9d56548f555b17dbc',
        'refresh_token': 'ca0f8fe8d148c0e7205eb9c95d1aff9d24fda193',
        'grant_type': "refresh_token",
        'f': 'json'
    }

    res = requests.post(auth_url, data=payload, verify=False)
    access_token = res.json()['access_token']

    header = {'Authorization': 'Bearer ' + access_token}
    my_dataset = requests.get(activites_url, headers=header).json()
    return my_dataset

print(fetch_segments())
