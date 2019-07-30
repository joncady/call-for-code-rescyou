from django.db import models
import requests
from urllib.parse import urlencode
from rest_framework.response import Response
import json

url_map = {
    "earthquakes": "<earthquake-endpoint>/predictions",
    "hurricane_atlantic": "<atlantic-hurricane-endpoint>/predictions",
    "hurricane_pacific": "<pacific-hurricane-endpoint>/predictions",
    "fire": "<fire-endpoint>/predictions"
}

apikey =  "<api-key>"
instance_id = "<instance-id>"
token = None
refresh_token = None


def get_score(lat, lon, disaster_type):
    global token
    if token is None:
        token = get_new_token()
    payload = prepare_request(lat, lon)
    url = url_map.get(disaster_type)
    headers = { 
        "Authorization": "Bearer" + token,
        "ML-Instance-ID": instance_id    
    }
    result = requests.post(url, data=json.dumps(payload), headers=headers)
    if result.status_code == 401:
        token = refresh_expired_token()
        headers['Authorization'] = 'Bearer ' + token
        result = requests.post(url, data=json.dumps(payload), headers=headers)
    data = result.json()
    return Response(data)

def get_new_token():
    global refresh_token
    url     = "https://iam.bluemix.net/identity/token"
    headers = { 
        "Content-Type" : "application/x-www-form-urlencoded",
        "Accept": "application/json"
    }
    data    = "apikey=" + apikey + "&grant_type=urn:ibm:params:oauth:grant-type:apikey"
    response  = requests.post(url, headers=headers, data=data)
    token = response.json()["access_token"]
    refresh_token = response.json()["refresh_token"]
    return token

def prepare_request(latitude, longitude):
    payload = {
	    "input_data": [
		    {
			    "fields": ["Latitude", "Longitude"],
			    "values": [[latitude, longitude]]
		    }
	    ]
    }
    return payload

def refresh_expired_token():
    global refresh_token
    url = "https://iam.bluemix.net/identity/token"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
    }
    data = urlencode({
        'apiKey': apikey,
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token
    })
    response = requests.post(url, headers=headers, data=data)
    token = response.json().get('access_token')
    refresh_token = response.json().get('refresh_token')
    return token