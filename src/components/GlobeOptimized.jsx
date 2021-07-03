import React, { useEffect, useRef } from 'react';
import { geoOrthographic, geoPath, geoGraticule10 } from 'd3-geo';
import { scaleLinear } from 'd3-scale';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';
import { feature } from 'topojson';
import { fetchLand } from '../clients/land';
import { useNavigationState } from '../contexts/navigation';
import { YearSelection } from '@material-ui/pickers/views/Year/YearView';

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

// const starSizeScale = (colorCode) => {
//   let code = parseFloat(colorCode);
//   if (code >= -4.0 && code < -4.9) {
//     return 0.96;
//   } else if (code >= -3.0 && code < -3.9) {
//     return 0.91;
//   } else if (code >= -2.0 && code < -2.9) {
//     return 0.89;
//   } else if (code >= -1.0 && code < -1.9) {
//     return 0.83;
//   } else if (code <= 0 && code >= -0.9) {
//     return 0.79;
//   } else if (code > 0 && code <= 0.9) {
//     return 0.73;
//   } else if (code >= 1.0 && code <= 1.9) {
//     return 0.63;
//   } else if (code >= 2.0 && code <= 2.9) {
//     return 0.53;
//   } else if (code >= 3.0 && code <= 3.9) {
//     return 0.46;
//   } else if (code >= 4.0 && code <= 4.9) {
//     return 0.32;
//   } else if (code >= 5.0 && code <= 5.9) {
//     return 0.28;
//   } else {
//     return 0.19;
//   }
// };

// scale of the globe (not the canvas element)
const scaleFactor = 0.8;
// autorotation speed
const degPerSec = 6;
// TODO: color matching
// colors
const colorWater = '#474e74';
const colorLand = '#111';
// const colorGraticule = '#070c26';
const colorGraticule = 'rgb(2, 12, 38, 0.2)';
const matchPrecision = 1.5;

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
    // mouse hover properties
    clientX: null,
    clientY: null,
    // tracking object
    // TODO handle star & other objects
    meteorIndex: null,
  });

  // render function
  function render() {
    const {
      width,
      height,
      land,
      projection,
      meteorCollection,
      meteorCoordinates,
      meteorProperties,
      starCollection,
      constellationCollection,
      meteorIndex,
      clientX,
      clientY,
    } = globeAttributes.current;
    //
    // Variables
    //
    const canvas = select('#globe');
    const context = canvas.node().getContext('2d');

    const water = { type: 'Sphere' };
    const graticule = geoGraticule10();

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
      context.font = '16px Arial';
      context.fillText(text, coordinate[0], coordinate[1]);
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
    fill(water, waterGradient);

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

    // draw meteor data
    if (meteorIndex) {
      const { iau, name } = meteorProperties[meteorIndex];

      fillText(meteorIndex, [100, 150]);
      fillText(iau, [100, 200]);
      fillText(name, [100, 250]);
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
    render();
  }

  // drag functions
  // function dragstarted(event) {
  // }

  // function dragended(event) {
  // }

  function dragged(event) {
    const { dx, dy } = event;

    rotate(dx, dy);
  }

  // mouse move
  function mousemove(event) {
    const { projection, meteorCoordinates } = globeAttributes.current;

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
      globeAttributes.current.meteorIndex = meteorPointIndex;
    } else {
      globeAttributes.current.meteorIndex = null;
    }

    // store mouse position
    globeAttributes.current.clientX = event.clientX;
    globeAttributes.current.clientY = event.clientY;

    render();
  }

  // component on mount
  useEffect(() => {
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

    canvas.on('mousemove', mousemove);
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
      const { location, mag } = star;
      const adjustedMag = parseFloat(mag) * 10;
      starCollection.push({
        ...location,
        size: starSizeScale(adjustedMag),
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
    render();
  }, [meteors, stars, constellations]);

  return (
    <div className="globe-container">
      <canvas id="globe"></canvas>
    </div>
  );
}
