import re
import requests
import urllib3
import pandas as pd
import estimate_wattage
import concurrent.futures

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

loaded_data = None

def fetch_kom(segment_id_array):
    access_token = get_access_token()
    #fetcher data'en med parallelle GET requests
    with concurrent.futures.ThreadPoolExecutor() as executor:
        responses = [executor.submit(fetch_segment_data, segment_id, access_token) for segment_id in segment_id_array]
    segment_data = [response.result() for response in responses]
    segment_data_with_value = [(segment, segment_difficulty(segment)) for segment in segment_data]
    segments_sorted = sorted(segment_data_with_value, key=lambda x: x[1][0])
    return segments_sorted

def segment_difficulty(segment):
    distance = float(segment['distance'])
    average_grade =  float(segment['average_grade'])
    kom_time_string = segment['xoms']['kom']
    kom_time = time_to_seconds(kom_time_string)
    wattage = estimate_wattage.estimate_average_wattage(kom_time, distance, average_grade)
    return (aquire_percentage(wattage, kom_time), beat_by_five(kom_time, distance, average_grade))

def load_data():
    global loaded_data
    if loaded_data is None:
        df = pd.read_csv('power curve.csv')
        df.iloc[0, 1:] = df.iloc[0, 1:].astype(float)
        loaded_data = df.values

#kan implementere binary search i tids-raden og watt-kolonnen for å bruke mindre tid
def aquire_percentage(wattage, time):
    load_data()
    matrix = loaded_data
    if time <= 5:
        time_column = 1
    elif time >= 3600:
        time_column = 3596
    else:
        for i in range(2, 3596):
            if matrix[0][i] == time:
                time_column = i
                break
    for i in range(1, len(matrix)):
        if wattage >= matrix[i][time_column]:
            return int(matrix[i][0])
    return 0

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

def beat_by_five(seconds, meters, grade):
    new_time = seconds * 0.95
    return (int(estimate_wattage.estimate_average_wattage(new_time, meters, grade)), seconds_to_time(new_time))


def time_to_seconds(time_str):
    if 's' in time_str:
        seconds = int(re.search(r'\d+', time_str).group())
        return seconds
    if ':' in time_str:
        parts = time_str.split(':')
        if len(parts) == 2:
            minutes, seconds = map(int, parts)
            return minutes * 60 + seconds
        elif len(parts) == 3:
            hours, minutes, seconds = map(int, parts)
            return hours * 3600 + minutes * 60 + seconds
    return 0

def seconds_to_time(seconds):
    seconds = int(seconds)
    if seconds < 60:
        return f"{seconds}s"
    elif seconds < 3600:
        minutes = seconds // 60
        remaining_seconds = seconds % 60
        return f"{minutes:02}:{remaining_seconds:02}"
    else:
        hours = seconds // 3600
        remaining_seconds = seconds % 3600
        minutes = remaining_seconds // 60
        remaining_seconds %= 60
        return f"{hours}:{minutes:02}:{remaining_seconds:02}"

