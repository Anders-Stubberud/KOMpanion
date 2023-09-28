import requests
import urllib3
from flask import Flask
from flask_cors import CORS

token = "AAPK12f0f22fbf4c4417b38d8ec96ccd5b34Sx1eaIuw5mRwzMv5Imvs-Z7LlYvbsUpgCMLzktGWeINH_ZeXo8QcMDnk-jcUO90t"
partialText = "Trondh"

url = f"https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text={partialText}&f=json&token={token}"

res = requests.get(url)

ans = res.json()

print(ans)