import { Component } from "react";
import * as d3 from 'd3';

import './styles.css';

class Globe extends Component {
    
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        console.log("Globe Component is Open!");
        console.log(this.state.today);

        let accessRef = d3.select(this.myRef.current);

    }

    createD3 = ({suns, stars, meteors}) => {
        // Creating The Sphere
        console.log("[d3] Got data.")
        d3.select(this.myRef.current).select("svg").remove()

        const width = 700;
        const height = 700;
        // Select the container div and append the SVG element
        const div = d3.select('#orthographic'),
            svg = div.append('svg')
                .attr('width', width)
                .attr('height', height);

        // Background image
        const img = svg.append('svg:image')
            .attr('xlink:href', 'json/ALL/background.jpg')
            .attr('width', 700)
            .attr('height', 700)
            .attr('x', 0)
            .attr('y', 0)
            .style('opacity', 0.2);

        //Store the current rotation
        const rotate = { x: 289, y: 0 };

        //Create and configure an instance of the orthographic proj.
        const projection = d3.geo.orthographic()
            .scale(1.5 * height / Math.PI)
            .translate([width / 2, height / 2])
            .clipAngle(90)
            .rotate([rotate.x / 1, -rotate.y / 1]);

        // Create a radial nighttime gradient for sphere
        const sphereGradient = svg.append('defs')
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
        const overlay = svg.selectAll('circle').data([rotate])
            .enter().append('circle')
            .attr('r', height / 2)
            .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
            .attr('class', 'overlay')
            .attr('fill-opacity', 0.0);

        // Create and configure the geographic path generator
        // METEOR
        const meteorPath = d3.geo.path().projection(projection);
        // STAR
        const starPath = d3.geo.path().projection(projection);
        // SUN
        const sunPath = d3.geo.path().projection(projection);

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
        const graticule = d3.geo.graticule();

        const lines = svg.selectAll('path.graticule').data([graticule()])
            .enter().append('path')
            .attr('class', 'graticule')
            .attr('d', meteorPath);

        // Get color info
        // METEOR+STARS+SUN
        const color_scale = d3.scale
            .linear()
            .domain([0, 7, 17, 27, 37, 47, 57, 67, 120])
            //                       .range(['rgb(255,255,255)', 'rgb(118,3,247)', 'rgb(14,3,247)', 'rgb(6,101,247)', 'rgb(32,247,3)', 'rgb(250,235,3)', 'rgb(250,119,3)', 'rgb(250,15,3)']);
            .range(['rgb(255,255,255)', 'rgb(160,32,240)', 'rgb(0,0,255)', 'rgb(0,165,255)', 'rgb(0,255,0)', 'rgb(255,255,0)', 'rgb(255,165,0)', 'rgb(255,0,0)']);

        // Size of symbol
        // METEOR
        const rMeteorScale = d3.scale
            .linear()
            .domain(d3.extent(meteors.features, function (d) { return d.properties.mag; }))
            .range([0, 3]);

        // STAR
        const rStarScale = d3.scale
            .linear()
            .domain(d3.extent(stars.features, function (d) { return d.properties.mag; }))
            .range([2.5, 1]);

        // SUN
        const rScale = d3.scale
            .linear()
            .domain(d3.extent(sun.features, function (d) { return d.properties.mag; }))


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
            return d.properties ? rScale(d.properties.mag) : 1;
        })

        //handle meteor mouse hover event
        const handleMouseOver = function (d) {

            let popup = '<div className="popup" style="top:' + d3.event.clientY + 'px;left:' + d3.event.clientX + 'px">' + '<a> &nbsp </a>' + d.properties.name + '</div>';

            let info = '<div className="info" style="top:200px;left:150px">' + '<a> <span>sl : ' + parseFloat(d.properties.sol).toFixed(3) + '<br>&lambda; : ' + parseFloat(d.geometry.coordinates[0]).toFixed(2) + ' <br>&beta; : ' + parseFloat(d.geometry.coordinates[1]).toFixed(2) + ' <br>Vg : ' + parseFloat(d.properties.velocg).toFixed(2) + '</span></a>' + '</div>';

            $('body').append(popup);
            $('body').append(info);
        }

        const handleMouseOut = function () {
            $('.popup').remove();
            $('.info').remove();

        }

        const handleMouseClick = function (d) {

            window.open('https://www.meteorshowers.org/view/iau-' + d.properties.name);
        }

        // Place data points
        // METEOR
        const meteorsDataPoint = svg.selectAll('path.meteor').data(meteors.features)
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
        const starsDataPoint = svg.selectAll('path.star').data(stars.features)
            .enter().append('path')
            .attr('class', 'star')
            .attr('d', starPath)
            .attr('stroke', 'black')
            .attr('stroke-width', '1');

        // Create a radial gradient for sun image
        const sunGradient = svg.append('defs')
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
        const sunsDataPoint = svg.selectAll('path.sun').data(suns.features)
            .enter().append('path')
            .attr('class', 'sun')
            .attr('d', sunPath)
            .style('fill', 'url(#sunGradient)')
            .attr('stroke', 'black')
            .attr('stroke-width', '1');

        // Drag behavior
        const dragBehavior = d3.behavior.drag()
            .origin(Object)
            .on('drag', drag);
        let rotationComplete = false;

        function drag(d) {

            if (!d3.event || !rotationComplete) {
                d3.event = { 'x': 5 * d.x, 'y': 0 }
            }
            projection.rotate([(d.x = d3.event.x), -(d.y = d3.event.y)]);
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
        const i = 20;

        const globeRotationInterval = setInterval(function () {
            drag({ 'x': 1 * (i - 1) + 270, 'y': 0 });
            i--;
            if (i === 0) {
                rotationComplete = true;
                clearInterval(globeRotationInterval);
            }
        }, 30);
        d3.select(window).on("load", globeRotationInterval);

        d3.text("json/ALL/Shower-Total_" + picker.toString('yyyy_mm_dd') + "_00_00_00.csv", function (data) {
            let parsedCSV = d3.csv.parseRows(data);
            d3.select('#table3').select("table").remove();
            let div = d3.select('#table3')
            svg = div.append('table')
                .attr('width', '690')
                .attr('height', '50')
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


    render() { 
        return (
            <div ref={this.myRef}></div>
        );
    }
}
 
export default Globe;  