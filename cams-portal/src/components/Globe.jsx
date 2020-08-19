import React, { Component } from "react";
import * as d3 from 'd3';
// import {event as currentEvent} from 'd3-selection';
// import { geoMercator } from 'd3';
// import { background } from '../images/'

import "./style.css";


class Globe extends Component {

    constructor(props) {
        super(props)
        this.state = {
            promises: []
        }
    }

    componentWillMount() {
        console.log("Working")
    }

    addZ = n => { return n < 10 && n.length === 1 ? '0' + n : '' + n; }
    getMonthFromString = mon => {
        return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1
     }

    getDateFormat = date => {
        let res = date.split(" ");
        let month = this.getMonthFromString(res[1])
        return `${res[3]}_${this.addZ(String(month))}_${this.addZ(res[2])}`;
    }

    render() {
        const { promises } = this.state;
        const { date } = this.props;
        // console.log(this.state.geoJson)
        // let projection = d3.geoOrthographic()
        //     .fitSize([this.props.size, this.props.size], this.props.geoJson)
        //     .rotate([this.state.rotation])

        // let geoGenerator = d3.geoPath()
        //     .projection(projection)

        // let pathString = geoGenerator(this.props.geoJson)


        // window.requestAnimationFrame(() => {
        //     this.setState({
        //         rotation: this.state.rotation + 0.7
        //     })
        // })

        // function addZ(n) { return n < 10 ? '0' + n : '' + n; }
        // function getToday() {
        //     let today = new Date();
        //     let dd = today.getDate() - 1;
        //     let mm = today.getMonth() + 1; //January is 0
        //     let yyyy = today.getFullYear();
        //     return `${yyyy}_${addZ(mm)}_${addZ(dd)}`;
        // }

        // let picker = new Pikaday({
        //     field: document.getElementById('datepicker'),
        //     toString(date, format) {
        //         const day = date.getDate();
        //         const month = date.getMonth() + 1;
        //         const year = date.getFullYear();
        //         return `${year}_${addZ(month)}_${addZ(day)}`;
        //     },
        //     onSelect: function () {
        //         selectDate();
        //     },
        //     defaultDate: getToday()
        // });


        //initial queue, to load first data
        const searchDate = this.getDateFormat(date)
        console.log(searchDate)
        promises.push(d3.json, this.props.geoSunJson);
        // promises.push(d3.json, `./json/ALL/hyg${searchDate}_00_00_00.json`);
        promises.push(d3.json, this.props.geoStarJson);
        promises.push(d3.json, this.props.geoMeteorJson);
        

        Promise.all(promises).then(function(error) {
            if (!error) {
                console.log(error);
                console.log("[nq]could not read data");
            } else {
                console.log("[nq]loaded data");
                const suns = promises[1]
                const stars = promises[3]
                const meteors = promises[5]
                createD3(suns, stars, meteors);
            }
        });

        // Create sphere
        function createD3(suns, stars, meteors) {
            // console.log(currentEvent)
            let currentEvent = () => require("d3-selection").event;
            console.log("[d3] Got data.")
            d3.select('#orthographic').select("svg").remove()

            let width = 700;
            let height = 700;

            // Select the container div and append the SVG element
            let div = d3.select('#orthographic')
            let svg = div.append('svg')
                .attr('width', width)
                .attr('height', height);

            // // Background image
            // let img = svg.append('svg:image')
            //     // .attr('xlink:href', 'json/ALL/background.jpg')
            //     .attr('width', 700)
            //     .attr('height', 700)
            //     .attr('x', 0)
            //     .attr('y', 0)
            //     .style('opacity', 0.2);

            //Store the current rotation
            let rotate = { x: 289, y: 0 };

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
                //                        .style('fill', 'url(#daylightGradient)')
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
                //                       .range(['rgb(255,255,255)', 'rgb(118,3,247)', 'rgb(14,3,247)', 'rgb(6,101,247)', 'rgb(32,247,3)', 'rgb(250,235,3)', 'rgb(250,119,3)', 'rgb(250,15,3)']);
                .range(['rgb(255,255,255)', 'rgb(160,32,240)', 'rgb(0,0,255)', 'rgb(0,165,255)', 'rgb(0,255,0)', 'rgb(255,255,0)', 'rgb(255,165,0)', 'rgb(255,0,0)']);

            // Size of symbol
            // METEOR
            let rMeteorScale = d3.scaleLinear()
                .domain(d3.extent(meteors.features, function (d) { return d.properties.mag; }))
                .range([0, 3]);

            // STAR
            let rStarScale = d3.scaleLinear()
                .domain(d3.extent(stars.features, function (d) { return d.properties.mag; }))
                .range([2.5, 1]);

            // SUN
            let rSunScale = d3.scaleLinear()
                .domain(d3.extent(suns.features, function (d) { return d.properties.mag; }))

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
            let handleMouseOver = function (d) {
                console.log(d)

                let popup = `<div class="popup" style="top:${currentEvent.y}px;left:${currentEvent.x}px">${d.properties.name}</div>`;

                let info = `<div class="info" style="top:200px;left:150px"><a> <span>sl : ${parseFloat(d.properties.sol).toFixed(3)}<br>&lambda; : ${parseFloat(d.geometry.coordinates[0]).toFixed(2)} <br>&beta; : ${parseFloat(d.geometry.coordinates[1]).toFixed(2)} <br>Vg : ${parseFloat(d.properties.velocg).toFixed(2)}</span></a></div>`;

                d3.select('body').append(popup);
                d3.select('body').append(info);
            }

            let handleMouseOut = function () {
                d3.select('.popup').remove();
                d3.select('.info').remove();

            }

            let handleMouseClick = function (d) {

                window.open('https://www.meteorshowers.org/view/iau-' + d.properties.name);
            }

            // Place data points
            // METEOR
            let meteorsDataPoint = svg.selectAll('path.meteor').data(meteors.features)
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
                    handleMouseOver(d);
                })
                .on("mouseout", handleMouseOut);

            // STAR
            let starsDataPoint = svg.selectAll('path.star').data(stars.features)
                .enter().append('path')
                .attr('class', 'star')
                .attr('d', starPath)
                .attr('stroke', 'black')
                .attr('stroke-width', '1');

            // Create a radial gradient for sun image
            svg.append('defs')
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
                    { offset: '100%', color: '#FB8933' }
                ])

                .enter().append('stop')
                .attr('offset', function (d) { return d.offset; })
                .attr('stop-color', function (d) { return d.color; });

            // SUN
            let sunsDataPoint = svg.selectAll('path.sun').data(suns.features)
                .enter().append('path')
                .attr('class', 'sun')
                .attr('d', sunPath)
                .attr('cx', '50%')
                .attr('cy', '50%')
                .attr('r', '50%')
                .style('fill', 'yellow')
                .attr('stroke', 'yellow')
                .attr('stroke-width', '10')
                .selectAll('stop')
                .data([
                    { offset: '0%', color: '#FFF76B' },
                    { offset: '50%', color: '#FFF845' },
                    { offset: '90%', color: '#FFDA4E' },
                    { offset: '100%', color: '#FB8933' }
                ])

                .enter().append('stop')
                .attr('offset', function (d) { return d.offset; })
                .attr('stop-color', function (d) { return d.color; });

            // Drag behavior
            let rotationComplete = false;

            let dragBehavior = d3.drag()
                .subject(Object)
                .on('drag', drag)
                
            function drag(d) {
                
                // d3.select('#orthographic').select("svg")
                //     .attr("x", d.x = currentEvent.x)
                //     .attr("y", d.y = currentEvent.y);
                // console.log(getEvent());
                if (!currentEvent || !rotationComplete) {
                    currentEvent = { 'x': 5 * d.x, 'y': 0 }
                }
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
            let i = 20;

            let globeRotationInterval = setInterval(function () {
                drag({ 'x': 1 * (i - 1) + 270, 'y': 0 });
                i--;
                if (i === 0) {
                    rotationComplete = true;
                    clearInterval(globeRotationInterval);
                }
            }, 30);
            d3.select(window).on("load", globeRotationInterval);

            d3.text("./Data.csv", function (data) {
                let parsedCSV = d3.csv.parseRows(data);
                d3.select('#table3').select("table").remove();
                let div = d3.select('#table3')
                svg = div.append('table')
                    .attr('width', '690')
                    .   attr('height', '50')
                    .style('border-collapse', 'collapse')
                    .style('border', '2px black solid')

                    .selectAll("tr")
                    .data(parsedCSV).enter()
                    .append("tr")

                    .selectAll("td")
                    .data(function (d) { return d; }).enter()
                    .append("td")
                    .style("border", "1px black solid")
                    .style("padding", "5px")
                    .text(function (d) { return d; })
                    .style("font-size", "12px");
            });

        }


        return (
            // <svg width={this.props.size} height={this.props.size}>
            //     <path d={pathString} />
            // </svg>
            <div id="orthographic"></div>
        )
    }
}
  
export default Globe;                 