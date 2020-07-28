# [Frontier Development Lab 2017: Long Period Comets](http://sidgan.me/nasaweb/)

In planetary defense, long period comets have remained a class by themselves. They are recognized as the potentially most devastating threat (i.e. “extinction level events”). But any new comet discovered on an impact trajectory would likely only be discovered as it passed Jupiter, just a few years before impact. However, with machine learning, meteor showers may offer a clue. The proposal: replace the data analyst in the ‘CAMS’ meteor shower survey program by deep learning algorithms and thus enable a global expansion and temporal coverage of a camera network that can detect the dust trails of those potentially hazardous long period comets that came close to Earth’s orbit in the past ten millennia.

The goal is to add years of extra warning time by providing comet searchers directions on where to look for comets when they are still far out. This task is particularly suited to a machine learning approach because of the large scale of data, the need for integration of surveys from around the globe without human intervention, and the need to operate for a long period of time.

The deep learning algorithms would be used to recognize meteors amongst false positives (e.g., satellites), and can triangulate the meteor trajectory in Earth’s atmosphere, its entry speed, and the pre-impact orbit in space through combining different camera perspectives to the same meteor.

## What this repository contains

This repository only contains the code for the new **Celestial Globe Web Portal** for CAMS data visualization. This new web tool is part of an effort by Frontier Development Lab 2017, a NASA research accelerator program at the SETI Institute, led by James Parr and Bill Diamond and supported by NVidia and IBM amongst others, that set out to use artificial intelligence techniques to automate the CAMS data reduction pipeline. The new web tool designed by Peter Jenniskens, Siddha Ganju and Leo Silverberg displays each shower radiant in sun-centered ecliptic coordinates, with a color assigned proportional to the entry speed. By hovering the cursor over a colored meteor radiant, one can see the IAU shower number. Clicking brings up a new window that shows the 2010-2016 CAMS data for that shower displayed in the planetarium program by Ian Webster. That makes the new web tool a portal to the minor showers in Webster's visualization program.

## ToDo

- Adding constellations, seasonal changes, etc:

  Use SVG to have stars in black and lines joining them will be black too.

- Consult lookup table so the name of the shower shows in the scroll box, rather than the shower number

  Have a checkbox to remove/overlay them.

- Find a way to add lat/long coordinates to the lines if zoomed in. 

- Find a way to scroll over several days of observations, to see the showers move.
 
  Have some kind of a fast forward or timelapse on the globe. So when the user clicks "next", the next days' meteors are loaded so one can view how the meteor is moving over time (day). Something similar to videos that show the movement of stars at night (example: https://www.youtube.com/watch?v=HsJxGpDmJrQ&t=09)

- Find a way to make the points smaller when zoomed in, to resolve compact showers

  Clustering points and unclustering them when clicked upon.

- Make website lighter

  Depending on how large the JSON data gets, it might be worthwhile hosting it on a backend server as an API rather than having a single JSON file loaded in memory.
