import json
from pprint import pprint

with open('hyg.json') as data_file:    
    data = json.load(data_file)

calculated_data = data
'''
import matlab.engine
eng = matlab.engine.start_matlab()
t = eng.gcd(100.0,80.0,nargout=3)
print(t)
'''
import matlab.engine
eng = matlab.engine.start_matlab()

for index in range(len(data[u'features'])):
	ra1 = data[u'features'][index][u'geometry'][u'coordinates'][0]
	dec1 = data[u'features'][index][u'geometry'][u'coordinates'][1]
	#print ra1, dec1
	#call matlab script from here
	l,b = eng.equat2eclip(ra1, dec1,nargout=2)
	print ra1, dec1 , l, b
	calculated_data[u'features'][index][u'geometry'][u'coordinates'][0] = l 
	calculated_data[u'features'][index][u'geometry'][u'coordinates'][1] = b 
#json.dump('lambda_beta.json', calculated_data)
json.dump( calculated_data, open( "lambda_beta.json", "wb" ) )



'''
u'features': [{u'geometry': {u'coordinates': [-179.6006208, -77.06529438],
                              u'type': u'Point'},
                u'properties': {u'color': u'1.254',
                                u'mag': 4.78,
                                u'name': u''},
                u'type': u'Feature'},
'''