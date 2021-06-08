import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { geoOrthographic, geoPath, geoGraticule, geoGraticule10 } from 'd3-geo';
import { scaleLinear } from 'd3-scale';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';
import { now, timer } from 'd3-timer';
import { feature } from 'topojson';
import versor from '../utils/versor';
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

// scale of the globe (not the canvas element)
const scaleFactor = 1.5;
// autorotation speed
const degPerSec = 6;
// start angles
var angles = { x: -20, y: 40, z: 0 };
// colors
const colorWater = '#fff';
const colorLand = '#111';
const colorGraticule = '#ccc';
const matchPrecision = 1.5;

export default function GlobeOptimized(props) {
  const { meteors } = useNavigationState();

  const globeAttributes = useRef({
    // geometrics
    width: window.innerWidth,
    height: window.innerHeight,
    // data
    land: null,
    meteorCoordinates: [],
    meteorProperties: [],
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
      meteorCoordinates,
      meteorProperties,
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

    const path = geoPath(projection, context).pointRadius(1);

    function fill(obj, color) {
      context.beginPath();
      path(obj);
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

    // render all objects
    // water
    fill(water, colorWater);

    // graticule
    stroke(graticule, colorGraticule);

    // land
    if (land) {
      fill(land, colorLand);
    }

    // draw meteors
    // TODO: turn on bulk rendering!
    const points = {
      type: 'MultiPoint',
      coordinates: meteorCoordinates,
    };

    fill(points, 'tomato');
    // meteorCoordinates
    //   // .filter((_, i) => i === 294)
    //   .forEach((coordinate, i) => {
    //     const point = {
    //       type: 'Point',
    //       coordinates: coordinate,
    //     };

    //     const debugTextCoordinate = projection(coordinate);

    //     fill(point, 'tomato');
    //     fillText(i, debugTextCoordinate);
    //   });

    // draw meteor data
    if (meteorIndex) {
      // console.log(meteorIndex);
      // console.log(meteorProperties[meteorIndex]);
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

    // if (coordinate[0] < 0) {
    //   console.log(coordinate[0] + 360, coordinate[1]);
    // } else {
    //   console.log(coordinate[0], coordinate[1]);
    // }

    // console.log(meteorCoordinates[294]);

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

    // load data
    fetchLand().then((world) => {
      const land = feature(world, world.objects.land);

      globeAttributes.current.land = land;
      render();
    });

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
    });

    globeAttributes.current.meteorCoordinates = meteorCoordinates;
    globeAttributes.current.meteorProperties = meteorProperties;

    render();
  }, [meteors]);

  return (
    <div className="globe-container">
      <canvas id="globe"></canvas>
    </div>
  );
}
