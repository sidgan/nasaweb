import React, { useState, useEffect } from 'react';
import Header from './Header';
import ReactGlobe from 'react-globe';
import Responsive from 'react-responsive-decorator';
// import starBackground from '../images/background.png';
import globeTexture from '../images/globe_bg.png';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const colorScale = (code) => {
  if (code <= 7) {
    return 'rgb(255,255,255)';
  } else if (code > 7 && code <= 17) {
    return 'rgb(160,32,240)';
  } else if (code > 17 && code <= 37) {
    return 'rgb(0,0,255)';
  } else if (code > 37 && code <= 47) {
    return 'rgb(0,165,255)';
  } else if (code > 47 && code <= 57) {
    return 'rgb(0,255,0)';
  } else if (code > 57 && code <= 67) {
    return 'rgb(255,255,0)';
  } else if (code > 67 && code <= 120) {
    return 'rgb(255,165,0)';
  } else {
    return 'rgb(255,0,0)';
  }
};


const GlobeObject = (props) => {

  const getDataPoints = (date) => {
    console.log("Updating Globe Component");
    const meteorNames = require('../json/showers.json');
    const sunMarkers = [require('../json/sun.json')];
    const starMarkers = require(`../json/hyg.json`);
    const meteorMarkers = require(`../json/ALL/${date}_00_00_00.json`);

    let sourceMarkers = [];

    sunMarkers.forEach((m) => {
      sourceMarkers.push({
        id: sourceMarkers.length,
        color: '#FDB800',
        name: 'Sun',
        coordinates: [...m.features[0].geometry.coordinates],
        value: 50,
      });
    });

    starMarkers.features.forEach((m) => {
      sourceMarkers.push({
        id: sourceMarkers.length,
        color: 'black',
        name: 'Star',
        coordinates: [...m.geometry.coordinates],
        value: 18,
      });
    });

    meteorMarkers.features.forEach((m) => {
      sourceMarkers.push({
        id: sourceMarkers.length,
        color: colorScale(m.properties.color),
        name: meteorNames[m.properties.name],
        coordinates: [...m.geometry.coordinates],
        value: 25,
      });
    });

    return sourceMarkers;
  };


  const randomMarkers = getDataPoints(props.date).map((marker) => ({
    ...marker,
  }));


  const [markers, setMarkers] = useState([...randomMarkers]);
  const [globe, setGlobe] = useState(null);

  const markerTooltipRenderer = (marker) => {
    return `${marker.name} \n`;
  };

  const options = {
    ambientLightColor: 'white',
    enableGlobeGlow: true,
    globeGlowCoefficient: 0.01,
    globeGlowRadiusScale: 0.1,
    globeGlowPower: 2.5,
    globeCloudsOpacity: 0.5,
    markerGlowPower: 15,
    enableMarkerGlow: true,
    enableMarkerTooltip: true,
    ambientLightIntensity: 0.4,
    markerTooltipRenderer: markerTooltipRenderer,
    markerRadiusScaleRange: [0.003, 0.02],
    enableCameraZoom: true,
    enableDefocus: false,
    markerType: 'dot',
    cameraAutoRotateSpeed: 0.5,
  };

  console.log(globe); // captured globe instance with API methods

  // This updates the markers
  useEffect(() => {
    return () => { 
      const newMarkers = getDataPoints(props.date).map((marker) => ({
        ...marker,
      }));
      setMarkers([...newMarkers])
    }
  }, [props.date])


  return (
    <section>
      <Header
        selectedDate={props.selectedDate}
        onDateChange={props.onDateChange}
      />
      
      <ReactGlobe
        height={'95vh'}
        markers={markers}
        options={options}
        width="100%"
        onGetGlobe={setGlobe}
        globeCloudsTexture={null}
        globeTexture={globeTexture}
        globeBackgroundTexture={null}
        initialCameraDistanceRadiusScale={3.5}
      />
    </section>
  );
};

export default Responsive(GlobeObject);
        