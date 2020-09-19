import React, { useState } from 'react';
import ReactGlobe from 'react-globe';
// import { getSunData } from '../sources/sun';

const sunMarkers = [require('../json/sun.json')];
const starMarkers = require(`../json/hyg.json`);

let sourceMarkers = [];

sunMarkers.forEach(m => {
    sourceMarkers.push(
        {
            id: sourceMarkers.length,
            color: "yellow",
            name: m.type,
            coordinates: m.features[0].geometry.coordinates,
        }
    )
});

starMarkers.features.forEach(m => {
    sourceMarkers.push(
        {
            id: sourceMarkers.length,
            color: m.properties.color,
            name: m.type,
            coordinates: m.geometry.coordinates,
        }
    )
});

const GlobeObject = () => {

    const options = {
        markerTooltipRenderer: marker => `NAME: ${marker.features.properties.name} (Value: ${marker.type})`,
    };

    const [ markers ] = useState(sourceMarkers);


    const [globe, setGlobe] = useState(null);
    console.log(globe); // captured globe instance with API methods

    return (
        <ReactGlobe
            height={800}
            width="100%"
            markers={markers}
            options={options}
            onGetGlobe={setGlobe}
        />
    );
}


export default GlobeObject;