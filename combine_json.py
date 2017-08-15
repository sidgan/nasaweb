import json
from pprint import pprint

filename = "2017_12_14_00_00_00"

folders = ['Arizona','LOCAMS', 'Benelux','cams', 'Brazil', 'Florida', 'Maryland' , 'NewZealand', 'SouthAfrica', 'UAE']

path = "json/"

combined = {}


def get_json(path):
	print path
	with open(path) as data_file:    
		data = json.load(data_file)
	return data

def combine(data):
	global combined
	if not combined:
		combined = data
	else:
		l = combined[u'features']
		l.append(data[u'features'])
		combined[u'features'] = l

for each_folder in folders:
	data = get_json(path + each_folder + "/" + filename + ".json")
	combine(data)


with open(path+"combined_"+filename+".json", 'w') as outfile:
    json.dump(combined, outfile)