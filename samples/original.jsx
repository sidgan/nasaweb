import React from 'react';
import * as d3 from 'd3';
import { queue } from 'd3-queue';
import { geoOrthographic, geoPath, geoAlbers, graticule, geoGraticule } from 'd3-geo';
import { scaleLinear } from 'd3-scale';
import { drag } from 'd3-drag';

let i = 20;

function handleMouseOver(d) {
  // // TODO
  // var popup =
  //   '<div class="popup" style="top:' +
  //   d3.event.clientY +
  //   'px;left:' +
  //   d3.event.clientX +
  //   'px">' +
  //   '<a> &nbsp </a>' +
  //   d.properties.name +
  //   '</div>';

  // var info =
  //   '<div class="info" style="top:200px;left:150px">' +
  //   '<a> <span>sl : ' +
  //   parseFloat(d.properties.sol).toFixed(3) +
  //   '<br>&lambda; : ' +
  //   parseFloat(d.geometry.coordinates[0]).toFixed(2) +
  //   ' <br>&beta; : ' +
  //   parseFloat(d.geometry.coordinates[1]).toFixed(2) +
  //   ' <br>Vg : ' +
  //   parseFloat(d.properties.velocg).toFixed(2) +
  //   '</span></a>' +
  //   '</div>';
}

function handleMouseOut(d) {
  // TODO
}

function handleMouseClick(d) {
  // TODO
}

function createD3(suns, stars, meteors) {
  console.log('[d3] data loaded');

  // TODO: where is orthographic
  d3.select('#orthographic').select('svg').remove();

  const width = 700;
  const height = 700;

  // Select the container div and append the SVG element
  const div = d3.select('#orthographic');
  const svg = div.append('svg').attr('width', width).attr('height', height);

  // TODO: background image?

  // Store the current rotation
  const rotate = { x: 289, y: 0 };

  // Create and configure an instance of the orthographic projection
  const projection = geoOrthographic()
    .scale((1.5 * height) / Math.PI)
    .translate([width / 2, height / 2])
    .clipAngle(90)
    .rotate([rotate.x / 1, -rotate.y / 1]);

  // Create a radial nighttime gradient for sphere
  const sphereGradient = svg
    .append('defs')
    .append('radialGradient')
    .attr('id', 'sphereGradient')
    .attr('cx', '50%')
    .attr('cy', '50%')
    .attr('r', '50%');

  sphereGradient
    .append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#355886')
    .attr('stop-opacity', '0.5')
    .attr('offset', '50%')
    .attr('stop-color', '#122442')
    .attr('stop-opacity', '0.5');

  sphereGradient
    .append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#000000')
    .attr('stop-opacity', '0.5');

  const overlay = svg
    .selectAll('circle')
    .data([rotate])
    .enter()
    .append('circle')
    .attr('r', height / 2)
    .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
    .attr('class', 'overlay')
    .attr('fill-opacity', 0.0);

  // Create and configure the geographic path generator
  // Meteor
  const meteorPath = geoPath().projection(projection);
  // Star
  const starPath = geoPath().projection(projection);
  // Sun
  const sunPath = geoPath().projection(projection);

  // Meteor
  svg
    .append('path')
    .datum({ type: 'Sphere' })
    .attr('class', 'cellestial-globe')
    .attr('d', meteorPath);
  // Star
  svg
    .append('path')
    .datum({ type: 'Shpere' })
    .attr('class', 'cellestial-globe')
    .attr('d', starPath);
  // Sun
  svg
    .append('path')
    .datum({ type: 'Sphere' })
    .attr('class', 'cellestial-globe')
    .style('fill', 'url(#sphereGradient)')
    .attr('d', sunPath);

  // Draw graticule lines
  // const graticule = geoAlbers.graticule();

  // geoAlbers.graticule
  const graticlue = geoGraticule().lines();

  const lines = svg
    .selectAll('path.graticule')
    .data([graticlue])
    .enter()
    .append('path')
    .attr('class', 'graticule')
    .attr('d', meteorPath);

  // Get color info
  // METEOR+STARS+SUN
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

  // Size of symbol
  // METEOR
  // const rScale = scaleLinear()
  //   .domain(
  //     d3.extent(meteors.features, function (d) {
  //       return d.properties.mag;
  //     })
  //   )
  //   .range([0, 3]);

  // STAR
  // const rScale = scaleLinear()
  //   .domin(
  //     d3.extent(stars.features || [], function (d) {
  //       return d.properties.mag;
  //     })
  //   )
  //   .range([2.5, 1]);

  const rScale = scaleLinear().domain([]).range([2.5, 1]);

  // Compute the radius for the point features
  // METEOR
  meteorPath.pointRadius(function (d) {
    return d.properties ? rScale(d.properties.mag) : 1;
  });
  // STAR
  starPath.pointRadius(function (d) {
    return d.properties ? rScale(d.properties.mag) : 1;
  });
  // SUN
  sunPath.pointRadius(function (d) {
    return d.properties ? rScale(d.properties.mag) : 1;
  });

  // Place data points
  // METEOR
  const meteorsDataPoint = svg
    .selectAll('path.meteor')
    .data(meteors.features)
    .enter()
    .append('path')
    .attr('class', 'meteor')
    .style('fill', function (d) {
      return colorScale(d.properties.color);
    })
    .attr('d', meteorPath)
    .on('click', function (d) {
      handleMouseClick(d);
    })
    .on('mouseover', function (d) {
      handleMouseOver(d);
    })
    .on('mouseout', function (d) {
      handleMouseOut(d);
    });

  // STAR
  const starsDataPoint = svg
    .selectAll('path.star')
    .data(stars.features)
    .enter()
    .append('path')
    .attr('class', 'star')
    .attr('d', starPath)
    .attr('stroke', 'black')
    .attr('stroke-width', '1');

  // Create a radial gradient for sun image
  const sunGradient = svg
    .append('defs')
    .append('radialGradient')
    .attr('id', 'sunGradient')
    .attr('cx', '50%')
    .attr('cy', '50%')
    .attr('r', '50%')
    .selectAll('stop')
    .data([
      { offset: '0%', color: '#FFF76B' },
      { offset: '50%', color: '#FFF845' },
      { offset: '90%', color: '#FFDA4E' },
      { offset: '100%', color: '#FB8933' },
    ])
    .enter()
    .append('stop')
    .attr('offset', function (d) {
      return d.offset;
    })
    .attr('stop-color', function (d) {
      return d.color;
    });

  // SUN
  const sunsDataPoint = svg
    .selectAll('path.sun')
    .data(suns.features)
    .enter()
    .append('path')
    .attr('class', 'sun')
    .attr('d', sunPath)
    .style('fill', 'url(#sunGradient)')
    .attr('stroke', 'black')
    .attr('stroke-width', '1');

  // Drag behavior
  const dragCallback = function (d) {
    // projection.rotate([(d.x = d3.event.x), -(d.y = d3.event.y)]);

    // METEOR
    meteorsDataPoint.attr('d', function (u) {
      const p = meteorPath(u);

      return p ? p : 'M 10 10';
    });

    // STAR
    starsDataPoint.attr('d', function (u) {
      const p = starPath(u);
      return p ? p : 'M 10 10';
    });
    // SUN
    sunsDataPoint.attr('d', function (u) {
      const p = sunPath(u);
      return p ? p : 'M 10 10';
    });

    // METEOR
    lines.attr('d', meteorPath);
    // STAR
    lines.attr('d', starPath);
    // SUN
    lines.attr('d', sunPath);
  };

  // const dragBehavior = drag().on('drag', dragCallback);

  // overlay.call(dragBehavior);

  // const globeRotationInterval = setInterval(function () {
  //   drag({ x: 1 * (i - 1) + 270, y: 0 });
  // }, 30);

  // d3.select(window).on('load', globeRotationInterval);
}

export default function GlobeOptimized(props) {
  // // initial queue, to load first data
  // const q = queue();
  // q.defer(d3.json, '');
  // q.defer(d3.json, '');
  // q.defer(d3.json, '');

  // q.await((error, suns, stars, meteors) => {
  //   if (error) {
  //     console.error('[d3] could not read data');
  //     return;
  //   }

  //   createD3(suns, stars, meteors);
  // });

  const meteors = [
    {
      "geometry": {
          "type": "Point",
          "coordinates": [
              170.92424799999998,
              8.695
          ]
      },
      "type": "Feature",
      "properties": {
          "color": "0.0",
          "mag": 2,
          "velocg": 33.749,
          "name": 0,
          "sol": 63.027248
      }
  }
  ];

  createD3([], [], meteors);

  return (
    <div className="globe-container">
      {/* <div className="globe-content"></div>
       */}
      <div id="orthographic"></div>
    </div>
  );
}
