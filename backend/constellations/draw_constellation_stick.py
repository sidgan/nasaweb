 #!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Jan 16 23:30:56 2021

@author: sahyadri
"""
import json
from astropy import units as u
import numpy as np
from astroquery.simbad import Simbad
from matplotlib import pyplot as plt
from astropy.coordinates import SkyCoord
from astropy.time import Time

#'constellation_lines_simplified.dat.txt'
def extract_data(file_name):
    """
    The file containing data points to draw constellation stick figures can
    be found here: https://github.com/dcf21/constellation-stick-figures
    
    This text file contains the Hipparcos numbers of all stars present in the
    various constellations. This function extracts the Hipparcos numbers from
    the text file, while maintaining the data structure in the text file.
    The list structure found in the text file is maintained as it will be used
    later on to instruct python when to stop connecting points to form lines.
    In other words, it will be used to tell the plotting device when to "lift
    the drawing pen".

    Parameters
    ----------
    file_name : string
        A string containing the path to the Github constellation data.

    Returns
    -------
    list_of_lists : list
        A list-of-lists containing the Hipparcos numbers of all stars that
        make up the constellations in the night sky.

    """
    file = open(file_name)
    readout = file.readlines()
    
    find_lists = [x.find('[') for x in readout] #This finds all lists
    indices = np.where(np.array(find_lists)!=-1)[0]#Select all lists
    #Need to convert strings to pure lists. This also involves removing any tags
    list_of_lists = [eval(readout[i].strip('\n')) for i in indices]
    return list_of_lists


def change_list_entries(lst):
    """
    This function removes all asterisks found in the input list "lst".
    
    Some of the entries in the list-of-lists obtained from the github file
    contain asterisks. These characters will cause problems when obtaining
    coordinates from SIMBAD. Thus all asterisks must be removed.
    
    Parameters
    ----------
    lst : list
        The list of Hipparcos numbers from the github constellation file.

    Returns
    -------
    remove_asterisk : list
        The list of Hipparcos numbers without any junk characters.

    """
    #Asterisks are to be removed. Done using strip.
    remove_asterisk = [[x.strip('*') for x in y] for y in lst]
    return remove_asterisk

        
def setup_simbad():
    """
    This function initialises an instance of the Simbad class of Astroquery.
    In addiition to this, it specifies the fields that will be downloaded from
    SIMBAD. It also raises the timeout limit for the SIMBAD server.
    
    RECOMMENDED: Leave the settings/parameters for this function as they are.

    Returns
    -------
    None.

    """
    Simbad.reset_votable_fields() #Removes existing columns
    #To obtain data with only ra and dec as columns
    Simbad.add_votable_fields('ra(d;ICRS;J2000)','dec(d;ICRS;J2000)')
    Simbad.TIMEOUT = 1000000 #To give ample time for simbad to process


def flatten_list(lst):
    """
    This function converts a list of lists into a simple list. This process
    "flattens" the existing nested-list structure. The outputs of this
    flattening are two lists. The first list is the flattened list. The second
    is a list containing integers. These integers indicate the number of
    elements which were part of each nested list. This second list will help
    reconstruct the list-of-lists structure later on.
    

    Parameters
    ----------
    lst : list
        A list, nested within which are more lists - a list of lists.
        Each list contains HIP numbers of stars making up the constellation
        stick figures.

    Returns
    -------
    flat_list : list
        DESCRIPTION.
    list_divisions : TYPE
        DESCRIPTION.

    """
    #First got to store the list indices.
    #Indices stored below used later to reconstruct list-of-lists
    list_divisions = [len(x) for x in lst]

    #now flatten the list. Helps with things later on
    flat_list = [item for nested in lst for item in nested]
    return flat_list, list_divisions


def obtain_points(lst):
    """
    This function uses the Astroquery module for the SIMBAD database. It
    uses the HIP numbers fed as an input list, and obtians the Right 
    Ascension (RA) and Declination (Dec) coordinates of an object from SIMBAD.
    The coordinates are returned as two separate lists.
    

    Parameters
    ----------
    lst : list
        List containing HIP numbers of stars making up the constellation
        stick figures. Obtained from (filename).

    Returns
    -------
    ra : list
        List containing Right Ascension coordinate of all stars in the
        constellation stick figures. Obtained from Simbad.
    dec : list
        List containing Declinitation coordinate of all stars in the
        constellation stick figures. Obtained from Simbad.

    """
    hip_id = ["HIP {}".format(x) for x in lst]#Append identifier to number
    query = Simbad.query_objects(hip_id)#Search for objects in list
    #Query returns ra and dec. Store these as lists.
    ra = [x['RA_d_ICRS_J2000'] for x in query] #List containing ra
    dec = [x['DEC_d_ICRS_J2000'] for x in query] #List containing dec
    return ra, dec


def plot_points(lat, long, index_list):
    """
    This function plots all the constellations. It uses two lists -
    one with the coordinates to plot, and one with the integers
    to iterate over.

    Parameters
    ----------
    lat : list
        List containing latitude values.
    long : list
        List containing longitude values.
    index_list : list
        A list of integers which indicate reset of plot (?)

    Returns
    -------
    None.

    """
    start = 0 #Initialise a variable. Use this to reconstruct list of lists
    fig = plt.figure(figsize=(15,10),dpi=120) #Can change
    ax = fig.add_subplot(111, facecolor=('white'))
    for stop in index_list:
        latitude = [x for x in lat[start:start+stop]]
        longitude = [x for x in long[start:start+stop]]
        start += stop #To start of where left off
        ax.plot(longitude,latitude,'g-',linewidth=1.,)
    ax.set_xlabel(r'Ecliptic Longitude ($\lambda$)')
    ax.set_ylabel(r'Ecliptic Latitude ($\beta$)')
    ax.set_title('Constellation Stick Figures')
    ax.grid(color='lightgrey', linestyle='--')
    plt.savefig('Sample_constellations.png')


def shift_coords(ra, dec, solar_longitude):
    """
    This function first converts coordinates from Ra, Dec (also called the
    ICRS system) to Sun-centered Ecliptic Longitude and Ecliptic Latitude.
    After this, the function shifts the coordinates by an ammount given by
    the input "solar_longitude". This compensates for the day and time of the
    year.

    Parameters
    ----------
    ra : list
        List containing Right Ascension of constellation points.
    dec : list
        List containing Declination of constellation points.
    solar_longitude : float
        A float that serves as a proxy of date and time of the year.
        Used to correct longitude in accordance with date and time of year.

    Returns
    -------
    lat : list
        List containing converted ecliptic latitude values.
    long : list
        List containing converted ecliptic longitude values.

    """
    obstime = Time('2021-01-24T00:00:00')#May not be required
    #A skycoord object is made in order to perform a coordinate transformation
    coord_icrs = SkyCoord(ra, dec, unit=(u.deg,u.deg), frame='icrs',
                         obstime = obstime, distance=1*u.AU, equinox='j2000')
    #Transforming to sun centered ecliptic coordinates
    new_coords = coord_icrs.transform_to('barycentrictrueecliptic')
    #Shift longitude to account for time of the year.
    long = [(solar_longitude - x) for x in new_coords.lon.deg]
    #If a longitude is negative, add 360 to get actual longitude
    long = [(360+x) if x<0 else x for x in long]
    #Get the latitude. Latitude needs no correction
    lat = [x for x in new_coords.lat.deg]
    return lat, long
    
#BELOW FUNCTION SHOULD BE MODIFIED AS PER REQUIREMENT
def download_points(lat, long, index_list):
    """
    This function writes the latitude and longitude points as lists of lists.
    The final txt file will be used by the UI.
    NOTE: This function can be modified to output something other than a 
    text file.

    Parameters
    ----------
    lat : list
        List containing latitudes of constellation points.
    long : list
        List containing longitudes of constellation points.
    list_index : list
        List containing indices neccessary to reconstruct list-of-lists.
    download_path : string
        Destination for download of text file containing constellation points.

    Returns
    -------
    None.

    """
    start = 0
    output = open("const_data.json", "w+")
    for stop in index_list:
        coord = [(lat[i],long[i]) for i in range(start,start+stop)]
        string = json.dumps(coord)
        output.write('{}\n'.format(string))
        start += stop
        

data = extract_data('constellation_lines_simplified.dat')
data = change_list_entries(data)

setup_simbad()

flat_list, list_indices = flatten_list(data)

ra, dec = obtain_points(flat_list)

lat, long = shift_coords(ra, dec, 303.712233043459)

plot_points(lat, long, list_indices)

download_points(lat, long, list_indices)
