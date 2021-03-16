Constellation update instructions

## Instructions for constellation update script

- The constellation update script operates in one of two modes - a "past" or "today" mode
- The "past" mode is a one time run of this script. It is to be used to generate the constellations for all the previou hyg.json files. It uses the glob.glob method to iterate over all the hyg.files in a directory.
- The "today" mode is used to generate the constellations for the newest hyg.json file. It glob.globs to find all the hyg.json file and selects the one created most recently using os.path.getctime. It has been designed to be paired with a cronjob.
- Both of these modes generate constellations by comparing the newest/selected hyg.json file to a reference json file - the file for the 31st of January, 2010. It computes the difference in coordinates b/w a star in the two files, and adds this difference to the constellation file for 31st of January, 2010. Doing so, it creates a new constellation.json file.
- The choice of modes is specified as an argument to the command line code to run the constellation update python script.

  eg: `python const_update.py 'today'/'past'`

  This has been achieved through the argeparse module of python.
  
