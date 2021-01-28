# CAMS-web

# Contellation Stick Figures

This constellation drawing program uses data from the Github repository [https://github.com/dcf21/constellation-stick-figure](https://github.com/dcf21/constellation-stick-figures.)s.

This repository contains the program (link). This is a python program that iterates over the constellation data to generate a set of plots and data points suitable for the CAMS project.

This program contains has been designed to consist of a set of easy-to-modify python functions.

***
## Requirements
This program uses the following modules:
- Astropy
- Asroquery
- Numpy
- Matplotlib

***
## Extracting data

The function `extract_data` takes the name of the Github constellation data file as an argument, and stores this data as a variable. The data in the original file has been formatted such that each list represents a set of points to be connected by a line. A change in list indicates that the drawing device must stop drawing the current line and start a new line.

Each list consists of a unique ID of the stars to join with a line. This unique ID is called the Hipparcos number. This Hipparcos number will be converted into a set of coordinates.

The `extract_data` function finds all lines in the data with lists, and stores these lists as a list of lists. This is done to preserve the structure of the data.

***

## Cleaning and Reformatting data

The `remove_asterisk` function removes any asterisks found in the lists obtained from the constellation data file. These asterisks were added to the unique IDs to indicate that the particular star did not belong to the constellation it was being drawn with.

For simplicity of use for later functions, the list of lists is flattened into a single list. The information on the nested structure of this list of lists is retained as a list of integers. The integers indicate the length of each nested list, and is used to reconstruct the list of lists later on.

The `flatten_list` function flattens the list of lists through a simple list comprehension.

***
## Obtain Coordinates

In order to plot constellations, a set of coordinates is needed. These are obtained by using the Hipparcos numbers. 

The Hipparcos numbers are fed into a database called SIMBAD. SIMBAD is a astronomical data base that allows for viewing data on astronomical objects from various different sources. The SIMBAD database is accessed through the Simbad class of Astroquery. Astroquery is a python package that allows construction of queries to various databases. SIMBAD is used to obtain the Right Ascension (RA) and Declination (Dec) of all stars.

The `setup_simbad` function opens an instance of the Simbad class and adjusts certain parameters. The `obtain_points` function can then be used to obtain the RA and Dec of all stars through their Hipparcos Numbers.
***
## Correcting Coordinates
The CAMS project requires coordinates in a sun-centered ecliptic coordinate system. In the CAMS visualisation, this is represented with the Sun fixed at the origin of a globe/celestial sphere. Thus to meet the CAMS project's requirements, stellar coordinates must be updated.

First the coordinates are converted from RA and Dec (called the ICRS system) to the Ecliptic Latitude and Longitude. This accomplished using the Astropy module. The astropy coordinates class allows generating an object called a SkyCoord object. This object can be easily converted to a new coordinate system using the `transform_to` method.

Ecliptic coordinates on their own represent a system where the stars are stationary and the sun moves in the sky, owing to the Earth's motion around the sun. But the CAMS project keeps the sun fixed. As a result, the visualisation compensates by moving the stars every day. This results in a daily change in the longitude of stars. This is compensated for by subtracting the longitude from a quantity called the Solar Longitude, which serves as a proxy for time of the year.

These corrections are accomplished by the `shift_coords` function. This function is fed the RA, Dec and Solar longitude, and returns the corrected latitude and longitude coordinates.
***
## Plotting
The latitude and Longitude are plotted using the `plot_points` function. This function uses a for loop iterating over the list of integers obtained from the flatten function. This allows the python to plot with the nested list structure in mind. This function uses matplotlib to generate plots. The output is given below:



![Sample_constellations.png](https://github.com/SahyadriDK/CAMS-web/blob/main/Sample_constellations.png)


**Some comments on the plot:**
- The long horizontal lines are due to the fact that neighbouring points (0 and 359) are at the ends of the plot. This will correct itself when plotted on a sphere.
- The constellations near the top and botton are distorted. This due to prjection of a sphere onto a rectangular surface. This also fixes itself on a sphere.

## Acknowledgements

This program uses data made available on Github by Dominic Ford ([https://github.com/dcf21/constellation-stick-figures](https://github.com/dcf21/constellation-stick-figures)).
