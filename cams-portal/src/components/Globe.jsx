import React, { useState } from "react";
// import Popup from 'reactjs-popup';
import * as d3 from 'd3';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import { getMeteorsData } from '../sources/meteors';
import { getStarsData } from '../sources/stars';
import { getSunData } from '../sources/sun';

import "./style.css";

const Globe = (props) => {
    const [date] = useState(props.date);

    const [showTooltip, setShowTooltip] = useState(false) // Boolean For Popup


    console.log(showTooltip)
    return (
        <section>
            <div id="orthographic"></div>
            <div className="col-lg-7">
                <GlobeObject
                    date={date}
                    showTooltip={showPopup => setShowTooltip(showPopup)}>
                    { showTooltip ?
                        <Tooltip
                            title={props.dataPoint}
                            TransitionComponent={Zoom}>
                            <p>He</p>
                        </Tooltip>
                        : null
                    }
                </GlobeObject>
            </div>
        </section>
    )
}


const GlobeObject = ({date, showTooltip}) => {

    const [sunJson] = useState(getSunData());
    const [starJson] = useState(getStarsData(date));
    const [meteorJson] = useState(getMeteorsData(date));

    const promises = [sunJson, starJson, meteorJson]

    // const [dataPoint, setDataPoint] = useState(null) // Reference Metoer Point

    Promise.all(promises).then(() => {

        let currentEvent = () => require("d3-selection").event;
        console.log("[d3] Got data.")
        d3.select('#orthographic').select("svg").remove()

        let width = 800;
        let height = 800;
        let rotate = { x: 0, y: 0 };

        // Select the container div and append the SVG element
        let div = d3.select('#orthographic')
        let svg = div.append('svg')
            .attr('width', width)
            .attr('height', height);

        //Create and configure an instance of the orthographic proj.
        let projection = d3.geoOrthographic()
            .scale(1.5 * height / Math.PI)
            .translate([width / 2, height / 2])
            .clipAngle(90)
            .rotate([rotate.x / 1, -rotate.y / 1]);

        // Create a radial nighttime gradient for sphere
        let sphereGradient = svg.append('defs')
            .append('radialGradient')
            .attr('id', 'sphereGradient')
            .attr('cx', '50%')
            .attr('cy', '50%')
            .attr('r', '50%');
        sphereGradient.append('stop')
            .attr('offset', '0%').attr('stop-color', '#355886')
            .attr('stop-opacity', '0.5')
            .attr('offset', '50%').attr('stop-color', '#122442')
            .attr('stop-opacity', '0.5')
        sphereGradient.append('stop')
            .attr('offset', '100%').attr('stop-color', '#000000')
            .attr('stop-opacity', '0.5')

        // Overlay
        let overlay = svg.selectAll('circle').data([rotate])
            .enter().append('circle')
            .attr('r', height / 2)
            .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
            .attr('class', 'overlay')
            .attr('fill-opacity', 0.0);

        // Create and configure the geographic path generator
        // METEOR
        let meteorPath = d3.geoPath().projection(projection);
        // STAR
        let starPath = d3.geoPath().projection(projection);
        // SUN
        let sunPath = d3.geoPath().projection(projection);

        // METEOR
        svg.append('path').datum({ type: 'Sphere' })
            .attr('class', 'cellestial-globe')
            .attr('d', meteorPath);
        // STAR
        svg.append('path').datum({ type: 'Sphere' })
            .attr('class', 'cellestial-globe')
            .attr('d', starPath);
        // SUN
        svg.append('path').datum({ type: 'Sphere' })
            .attr('class', 'cellestial-globe')
            .style('fill', 'url(#sphereGradient)')
            .attr('d', sunPath);

        // Draw graticule lines
        let graticule = d3.geoGraticule();

        let lines = svg.selectAll('path.graticule').data([graticule()])
            .enter().append('path')
            .attr('class', 'graticule')
            .attr('d', meteorPath);

        // Get color info
        // METEOR+STARS+SUN
        let color_scale = d3.scaleLinear()
            .domain([0, 7, 17, 27, 37, 47, 57, 67, 120])
            .range(['rgb(255,255,255)', 'rgb(160,32,240)', 'rgb(0,0,255)', 'rgb(0,165,255)', 'rgb(0,255,0)', 'rgb(255,255,0)', 'rgb(255,165,0)', 'rgb(255,0,0)']);

        // Size of symbol
        // METEOR
        let rMeteorScale = d3.scaleLinear()
            .domain(d3.extent(meteorJson.features, function (d) { return d.properties.mag; }))
            .range([1.5, 2.5]);

        // STAR
        let rStarScale = d3.scaleLinear()
            .domain(d3.extent(starJson.features, function (d) { return d.properties.mag; }))
            .range([2.5, 1]);

        // SUN
        let rSunScale = d3.scaleLinear()
            .domain(d3.extent(sunJson.features, function (d) { return d.properties.mag; }))
            .range([4, 6])

        // Compute the radius for the point features
        // METEOR
        meteorPath.pointRadius(function (d) {
            return d.properties ? rMeteorScale(d.properties.mag) : 1;
        });
        // STAR
        starPath.pointRadius(function (d) {
            return d.properties ? rStarScale(d.properties.mag) : 1;
        })
        // SUN
        sunPath.pointRadius(function (d) {
            return d.properties ? rSunScale(d.properties.mag) : 1;
        })

        //handle meteor mouse hover event
        // let handleMouseOver = d => {
        //     // let popup = `<div class="popup" style="top:${currentEvent.y}px;left:${currentEvent.x}px">${d.properties.name}</div>`;

        //     // const popup = () => {
                
        //     //     return (
        //     //         <div className="popup" style={`top:${currentEvent.y}px; left:${currentEvent.x}pz`}>
        //     //             {/* <h1>{d.properties.name}</h1> */}
        //     //             <p>This is a boot set</p>
        //     //         </div>
        //     //     )
        //     // }

        //     // // let info = `<br>&lambda; :  <br
        //     // const info = d => {
        //     //     return (
        //     //         <div className="info" style={{top: "200px", left:'150px'}}>
        //     //             <a href="https://google.com">
        //     //                 <span>
        //     //                     sl : ${parseFloat(d.properties.sol).toFixed(3)}
        //     //                     <br/>
        //     //                     &lambda; : ${parseFloat(d.geometry.coordinates[0]).toFixed(2)}
        //     //                     <br/>
        //     //                     &beta; : ${parseFloat(d.geometry.coordinates[1]).toFixed(2)} 
        //     //                     <br/>
        //     //                     Vg : ${parseFloat(d.properties.velocg).toFixed(2)}
        //     //                 </span>
        //     //             </a>
        //     //         </div>
        //     //     )
        //     // }

        //     setShowPopup(true);

        //     const popup = d => {
        //         return null
        //     }

        //     React.render(<popup />)
            
        //     // d3.select('body').append(<Popup />);
        //     // d3.select('body').append(<info />);
        // }

        let handleMouseClick = function (d) {
            window.open('https://www.meteorshowers.org/view/iau-' + d.properties.name);
        }

        // Place data points
        // METEOR
        let meteorsDataPoint = svg.selectAll('path.meteor').data(meteorJson.features)
            .enter().append('path')
            .attr('class', 'meteor')
            .style('fill', function (d) {
                return color_scale(d.properties.color)
            })
            .attr('d', meteorPath)
            .on("click", function (d) {
                handleMouseClick(d);
            })
            .on("mouseover", function (d) {
                // handleMouseOver(d);
                return () => showTooltip(true)
            })
            .on("mouseout", () => {
                return () => showTooltip(false)
                // d3.select('.popup').remove();
                // d3.select('.info').remove();
            });


        // STAR
        let starsDataPoint = svg.selectAll('path.star').data(starJson.features)
            .enter().append('path')
            .attr('class', 'star')
            .attr('d', starPath)
            .attr('stroke', 'black')
            .attr('stroke-width', '1');


        // SUN
        let sunsDataPoint = svg.selectAll('path.sun').data(sunJson.features)
            .enter().append('path')
            .attr('class', 'sun')
            .attr('d', sunPath)
            .style('fill', '#FDB800')
            .attr('stroke', '#FDB813')
            .attr('stroke-width', '9')

        // Drag Behaviour
        let rotationComplete = false;

        let dragBehavior = d3.drag()
            .subject(Object)
            .on('drag', drag)

        function drag(d) {

            // let mouse = d3.mouse(this);
            if (!currentEvent || !rotationComplete) {
                currentEvent = { 'x': 5 * d.x, 'y': 0 }
            }
            // console.log(`currentEvent is ${currentEvent.x}, ${currentEvent.y} /// d is ${d.x} ${d.y}`);
            
            projection.rotate([(d.x = currentEvent.x), -(d.y = currentEvent.y)]);
            // METEOR
            meteorsDataPoint.attr('d', function (u) {
                let p = meteorPath(u);
                return p ? p : 'M 10 10';
            });
            // STAR 
            starsDataPoint.attr('d', function (u) {
                let p = starPath(u);
                return p ? p : 'M 10 10';
            });
            // SUN 
            sunsDataPoint.attr('d', function (u) {
                let p = sunPath(u);
                return p ? p : 'M 10 10';
            });

            // METEOR
            lines.attr('d', meteorPath);
            // STAR 
            lines.attr('d', starPath);
            // SUN 
            lines.attr('d', sunPath);

        }

        overlay.call(dragBehavior);
        let i = 180;

        let globeRotationInterval = setInterval(function () {
            drag({ 'x': 1 * (i - 1) + 270, 'y': 0 });
            i--;
            if (i === 0) {
                // rotationComplete = true;
                clearInterval(globeRotationInterval)
            }
        }, 3);
        d3.select(window).on("load", globeRotationInterval);

        // d3.text("./Data.csv", function (data) {
        //     let parsedCSV = d3.csv.parseRows(data);
        //     d3.select('#table3').select("table").remove();
        //     let div = d3.select('#table3')
        //     svg = div.append('table')
        //         .attr('width', '690')
        //         .   attr('height', '50')
        //         .style('border-collapse', 'collapse')
        //         .style('border', '2px black solid')

        //         .selectAll("tr")
        //         .data(parsedCSV).enter()
        //         .append("tr")

        //         .selectAll("td")
        //         .data(function (d) { return d; }).enter()
        //         .append("td")
        //         .style("border", "1px black solid")
        //         .style("padding", "5px")
        //         .text(function (d) { return d; })
        //         .style("font-size", "12px");
        // });
    })


    return null
}

export default Globe;                         