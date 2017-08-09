import json
import math

with open('hyg.json') as data_file:    
    data = json.load(data_file)

#get generation date from star file 
#compare with generation date from meteor file 
#should be equal 

calculated_data = data

#Alpheratz

pi = math.pi
epsilon = float(23.0 + float(26.0/60.0) + float(21.448/3600.0))*float(pi/180.0)

for index in range(len(data[u'features'])):
	ra1 = data[u'features'][index][u'geometry'][u'coordinates'][0]
	dec1 = data[u'features'][index][u'geometry'][u'coordinates'][1]

	alpha = float(ra1+180.0) * pi/180.0
	delta = float(dec1 * pi/180.0)


	sb = float(math.sin(delta)*math.cos(epsilon) - math.cos(delta)*math.sin(epsilon)*math.sin(alpha))

	ch1 = float((math.cos(delta) * math.cos(alpha) ) /math.cos(math.asin(sb)))
	ch2 = float((math.cos(delta)*math.sin(alpha)*math.cos(epsilon) + math.sin(delta)*math.sin(epsilon))/math.cos(math.asin(sb)))

	l = float(math.atan2(ch2,ch1))
	b = float(math.asin(sb))
	
	l = float(l*(-180.0/pi))
	b = float(b*(180.0/pi))

	if l < 0 :
		l += 360.0
	if l > 360 :
		l -= 360.0

	calculated_data[u'features'][index][u'geometry'][u'coordinates'][0] = l
	calculated_data[u'features'][index][u'geometry'][u'coordinates'][1] = b

json.dump( calculated_data, open( "lambda_beta.json", "wb" ) )
