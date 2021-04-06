import requests
import json

url = "https://meteorshowers.seti.org/api/star"

headers = {
    'content-type': 'application/json',
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': True,
}

response = requests.request("GET", url)
data = json.loads(response.data)

print(data)
