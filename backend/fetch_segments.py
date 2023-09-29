import requests
import urllib3
import math

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
def fetch_segments(latitude, longtitude, radius):
    auth_url = "https://www.strava.com/oauth/token"
    #c definerer koordinater til nedre venstre hjørne og øvre høyre hjørne
    c = segment_search_box(latitude, longtitude, radius)
    activites_url = f'https://www.strava.com/api/v3/segments/explore?bounds={c[0]},{c[1]},{c[2]},{c[3]}&activity_type=riding'

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
    segments = my_dataset['segments']

    return [segment['id'] for segment in segments]

#strava sin API tar nedre venstre hjørne og øvre høyre hjørne som definisjon av søkeområde,
#dermed blir det ikke helt nøyaktig å representere dette med en radius, 
#men det blir lettere for brukere og det tillater fremdeles justering av område
def segment_search_box(center_lat, center_lon, radius_km):
    center_lat, center_lon, radius_km = float(center_lat), float(center_lon), float(radius_km)
    earth_radius = 6371.0
    center_lat_rad = math.radians(center_lat)
    angular_radius = radius_km / earth_radius
    lat_diff = math.degrees(angular_radius)
    lon_diff = math.degrees(angular_radius / math.cos(center_lat_rad))
    lower_left_lat = center_lat - (lat_diff / 2)
    lower_left_lon = center_lon - (lon_diff / 2)
    upper_right_lat = center_lat + (lat_diff / 2)
    upper_right_lon = center_lon + (lon_diff / 2)
    return [lower_left_lat, lower_left_lon, upper_right_lat, upper_right_lon]

print(fetch_segments(60.79391, 11.07599, 10))