import React, { useState, useCallback, useEffect } from 'react';
import ReactGlobe from 'react-globe';
import Responsive from 'react-responsive-decorator';
import axios from 'axios';
import StickyHeadTable from './Table';
import Header from './Header';
import ZoomButton from './ZoomButton';
import globeTextureImage from '../images/globe_bg.png';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

// Context Manager
export const DateContext = React.createContext()
export const SourceContext = React.createContext()

const colorScale = (code) => {
  if (code <= 0) {
    return 'rgb(255,255,255,0.8)';
  } else if (code > 0 && code <= 20) {
    return 'rgb(160,32,240,0.8)';
  } else if (code > 20 && code <= 30) {
    return 'rgb(0,0,255,0.8)';
  } else if (code > 30 && code <= 40) {
    return 'rgb(0,165,255,0.8)';
  } else if (code > 40 && code <= 50) {
    return 'rgb(0,255,0,0.8)';
  } else if (code > 50 && code <= 60) {
    return 'rgb(255,255,0,0.8)';
  } else if (code > 60 && code <= 70) {
    return 'rgb(255,165,0,0.8)';
  } else {
    return 'rgb(255,0,0,0.8)';
  }
};

const MainSection = (props) => {

  const [date, setDate] = useState(`${new Date().toISOString().slice(0, 10)}`);
  const [source, setSource] =  useState(`ALL`);

  const [markers, setMarkers] = useState([]);
  const [globe, setGlobe] = useState(null);

  const handleDateChange = (d) => {
    if (d === date) {
      console.log('Updated!');
    } else {
      setDate(d);
    }
  };
  const handleSourceChange = (d) => {
    if (d === source) {
      console.log('Updated!');
    } else {
      setSource(d);
    }
  };

  const updateMarkers = useCallback((meteors, stars) => {
    let newMarkers = [];
    const sunMarkers = [require('../json/sun.json')];
    const meteorNames = require('../json/showers.json');

    meteors.forEach((m) => {
      newMarkers.push({
        id: m.id,
        iau: m.iau,
        name: meteorNames[m.iau],
        color: colorScale(m.color),
        coordinates: [m.location.coordinates[1], m.location.coordinates[0]],
        velocg: m.velocg,
        mag: m.mag,
        sol: m.sol,
        value: 20,
      });
    });

    sunMarkers.forEach((m) => {
      newMarkers.push({
        id: newMarkers.length,
        color: '#FDB800',
        name: 'Sun',
        coordinates: [...m.features[0].geometry.coordinates],
        value: 50,
      });
    });

    stars.forEach((m) => {
      newMarkers.push({
        id: m.id,
        color: 'black',
        name: 'Star',
        coordinates: [...m.location.coordinates],
        value: 18,
      });
    });

    setMarkers(newMarkers);
  }, []);

  const fetchData = useCallback(async () => {
    setMarkers([]);
      
    // FETCH FROM ALL ENDPOINTS WITH ASYNC
    let meteors =
      'https://meteorshowers.seti.org/api/meteor';
    let stars =
      'https://meteorshowers.seti.org/api/star';

    // Pull using promises
    const requestMeteors = await axios.get(meteors, {
      params: {
        source: `${source}`,
        date: `${date}`,
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    });

    const requestStars = await axios.get(stars, {
      params: {
        date: `${date}`,
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    });

    await axios
      .all([requestMeteors, requestStars])
      .then(
        await axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];

          updateMarkers(responseOne.data.meteors, responseTwo.data.stars);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, [date, source, updateMarkers]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const markerTooltipRenderer = (marker) => {
    return `${marker.name}`;
  };

  const options = React.useMemo(() => {
    return {
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
    }
  }, []);

  const initialCoordinates = React.useMemo(() => {
    return [0, 0];
  }, []); // add dependecisies to useMemo where appropriate

  const globeTexture = React.useMemo(() => {
    return globeTextureImage
  }, [])

  console.log(globe); // captured globe instance with API methods

  return (
    <section>
      <DateContext.Provider value={date}>
        <SourceContext.Provider value={source}>
          <Header
            onDateChange={handleDateChange}
            onSourceChange={handleSourceChange}
            />
        </SourceContext.Provider>
      </DateContext.Provider>

      <div className="zoom-1">
        <ZoomButton />
      </div>

      {props.showGlobe ? (
        <ReactGlobe
          height={'95vh'}
          markers={markers}
          options={options}
          width="100%"
          onGetGlobe={setGlobe}
          globeCloudsTexture={null}
          globeTexture={globeTexture}
          globeBackgroundTexture={null}
          initialCoordinates={initialCoordinates}
          initialCameraDistanceRadiusScale={3.5}
        />
      ) : (
        <StickyHeadTable markers={markers} />
      )}
    </section>
  );
};

export default React.memo(Responsive(MainSection));
