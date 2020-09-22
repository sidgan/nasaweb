import React, { useState } from 'react';
import ReactGlobe from 'react-globe';
// import { getSunData } from '../sources/sun';

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";


const colorScale = code => {
    if (code <= 7) {
        return "rgb(255,255,255)"
    }
    else if (code > 7 && code <= 17) {
        return "rgb(160,32,240)"
    }
    else if (code > 17 && code <= 37) {
        return "rgb(0,0,255)"
    }
    else if (code > 37 && code <= 47) {
        return "rgb(0,165,255)"
    }
    else if (code > 47 && code <= 57) {
        return "rgb(0,255,0)"
    }
    else if (code > 57 && code <= 67) {
        return "rgb(255,255,0)"
    }
    else if (code > 57 && code <= 120) {
        return "rgb(255,165,0)"
    }
    else {
        return "rgb(255,0,0)"
    }
}

const getDataPoints = (d) => {
    let date = "2020_09_22";

    const sunMarkers = [require('../json/sun.json')];
    const starMarkers = require(`../json/hyg.json`);
    const meteorMarkers = require(`../json/hyg${date}_00_00_00.json`);

    let sourceMarkers = [];

    sunMarkers.forEach(m => {
        sourceMarkers.push(
            {
                id: sourceMarkers.length,
                color: "#FDB800",
                name: "Sun",
                coordinates: [...m.features[0].geometry.coordinates],
                value: 35,
            }
        )
    });

    starMarkers.features.forEach(m => {
        sourceMarkers.push(
            {
                id: sourceMarkers.length,
                color: "black",
                name: "Star",
                coordinates: [...m.geometry.coordinates],
                value: 28,
            }
        )
    });

    meteorMarkers.features.forEach(m => {
        sourceMarkers.push(
            {
                id: sourceMarkers.length,
                color: colorScale(m.properties.color),
                name: m.properties.name,
                coordinates: [...m.geometry.coordinates],
                value: 30,
            }
        )
    });

    return sourceMarkers
}



const GlobeObject = props => {
    
    const randomMarkers = getDataPoints(props.date).map((marker) => ({
        ...marker,
    }));

    const [markers] = useState([...randomMarkers]);
    const [globe, setGlobe] = useState(null);

    const markerTooltipRenderer = marker => {
        return `IAU NAME: ${marker.name} (Number: ${marker.id})`;
    }
      

    const options = {
        ambientLightColor: "grey",
        enableMarkerGlow: true,
        enableMarkerTooltip: true,
        ambientLightIntensity: 1,
        markerTooltipRenderer: markerTooltipRenderer,
        markerRadiusScaleRange: [0.001, 0.02],
        markerType: 'dot',
        cameraAutoRotateSpeed: 0.5,
        globeCloudsOpacity: 0.5,
        markerGlowPower: 7.5
    };


    console.log(globe); // captured globe instance with API methods

    return (
        <section>
            <ReactGlobe
                height={800}
                markers={markers}
                options={options}
                width="100%"
                onGetGlobe={setGlobe}
                globeCloudsTexture={null}
            />
        </section>
    );
}


export default GlobeObject;    