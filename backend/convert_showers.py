# The purpose of this python script is to convert the data in the showers text file to json
import json

output = {'0': 'Non-shower'}

file = open('showers.txt', 'r')

data = file.readlines()

for i in range(1, len(data)):
    state = data[i].split('\t')

    number = state[0]
    name = state[2].strip('\n')
    output.update({
        number: name
    })


with open('showers.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=4)

