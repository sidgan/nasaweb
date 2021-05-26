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

//
// Configuration
//

// ms to wait after dragging before auto-rotating
var rotationDelay = 3000;
// scale of the globe (not the canvas element)
var scaleFactor = 0.9;
// autorotation speed
const degPerSec = 6;
// start angles
var angles = { x: -20, y: 40, z: 0 };
// colors
const colorWater = '#fff';
const colorLand = '#111';
const colorGraticule = '#ccc';
// var colorCountry = '#a00';

export default function GlobeOptimized(props) {
  const globeAttributes = useRef({
    // geometrics
    width: window.innerWidth,
    height: window.innerHeight,
    // projection
    projection: geoOrthographic().precision(0.1),
    // render data
    land: null,
    // timer
    lastTime: now(),
  });

  // rotate function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function rotate(elapsed) {
    const { projection, lastTime } = globeAttributes.current;
    const degPerMs = degPerSec / 1000;
    const currentTime = now();
    const diff = currentTime - lastTime;
    if (diff < elapsed) {
      const rotation = projection.rotate();
      rotation[0] += diff * degPerMs;
      projection.rotate(rotation);
      draw();
    }
    globeAttributes.current.lastTime = currentTime;
  }

  // render function
  function draw() {
    const { width, height, land, projection } = globeAttributes.current;
    //
    // Variables
    //
    const canvas = select('#globe');

    var context = canvas.node().getContext('2d');
    var water = { type: 'Sphere' };
    var graticule = geoGraticule10();
    var path = geoPath(projection).context(context);
    var v0; // Mouse position in Cartesian coordinates at start of drag gesture.
    var r0; // Projection rotation as Euler angles at start.
    var q0; // Projection rotation as versor at start.
    // var lastTime = now();
    var degPerMs = degPerSec / 1000;
    var autorotate, diff, roation;

    // canvas attrs
    canvas.attr('width', width).attr('height', height);

    // scale
    projection
      .scale((scaleFactor * Math.min(width, height)) / 2)
      .translate([width / 2, height / 2]);

    // Functions
    // function setAngles() {
    //   const rotation = projection.rotate();
    //   rotation[0] = angles.y;
    //   rotation[1] = angles.x;
    //   rotation[2] = angles.z;
    //   projection.rotate(rotation);
    // }

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

    function render() {
      context.clearRect(0, 0, width, height);
      fill(water, colorWater);
      stroke(graticule, colorGraticule);
      if (land) {
        fill(land, colorLand);
      }
    }

    render();
  }

  // component on mount
  useEffect(() => {
    // register resize callback
    window.addEventListener('resize', function () {
      globeAttributes.current.width = window.innerWidth;
      globeAttributes.current.height = window.innerHeight;

      draw(window.innerWidth, window.innerHeight);
    });

    // load data
    fetchLand().then((world) => {
      const land = feature(world, world.objects.land);

      globeAttributes.current.land = land;
      draw(window.innerWidth, window.innerHeight, land);

      // start rotation
      timer(rotate);
    });
  }, [rotate]);

  return (
    <div className="globe-container">
      <canvas id="globe"></canvas>
    </div>
  );
}
