#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Mar 15 14:55:14 2021

@author: sahyadri
"""

import json
import numpy as np
import re
import argparse
import glob
import os
from datetime import date


def find_star(data):
    """
    Function to find the position of a given star (Alpheratz; could be any other)
    in a hyg.json file

    Parameters
    ----------
    data : dict
        Json object contain the hyg.json data.

    Returns
    -------
    long : float
        Longitude of the specified star in the hyg.json file.

    """
    #want to find position of a star based on its name
    features = data['features']
    names = [x['properties']['name'] for x in features]
    pos = np.where([x=='Alpheratz' for x in names])[0][0] #can change name
    long = features[pos]['geometry']['coordinates'][0]
    return long


def load_json(filepath):
    """
    Opens a json file and stores its data as a dictionary

    Parameters
    ----------
    filepath : string
        Path to the json file to be opened.

    Returns
    -------
    data : dict
        Dictionary containing data from a json file.

    """
    file =  open(filepath)
    data = json.load(file)
    return data


def calc_diff(latest_long, prev_long):
    """
    Function to calculate the shift from one day to the other. Computes the diff
    in longitudes for one star accross consecutive hyg.json files.

    Parameters
    ----------
    latest_long : float
        Longitude of selected star from latest hyg.json file.
    prev_long : float
        Longitude of selected star from previous hyg.json file.

    Returns
    -------
    diff : float
        Difference between the two longitudes.

    """
    diff = latest_long - prev_long
    return diff


def compute_coords(prev_const, diff):
    """
    Function to update the constellations by addition of the difference to the
    longitudes for all points making up a constellation. The addition checks if
    the longitude jumps above 360 or below 0 and corrects for those. It uses
    list_comprehension to update the nested list structure in the const.json
    files.

    Parameters
    ----------
    prev_const : dict
        Dictionary with previous date's constalltion data.
    diff : float
        Diff b/w longitudes of selected star accross consecutive days.

    Returns
    -------
    updated_const : dictionary
        Dictionary containing constellation points with all points updated.

    """
    for i, item in enumerate(prev_const['constellations']):
        Lines = item['points']
        # 360-long if long exceeds 360 and 360+long if long becomes -ve.
        updated_coords = [[[360-(y[0]+diff),y[1]] if y[0]+diff >= 360 
                           else [360+y[0]+diff,y[1]] if y[0]+diff < 0
                           else [y[0]+diff,y[1]] for y in x] for x in Lines]
        prev_const['constellations'][i]['points'] = updated_coords 
    updated_const = prev_const
    return updated_const


def extract_date(latest_file_name):
    filename = latest_file_name.split('/')[-1]
    filename = filename.split('_')
    month, day = filename[1], filename[2]
    year = re.split('g', filename[0], 1)[1]
    const_filename = 'const{}_{}_{}_00_00_00.json'.format(year, month, day)
    return const_filename


#added an argument parser to add choice b/w past or today modes.
parser = argparse.ArgumentParser(description='Constellation update')
parser.add_argument('opt',
                    metavar='option',
                    type=str,
                    help='Choice of run mode: "today" or "past"')
args = parser.parse_args()
option = args.opt

#loading the reference hyg.json and constellation files
ref_hyg = load_json('var/www/FDL/json/ALL/hyg2010_01_31_00_00_00.json')
prev_const = load_json('var/www/FDL/json/ALL/const_01_31_2010.json')

if option == 'today':
    #iter_list = glob.glob('var/www/FDL/json/ALL/hyg*.json')
    #iter_list = glob.glob('/home/sahyadri/Desktop/CAMS-India/hyg*.json')
    #latest_file = max(iter_list, key=os.path.getctime) #most recently created file.
    today = str(date.today())
    date_list = today.split('-')
    year, month, day = date_list[0], date_list[1], date_list[2]
    file_name = 'var/www/FDL/json/ALL/hyg{}_{}_{}_00_00_00.json'.format(year,month,day)
    print(file_name)
    latest_hyg = load_json(file_name)
    latest_long = find_star(latest_hyg)
    ref_long = find_star(ref_hyg)
    diff = calc_diff(latest_long, ref_long)
    new_const = compute_coords(prev_const, diff) #updated const json object!
    new_filename = extract_date(file_name)
    #creating a new const.json file
    new_file = open(new_filename,'w+')
    json.dump(new_const, new_file)
    new_file.close()
    
elif option == 'past':
    #for hyg_file in glob.glob('var/www/FDL/json/ALL/hyg*.json'):
    for hyg_file in glob.glob('var/www/FDL/json/ALL/hyg*.json'):
        latest_hyg = load_json(hyg_file)
        latest_long = find_star(latest_hyg)
        ref_long = find_star(ref_hyg)
        diff = calc_diff(latest_long, ref_long)
        new_const = compute_coords(prev_const, diff) #updated const json object!
        new_filename = extract_date(hyg_file)
        #creating a new const.json file
        new_file = open(new_filename,'w+')
        json.dump(new_const, new_file)
        new_file.close()
else:
    print('invalid options...write only "today" or "past"')