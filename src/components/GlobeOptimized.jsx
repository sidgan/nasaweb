import React, { useEffect, useRef } from 'react';
import { geoOrthographic, geoPath, geoGraticule10 } from 'd3-geo';
import { scaleLinear } from 'd3-scale';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';
import { feature } from 'topojson';
import { fetchLand } from '../clients/land';
import { useNavigationState } from '../contexts/navigation';
import debounce from 'lodash.debounce';

//
// Configuration
//

const colorScale = scaleLinear()
  .domain([0, 7, 17, 27, 37, 47, 57, 67, 120])
  .range([
    'rgb(255,255,255)',
    'rgb(160,32,240)',
    'rgb(0,0,255)',
    'rgb(0,165,255)',
    'rgb(0,255,0)',
    'rgb(255,255,0)',
    'rgb(255,165,0)',
    'rgb(255,0,0)',
  ]);

//  TODO: star scale
const starSizeScale = scaleLinear()
  .domain([-20, -10, 10, 15, 25, 30, 40, 50, 70])
  .range([1.85, 1.8, 1.76, 1.65, 1.52, 1.24, 1.22, 1.21]);

// scale of the globe (not the canvas element)
const scaleFactor = 0.8;
// autorotation speed
const degPerSec = 6;
// colors
const colorLand = '#111';
// const colorGraticule = '#070c26';
const colorGraticule = 'rgb(2, 12, 38, 0.2)';
const matchPrecision = 1.5;
const matchPrecisionStar = 0.5

export default function GlobeOptimized(props) {
  const { meteors, stars, constellations } = useNavigationState();

  const globeAttributes = useRef({
    // geometrics
    width: window.innerWidth,
    height: window.innerHeight,
    // data
    land: null,
    meteorCollection: new Map(),
    meteorCoordinates: [],
    meteorProperties: [],
    starCollection: [],
    constellationCollection: [],
    // projection
    projection: geoOrthographic().precision(0.1),
    rotation: null,
    // mouse hover properties
    clientX: null,
    clientY: null,
    // tracking object
    meteorIndex: null,
    starIndex: null,
    constellationIndex: null,
    current_x: null,
    current_y: null,
    is_clicked: 0,
  });

  // render function
  function render() {
    const {
      width,
      height,
      land,
      projection,
      rotation,
      meteorCollection,
      meteorCoordinates,
      meteorProperties,
      starCollection,
      constellationCollection,
      meteorIndex,
      starIndex,
      constellationIndex,
      clientX,
      clientY,
      is_clicked,
    } = globeAttributes.current;
    //
    // Variables
    //
    const canvas = select('#globe');
    const context = canvas.node().getContext('2d');

    const water = { type: 'Sphere' };
    const graticule = geoGraticule10();
    //globeAttributes.current.is_clicked = 0;
    // canvas attrs
    canvas.attr('width', width).attr('height', height);

    // scale
    projection
      .scale((scaleFactor * Math.min(width, height)) / 2)
      .translate([width / 2, height / 2])
      .clipAngle(90);

    const path = geoPath(projection, context).pointRadius(2);

    function fill(obj, color, size = 2) {
      const currentPath = path.pointRadius(size);
      context.beginPath();
      currentPath(obj);
      context.fillStyle = color;
      context.fill();
    }

    function stroke(obj, color) {
      context.beginPath();
      path(obj);
      context.strokeStyle = color;
      context.stroke();
    }

    function fillText(text, coordinate) {
      context.beginPath();
      context.fillStyle = 'white';
      context.font = '12px Arial';
      context.fillText(text, coordinate[0], coordinate[1]);
    }

    function drawMeteorTooltip(meteorProps) {
      const { iau, name, velocg, sol, lat, lng } = meteorProps;
      const position = {
        x:
          globeAttributes.current.width -
          globeAttributes.current.width / 2 -
          (scaleFactor *
            Math.min(
              globeAttributes.current.width,
              globeAttributes.current.height
            )) /
            2 -
          278,
        y:
          globeAttributes.current.height -
          globeAttributes.current.height / 2 -
          113,
      };
      roundedRect(
        context,
        position.x,
        position.y,
        298,
        226,
        4,
        'rgba(7, 12, 38, 0.8)'
      );
      context.fillStyle = 'white';
      context.font = '20px Roboto Mono';
      context.textBaseline = 'top';
      context.fillText(name, position.x + 16, position.y + 24);
      context.font = '12px Roboto Condensed';
      context.fillText(`[${iau}]`, position.x + 16, position.y + 54);
      roundedRect(
        context,
        position.x + 16,
        position.y + 80,
        129,
        55,
        4,
        'rgba(71, 78, 116, 0.3)'
      );
      roundedRect(
        context,
        position.x + 153,
        position.y + 80,
        129,
        55,
        4,
        'rgba(71, 78, 116, 0.3)'
      );
      roundedRect(
        context,
        position.x + 16,
        position.y + 143,
        129,
        55,
        4,
        'rgba(71, 78, 116, 0.3)'
      );
      roundedRect(
        context,
        position.x + 153,
        position.y + 143,
        129,
        55,
        4,
        'rgba(71, 78, 116, 0.3)'
      );
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.fillText('VELOCITY', position.x + 80, position.y + 90);
      context.fillText('SOLAR LONGITUDE', position.x + 217, position.y + 90);
      context.fillText('ECLIPTIC LONGITUDE', position.x + 80, position.y + 153);
      context.fillText('ECLIPTIC LATITUDE', position.x + 217, position.y + 153);
      context.font = '500 16px Roboto Mono';
      context.fillText(velocg.toFixed(2), position.x + 80, position.y + 111);
      context.fillText(sol.toFixed(2), position.x + 217, position.y + 111);
      context.fillText(lng.toFixed(2), position.x + 80, position.y + 174);
      context.fillText(lat.toFixed(2), position.x + 217, position.y + 174);
      roundedRect(
        context,
        position.x + 93,
        position.y + 211,
        112,
        30,
        4,
        'rgba(67, 97, 238, 1)'
      );
      context.fillStyle = 'white';
      context.font = '700 12px Roboto Condensed';
      context.textAlign = 'start';
      context.fillText('SEE IN SPACE', position.x + 104, position.y + 221);
      context.strokeStyle = 'white';
      context.strokeRect(position.x + 180, position.y + 220, 12, 12);
      context.beginPath();
      context.moveTo(position.x + 183, position.y + 229);
      context.lineTo(position.x + 189, position.y + 223);
      context.moveTo(position.x + 185, position.y + 223);
      context.lineTo(position.x + 189, position.y + 223);
      context.moveTo(position.x + 189, position.y + 227);
      context.lineTo(position.x + 189, position.y + 223);
      context.stroke();
    }

    // Display star information
    function drawStarTooltip(starProps) {

      const {name} = starProps;
      const namelength = name.length;
      if(namelength > 0)
      {
        roundedRect(
          context,
          globeAttributes.current.current_x-(5*namelength),
          globeAttributes.current.current_y-12,
          10*namelength,
          17,
          4,
          'rgba(7, 12, 38, 0.8)'
        );

        
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.font = '500 12px Roboto Mono';
        context.fillText(name, globeAttributes.current.current_x, globeAttributes.current.current_y);
        context.stroke();
      }
    }



    function drawConstellationTooltip(constellatioProps) {

      const {name} = constellatioProps;
      const namelength = name.length;
      let padding_y = 0

      roundedRect(
        context,
        globeAttributes.current.current_x-(5*namelength),
        globeAttributes.current.current_y-12,
        10*namelength,
        17,
        4,
        'rgba(7, 12, 38, 0.8)'
      );
    

      stroke(constellationCollection[globeAttributes.current.constellationIndex], 'rgb(21, 244, 238, 1.8)');
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.font = '500 12px Roboto Mono';

      if(globeAttributes.current.is_clicked == 1)
        padding_y = 10
      else
        padding_y = 0

      context.fillText(name, globeAttributes.current.current_x, globeAttributes.current.current_y-padding_y);
      context.stroke();
    }







    function roundedRect(ctx, x, y, width, height, radius, color) {
      ctx.beginPath();
      ctx.moveTo(x, y + radius);
      ctx.lineTo(x, y + height - radius);
      ctx.arcTo(x, y + height, x + radius, y + height, radius);
      ctx.lineTo(x + width - radius, y + height);
      ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
      ctx.lineTo(x + width, y + radius);
      ctx.arcTo(x + width, y, x + width - radius, y, radius);
      ctx.lineTo(x + radius, y);
      ctx.arcTo(x, y, x, y + radius, radius);
      context.fillStyle = color;
      ctx.fill();
    }

    const waterGradient = context.createRadialGradient(
      width / 2,
      height / 2,
      200,
      width / 2,
      height / 2,
      500
    );

    waterGradient.addColorStop(0, 'rgba(71, 78, 116, 1)');
    waterGradient.addColorStop(1, 'rgba(31, 48, 110, 1)');

    // render all objects
    // water
    context.shadowColor = 'rgba(71, 78, 116, 0.8)';
    context.shadowBlur = 100;
    fill(water, waterGradient);
    context.shadowBlur = 0;
    stroke(water, colorGraticule);

    // graticule
    stroke(graticule, colorGraticule);

    // land
    if (land) {
      fill(land, colorLand);
    }

    // draw meteors
    for (const group of meteorCollection.values()) {
      fill(group, group.color);
    }

    // draw stars
    starCollection.forEach((star) => {
      fill(star, 'rgb(0, 0, 0)', star.size);
    });

    // draw constellations
    constellationCollection.forEach((constellation) => {
      stroke(constellation, 'rgb(0, 0, 0, 0.4)');
    });

    // draw sun
    const sun = {
      type: 'Point',
      coordinates: [0, 0],
    };
    fill(sun, '#FDB800', 10);

    // We need to convert the points into projected coordinates
    const centerLongitude = Math.floor(Math.abs(rotation[0] - 360) / 20) * 20;

    for (let i = -3; i <= 3; i++) {
      let longitude = centerLongitude + i * 20;

      if (longitude >= 360) {
        longitude = longitude % 360;
      } else if (longitude < 0) {
        longitude = longitude + 360;
      }
      fillText(`${Math.round(longitude - 180)}`, projection([longitude, 0]));
    }

    // draw meteor data
    if (meteorIndex) {
      drawMeteorTooltip(meteorProperties[meteorIndex]);
    }

    // drwa star data
    if (starIndex) {
      drawStarTooltip(starCollection[starIndex])
    }

    if(constellationIndex){
      drawConstellationTooltip(constellationCollection[constellationIndex])
    }


  }

  // rotate function
  function rotate(dx, dy) {
    const { projection } = globeAttributes.current;
    const rotation = projection.rotate();
    const degPerMs = degPerSec / 1000;
    rotation[0] += 100 * degPerMs * dx;
    rotation[1] -= 100 * degPerMs * dy;
    projection.rotate(rotation);

    globeAttributes.current.rotation = rotation;

    render();
  }

  function map_latitude(latitude_int)
  {
    if(latitude_int < 0)
    {
      if(latitude_int < -90 && latitude_int >= -180)
      {
        latitude_int = latitude_int + 90;
      }
      else if(latitude_int < -180 && latitude_int >= -270)
      {
        latitude_int = latitude_int + 180;
      }
      else if(latitude_int < -270 && latitude_int >= -360)
      {
        latitude_int = (latitude_int + 270)*(-1);
      }
    }
    else
    {
      if(latitude_int > 90 && latitude_int<= 270)
      {
        latitude_int = 180-latitude_int;
      }
      else if(latitude_int> 270 && latitude_int <= 360)
      {
        latitude_int = latitude_int - 360;  
      }
    }
    
    return latitude_int
  }

  function map_longitude(longitude_int)
  {
    longitude_int = longitude_int >=0 ? (180 - longitude_int) : ((180 + longitude_int)*-1);
    return longitude_int;
  }


  // drag functions
  // function dragstarted(event) {
  // }

  // function dragended(event) {
  // }

  function dragged(event) {
    const { dx, dy } = event;

    globeAttributes.current.rotation[0] = map_longitude(globeAttributes.current.rotation[0])

    let newParams = new URLSearchParams(window.location.search);
    const debouncedFilter = debounce(() => {
      newParams.set('lat', map_latitude(globeAttributes.current.rotation[1]).toFixed(3));
      newParams.set('long', map_longitude(globeAttributes.current.rotation[0]).toFixed(3));
      window.history.pushState({}, '', '?' + newParams.toString());
      }, 500)
      debouncedFilter();
      if(globeAttributes.current.rotation[1]<=90 && globeAttributes.current.rotation[1] >= -90){
        console.log('dy', dy)
        rotate(dx, dy);
      }
      else{
        if(globeAttributes.current.rotation[1] > 90 && dy >0){
          rotate(dx, dy);
        }
        if(globeAttributes.current.rotation[1] < -90 && dy < 0){
          rotate(dx, dy);
        }

      }
  }

  // mouse move
  // function mousemove(event) {
  //   const { projection } = globeAttributes.current;

  //   const coordinate = projection.invert([event.clientX, event.clientY]);

  //   if (coordinate[0] < 0) {
  //     // convert to all positive degrees
  //     coordinate[0] = coordinate[0] + 360;
  //   }

  //   // store mouse position
  //   globeAttributes.current.clientX = event.clientX;
  //   globeAttributes.current.clientY = event.clientY;

  //   render();
  // }

  function clicked(event) {

    const { projection, meteorCoordinates} = globeAttributes.current;
    const coordinate = projection.invert([event.clientX, event.clientY]);

    if (coordinate[0] < 0) {
      // convert to all positive degrees
      coordinate[0] = coordinate[0] + 360;
    }

    const meteorPointIndex = meteorCoordinates.findIndex((m) => {
      const longtitudeDiff = Math.pow(m[0] - coordinate[0], 2);
      const latitudeDiff = Math.pow(m[1] - coordinate[1], 2);

      const distance = Math.sqrt(longtitudeDiff + latitudeDiff);

      return distance <= matchPrecision;
    });

    if (meteorPointIndex !== -1) {
      globeAttributes.current.is_clicked = 1;
      globeAttributes.current.meteorIndex = meteorPointIndex;
    } else {
      globeAttributes.current.is_clicked = 0;
      globeAttributes.current.meteorIndex = null;
    }
    render();
  }

  // Havour and get star name
  function havoured(event) {
    let { projection, starCollection, current_x, current_y} = globeAttributes.current;

      //Selecting an area around the globe, where the constellation name will be displayed
      let buffer = 30;
      let radius_new = globeAttributes.current.height/2-buffer;
      let width_min = globeAttributes.current.width/2 - radius_new;
      let width_max = globeAttributes.current.width/2 + radius_new;
      let height_min = globeAttributes.current.height/2 - radius_new;
      let height_max = globeAttributes.current.height/2 + radius_new;

      if((event.clientX >= width_min && event.clientX <=width_max) && (event.clientY >= height_min && event.clientY <= height_max))
      {
        const coordinate = projection.invert([event.clientX, event.clientY]);
        const starPointIndex = starCollection.findIndex((m) => {



        const longtitudeDiff = Math.pow(m.coordinates[0] - coordinate[0], 2);
        const latitudeDiff = Math.pow(m.coordinates[1] - coordinate[1], 2);
        const distance = Math.sqrt(longtitudeDiff + latitudeDiff);
        return distance <= matchPrecisionStar;
      });

      if (starPointIndex !== -1) {
        globeAttributes.current.starIndex = starPointIndex;
        //getting current locations 
        globeAttributes.current.current_x = event.clientX;
        globeAttributes.current.current_y = event.clientY;
      } else {
        globeAttributes.current.starIndex = null;
      }
      
      let {constellationCollection} = globeAttributes.current;
        const constellationPointIndex = constellationCollection.findIndex((m) => {
        
        for (let i = 0; i <= m.coordinates.length - 1; i++) {
            const midlongitude = (m.coordinates[i][0][0] + m.coordinates[i][1][0])/2
            const midlatitude = (m.coordinates[i][0][1] + m.coordinates[i][1][1])/2

            const longtitudeDiff = Math.pow(midlongitude - coordinate[0], 2);
            const latitudeDiff = Math.pow(midlatitude - coordinate[1], 2);
            const distance = Math.sqrt(longtitudeDiff + latitudeDiff);
            

            if(distance <= 2){
              return distance
            }
            
        }
          
      });

      //console.log('m value -->', constellationPointIndex);

      if (constellationPointIndex !== -1) {
        globeAttributes.current.constellationIndex = constellationPointIndex;
        //getting current locations 
        
        globeAttributes.current.current_x = event.clientX;
        globeAttributes.current.current_y = event.clientY;
      } else {
        globeAttributes.current.constellationIndex = null;
      }

      render();
    }
  }

  // component on mount
  useEffect(() => {
    function setInitialPosition() {
      const { projection } = globeAttributes.current;
      const rotation = projection.rotate();
      const properties = ['alt', 'lat', 'long'];

      const params = new URLSearchParams(window.location.search);
      properties.forEach((property) => {
        switch (property) {
          case 'lat':
              // If the initial latitude and langitude are out of the limit setting them to 0 and 180
              if(params.has(property) && !isNaN(params.get(property)) && ((-90 <= Number(params.get(property))) && (Number(params.get(property)) <= 90))){
                let temp_lati = map_latitude(Number(params.get(property)));
                rotation[1] += temp_lati;
              }
              else{
                rotation[1] = 0;
              }
            break;
          case 'long':
            if(params.has(property) && !isNaN(params.get(property)) && ((-180 <= Number(params.get(property))) && (Number(params.get(property)) <= 180))){
              let temp_long = map_longitude(Number(params.get(property)));
              rotation[0] += temp_long;
            }
            else{
              rotation[0] = 0;
            }
            break;
          default:
            
        }
      });
      projection.rotate(rotation);

      globeAttributes.current.rotation = rotation;

      render();
    }
    // register resize callback
    window.addEventListener('resize', function () {
      globeAttributes.current.width = window.innerWidth;
      globeAttributes.current.height = window.innerHeight;

      render();
    });

    // TODO: uncomment to load land data
    // fetchLand().then((world) => {
    //   const land = feature(world, world.objects.land);

    //   globeAttributes.current.land = land;
    //   render();
    // });

    // register drag callbacks
    const canvas = select('#globe');

    canvas.call(
      // drag().on('start', dragstarted).on('drag', dragged).on('end', dragended)
      drag().on('drag', dragged)
    );
    

    canvas.on('click', clicked);

    canvas.on('mousemove', havoured);

    setInitialPosition();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const meteorCoordinates = [];
    const meteorProperties = [];
    const meteorCollection = new Map();
    const starCollection = [];
    const constellationCollection = [];

    // segment meteor payload
    (meteors || []).forEach((meteor) => {
      const { location, color, iau, mag, name, sol, velocg } = meteor;

      meteorCoordinates.push(location.coordinates);
      meteorProperties.push({
        iau,
        name,
        lat: location.coordinates[0],
        lng: location.coordinates[1],
        color,
        mag,
        sol,
        velocg,
      });

      if (meteorCollection.has(name)) {
        // add coord data to existing meteor group
        const group = meteorCollection.get(name);
        const coords = meteorCollection.get(name).coordinates;
        coords.push(location.coordinates);
        meteorCollection.set(name, {
          ...group,
          coordinates: coords,
        });
      } else {
        // make new meteor group
        const newGroup = {
          type: 'MultiPoint',
          coordinates: [location.coordinates],
          color: colorScale(color),
        };
        meteorCollection.set(name, newGroup);
      }
    });

    // segment star payload
    (stars || []).forEach((star) => {
      const { location, mag, color, id, name } = star;
      const adjustedMag = parseFloat(mag) * 100;
      starCollection.push({
        ...location,
        size: starSizeScale(adjustedMag),
        name: name
      });
    });

    // segment constellation payload
    (constellations || []).forEach((constellation) => {
      let coords = [];
      constellation.points.forEach((group) => {
        for (let i = 1; i <= group.length - 1; i++) {
          coords.push([group[i - 1], group[i]]);
        }
      });
      constellationCollection.push({
        type: 'MultiLineString',
        coordinates: coords,
        name: constellation.name,
      });
    });

    globeAttributes.current.meteorCollection = meteorCollection;
    globeAttributes.current.meteorCoordinates = meteorCoordinates;
    globeAttributes.current.meteorProperties = meteorProperties;
    globeAttributes.current.starCollection = starCollection;
    globeAttributes.current.constellationCollection = constellationCollection;
    //console.log(globeAttributes.current.constellationCollection)
    render();
  }, [meteors, stars, constellations]);

  return (
    <div className="globe-container">
      <canvas id="globe"></canvas>
    </div>
  );
}
