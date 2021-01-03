import React, { useState, useCallback, useEffect, Suspense } from 'react';
import axios from 'axios';
import Responsive from 'react-responsive-decorator';
import Header from './Header';
import Preloader from './Preloader';
import ZoomButton from './ZoomButton'

import globeTextureImage from '../images/globe_bg.png';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

// Lazy Loading React COmponent
const ReactGlobe = React.lazy(() => import('react-globe'));
const StickyHeadTable = React.lazy(() => import('./Table'));
// const Header = React.lazy(() => import('./Header'));

// Context Manager
export const DateContext = React.createContext(`${new Date().toISOString().slice(0, 10)}`)
export const SourceContext = React.createContext(`ALL`)

const colorScale = (colorCode) => {
  let code = parseFloat(colorCode);

  if (code <= 0) {
    return '#ffffff';
  } else if (code > 0 && code <= 20) {
    return '#a020f0';
  } else if (code > 20 && code <= 30) {
    return '#0000ff';
  } else if (code > 30 && code <= 40) {
    return '#00a5ff';
  } else if (code > 40 && code <= 50) {
    return '#00ff00';
  } else if (code > 50 && code <= 60) {
    return '#ffff00';
  } else if (code > 60 && code <= 70) {
    return '#ffa500';
  } else {
    return '#ff0000';
  }
};


const starScale = (colorCode) => {
  let code = parseFloat(colorCode);

  if (code < 0) {
    return "rgb(0, 0, 0, 0.062)";
  } else if (code === 0) {
    return "rgb(0, 0, 0, 0.253)";
  } else if (code > 0 && code <= 1) {
    return "rgb(0, 0, 0, 0.534)";
  } else {
    return "rgb(0, 0, 0, 0.719)";
  }
}

const MainSection = (props) => {

  const [date, setDate] = useState(React.useContext(DateContext));
  const [source, setSource] =  useState(React.useContext(SourceContext));

  const [markers, setMarkers] = useState([]);

  const [globeDistance] = useState(3.5);
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

    meteors.forEach((m) => {
      newMarkers.push({
        id: newMarkers.length,
        iau: m.iau,
        name: m.name,
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
        color: starScale(m.color),
        name: 'Star',
        coordinates: [m.location.coordinates[1], m.location.coordinates[0]],
        value: 18,
      });
    });

    setMarkers(newMarkers);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
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
            console.log(responseOne.data.meteors);
            // empty the markers state
            setMarkers([]);
            updateMarkers(responseOne.data.meteors, responseTwo.data.stars);
          })
        )
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, [date, source, updateMarkers]);

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
      enableCameraAutoRotate: true,
      markerEnterAnimationDuration: 500,
      markerExitAnimationDuration: 500
    }
  }, []);

  const initialCoordinates = React.useMemo(() => {
    return [10.31, 151.69];
  }, []); // add dependecisies to useMemo where appropriate

  const globeTexture = React.useMemo(() => {
    return globeTextureImage
  }, [])

  const zoomDistance = React.useMemo(() => {
    return globeDistance
  }, [globeDistance])

  const handleZoomIn = () => {
    // let newX = globeDistance + 0.5;
    // setGlobeDistance(newX)
    console.log("Attempt to zoom in")
  };

  const handleZoomOut = () => {
    // let newX = globeDistance - 0.5;
    // setGlobeDistance(newX)
    console.log("Attempt to zoom out")
  };

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
        <ZoomButton
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
        />
      </div>

      <Suspense fallback={<Preloader />}>

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
            initialCameraDistanceRadiusScale={zoomDistance}
          />
            
        ) : (
          <StickyHeadTable markers={markers} />
        )}

      </Suspense>
    </section>
  );
};

export default React.memo(Responsive(MainSection));
