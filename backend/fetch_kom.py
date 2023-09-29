import requests
import urllib3
import concurrent.futures

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def fetch_kom(segment_id_array):
    access_token = get_access_token()

    #fetcher data'en med parallelle GET requests
    with concurrent.futures.ThreadPoolExecutor() as executor:
        responses = [executor.submit(fetch_segment_data, segment_id, access_token) for segment_id in segment_id_array]

    segment_data = [response.result() for response in responses]

    return segment_data

def fetch_segment_data(segment_id, access_token):
    segment_url = f'https://www.strava.com/api/v3/segments/{segment_id}'
    headers = {'Authorization': 'Bearer ' + access_token}
    response = requests.get(segment_url, headers=headers)
    return response.json()

def get_access_token():
    auth_url = "https://www.strava.com/oauth/token"
    payload = {
        'client_id': '114363',
        'client_secret': 'a9bfc6e429eaa1ec0015f5d9d56548f555b17dbc',
        'refresh_token': 'ca0f8fe8d148c0e7205eb9c95d1aff9d24fda193',
        'grant_type': "refresh_token",
        'f': 'json'
    }
    res = requests.post(auth_url, data=payload, verify=False)
    access_token = res.json()['access_token']
    return access_token

print(fetch_kom(['4199240']))
