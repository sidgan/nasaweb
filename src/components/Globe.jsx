import React, { useState, useCallback, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import ReactGlobe from 'react-globe';
import Responsive from 'react-responsive-decorator';
import axios from 'axios';
import Header from './Header';
import ZoomButton from './ZoomButton';
// import DataTooltip from './Tooltip';

import globeTexture from '../images/globe_bg.png';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';


const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: 'rgba(71, 78, 116, 0.6)',
    color: "primary",
    maxWidth: 250,
    maxHeight: 250,
    marginBlock: '3px',
    border: '1px solid #474E74',
  },
}))(Tooltip);


const colorScale = (code) => {
  if (code <= 7) {
    return 'rgb(255,255,255,0.8)';
  } else if (code > 7 && code <= 17) {
    return 'rgb(160,32,240,0.8)';
  } else if (code > 17 && code <= 37) {
    return 'rgb(0,0,255,0.8)';
  } else if (code > 37 && code <= 47) {
    return 'rgb(0,165,255,0.8)';
  } else if (code > 47 && code <= 57) {
    return 'rgb(0,255,0,0.8)';
  } else if (code > 57 && code <= 67) {
    return 'rgb(255,255,0,0.8)';
  } else if (code > 67 && code <= 120) {
    return 'rgb(255,165,0,0.8)';
  } else {
    return 'rgb(255,0,0,0.8)';
  }
};


const GlobeObject = (props) => {

  const addZ = (n) => {
    return n < 10 && n.length === 1 ? '0' + n : '' + n;
  };
  const getMonthFromString = (mon) => {
    return new Date(Date.parse(mon + ' 1, 2012')).getMonth() + 1;
  };

  const getDateFormat = (d) => {
    let res = d.split(' ');
    let month = getMonthFromString(res[1]);

    return `${res[3]}-${addZ(String(month))}-${addZ(res[2])}`;
  };

  const [date, setDate] = useState(getDateFormat(`${new Date().toDateString()}`))
  const [markers, setMarkers] = useState([]);
  const [globe, setGlobe] = useState(null);


  const handleDateChange = (d) => {
    let newDate = d;
    console.log("working", d)

    if (newDate === date) {
      console.log("Updated!");
      // setFormatDate(datePickerUpdate(date));
    } else {
      setDate(newDate);
    };
  };

  const updateMarkers = (markers) => {
    let newMarkers = [];
    const meteorNames = require('../json/showers.json');
    const sunMarkers = [require('../json/sun.json')];
    const starMarkers = require(`../json/hyg.json`);

    sunMarkers.forEach((m) => {
      newMarkers.push({
        id: newMarkers.length,
        color: '#FDB800',
        name: 'Sun',
        coordinates: [...m.features[0].geometry.coordinates],
        value: 50,
      });
    });

    starMarkers.features.forEach((m) => {
      newMarkers.push({
        id: newMarkers.length,
        color: 'black',
        name: 'Star',
        coordinates: [...m.geometry.coordinates],
        value: 18,
      });
    });

    markers.forEach(m => {
      newMarkers.push({
        id: m.id,
        iau: m.iau,
        name: meteorNames[m.iau],
        color: colorScale(m.color),
        coordinates: [...m.location.coordinates],
        velocg: m.velocg,
        mag: m.mag,
        sol: m.sol,
        value: 25
      })
    });

    setMarkers([...newMarkers]);
  };

  const markerTooltipRenderer = (marker) => {
    return(
      <HtmlTooltip title={`${marker.name}`}>
      </HtmlTooltip>
    );
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

  const pullData = useCallback(async () => {
    console.log(`${date}`)
    const response = await axios.get("https://cors-anywhere.herokuapp.com/http://voren3.seti.org/api/meteor", {
      params: {
        source: "ALL",
        date: `${date}`
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    })

    updateMarkers(response.data.meteors)
  }, [date]);

  useEffect(() => {
    pullData();
  }, [pullData])

  return (
    <section>
      <Header
        selectedDate={date}
        onDateChange={handleDateChange}
      />

      <div className="zoom-1">
        <ZoomButton />
      </div>
      
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

export default React.memo(Responsive(GlobeObject));
        