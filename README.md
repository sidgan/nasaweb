# [Frontier Development Lab 2017: Long Period Comets](http://sidgan.me/nasaweb/)

In planetary defense, long period comets have remained a class by themselves. They are recognized as the potentially most devastating threat (i.e. “extinction level events”). But any new comet discovered on an impact trajectory would likely only be discovered as it passed Jupiter, just a few years before impact. However, with machine learning, meteor showers may offer a clue. The proposal: replace the data analyst in the ‘CAMS’ meteor shower survey program by deep learning algorithms and thus enable a global expansion and temporal coverage of a camera network that can detect the dust trails of those potentially hazardous long period comets that came close to Earth’s orbit in the past ten millennia.

The goal is to add years of extra warning time by providing comet searchers directions on where to look for comets when they are still far out. This task is particularly suited to a machine learning approach because of the large scale of data, the need for integration of surveys from around the globe without human intervention, and the need to operate for a long period of time.

The deep learning algorithms would be used to recognize meteors amongst false positives (e.g., satellites), and can triangulate the meteor trajectory in Earth’s atmosphere, its entry speed, and the pre-impact orbit in space through combining different camera perspectives to the same meteor.

## What this repository contains

This repository only contains the code for the new **Celestial Globe Web Portal** for CAMS data visualization. This new web tool is part of an effort by Frontier Development Lab 2017, a NASA research accelerator program at the SETI Institute, led by James Parr and Bill Diamond and supported by NVidia and IBM amongst others, that set out to use artificial intelligence techniques to automate the CAMS data reduction pipeline. The new web tool designed by Peter Jenniskens, Siddha Ganju and Leo Silverberg displays each shower radiant in sun-centered ecliptic coordinates, with a color assigned proportional to the entry speed. By hovering the cursor over a colored meteor radiant, one can see the IAU shower number. Clicking brings up a new window that shows the 2010-2016 CAMS data for that shower displayed in the planetarium program by Ian Webster. That makes the new web tool a portal to the minor showers in Webster's visualization program.

## Live at: http://meteorshowers.seti.org/ 

## Development Team

  - Please see Contributors list 

## Todo

- Adding constellations in the background for intuitive feel + reference location. Can be simple lines or illustrative. 

  Use SVG to have stars in black and lines joining them will be black too.

- Consult lookup table so the name of the shower shows in the scroll box, rather than the shower number

  Have a checkbox to remove/overlay them.

- Find a way to add lat/long coordinates to the lines if zoomed in. Fits in with animations.

- Find a way to scroll over several days of observations, to see the showers move.
 
  Have some kind of a fast forward or timelapse on the globe. So when the user clicks "next", the next days' meteors are loaded so one can view how the meteor is moving over time (day). Something similar to videos that show the movement of stars at night (example: https://www.youtube.com/watch?v=HsJxGpDmJrQ&t=09)
  UI of movement of meteors and stars: https://worldview.earthdata.nasa.gov/?v=-128.90451997335305,34.795375946677936,-115.59462762476738,41.855633184631046&t=2020-09-10-T00%3A00%3A00Z

- Find a way to make the points smaller when zoomed in, to resolve compact shower. 
Invible meteor showers may be under some other meteor showers. 
example - cragislist  https://sfbay.craigslist.org/d/apartments-housing-for-rent/search/apa

  Clustering points and unclustering them when clicked upon.

- Make website lighter

  Depending on how large the JSON data gets, it might be worthwhile hosting it on a backend server as an API rather than having a single JSON file loaded in memory.
  
- Add a slider that can take results from different models and visually see which model works better (based on results)

- limit date picker to current date (yesterday)

- should run on mobile browser

- intelligent search powered for same date on different years showing a meteor shower per year. eg geminids on 2010 - 2020.

- ability to save a snippet in video format. Eg save movement of globe from 1 Dec to 4 Dec 2020 from one fixed viewpoint. 

## Getting Started On This Repository

Here are the steps to follow in getting the web portal up and running locally;

- Clone the repository to a machine

```sh
git clone https://github.com/sidgan/nasaweb
```
or using `gihub cli`

```sh
gh repo clone https://github.com/sidgan/nasaweb
```
    
- Move into the project directory

```sh
cd nasaweb
```

- Install all dependencies needed to run the CAMS web portal react application

```sh
yarn install
```

- Wait for all the project dependecies to download completely before moving any forward. To start the development server run,

```sh
yarn start
```
  
At this point, you can open the browser and open [http://localhost:3000](http://localhost:3000) to view the CAMS web portal in development mode.

- For testing you run,

```sh
yarn test
````
    
- Finally, to build the application into the `build` directory for production mode or better known as deployment. You run,

```sh
yarn build
```

It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed!


- If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

 ```sh
 yarn eject
 ```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
