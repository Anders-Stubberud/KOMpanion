import requests

def fetch_coordinates(location):
    print(location)
    url = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates'
    params = {
        'f': 'json',
        'singleLine': location, 
        'outFields': '*',  
        'maxLocations': 1,
        'token': 'AAPK12f0f22fbf4c4417b38d8ec96ccd5b34Sx1eaIuw5mRwzMv5Imvs-Z7LlYvbsUpgCMLzktGWeINH_ZeXo8QcMDnk-jcUO90t'
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        if 'candidates' in data and data['candidates']:
            latlon = data['candidates'][0]['location']
            latitude = latlon['y']
            longitude = latlon['x']
            return str(latitude) + '\n' + str(longitude)
        return "no candidates"
    return "api machine broke"
