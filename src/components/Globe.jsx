import React, { useState, useCallback, useEffect, Suspense } from 'react';
import axios from 'axios';
import Responsive from 'react-responsive-decorator';
import Header from './Header';
import Preloader from './Preloader';
import ZoomButton from './ZoomButton'

import globeTextureImage from '../images/background.jpg';

import './style.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

// Lazy Loading React COmponent
const ReactGlobe = React.lazy(() => import('react-globe.gl'));
const StickyHeadTable = React.lazy(() => import('./Table'));
// const Header = React.lazy(() => import('./Header'));

// Context Manager
export const DateContext = React.createContext(`${new Date().toISOString().slice(0, 10)}`)
export const SourceContext = React.createContext(`ALL`)

const colorScale = (colorCode) => {
  let code = parseFloat(colorCode);

  if (code <= 0) {
    return 'rgba(255, 255, 255, 0.6)';
  } else if (code > 0 && code <= 20) {
    return 'rgba(160, 32, 240, 0.6)';
  } else if (code > 20 && code <= 30) {
    return 'rgba(0, 0, 255, 0.6)';
  } else if (code > 30 && code <= 40) {
    return 'rgba(0, 165, 255, 0.6)';
  } else if (code > 40 && code <= 50) {
    return 'rgba(0, 255, 0, 0.6)';
  } else if (code > 50 && code <= 60) {
    return 'rgba(255, 255, 0, 0.6)';
  } else if (code > 60 && code <= 70) {
    return 'rgba(255, 165, 0, 0.6)';
  } else {
    return 'rgba(255, 0, 0, 0.6)';
  }
};


const starScale = (colorCode) => {
  let code = parseFloat(colorCode);

  if (code <= 0) {
    return "rgb(0, 0, 0, 0.062)";
  } else if (code <= 1) {
    return "rgb(0, 0, 0, 0.534)";
  } else {
    return "rgb(0, 0, 0, 0.719)";
  }
}

const MainSection = (props) => {

  const globeEl = React.useRef();
  const [alt, setAlt] = useState(2);

  const [date, setDate] = useState(React.useContext(DateContext));
  const [source, setSource] =  useState(React.useContext(SourceContext));

  const [markers, setMarkers] = useState([]);

  const handleDateChange = (d) => {
    if (d === date) {
      console.log(`Updated! ${d} - ${date}`);
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

  const handleZoomIn = () => {
    let altitude = parseFloat(alt - 0.5);
    globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: altitude });
    setAlt(altitude);
  };
  const handleZoomOut = () => {
    let altitude = parseFloat(alt + 0.5);
    globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: altitude });
    setAlt(altitude);
  };

  const updateMarkers = useCallback((meteors, stars) => {
    let newMarkers = [];
    const sunMarkers = [require('../json/sun.json')];

    meteors.forEach((m) => {
      newMarkers.push({
        id: newMarkers.length,
        iau: m.iau,
        name: m.name,
        type: "meteor",
        color: colorScale(m.color),
        lat: m.location.coordinates[1],
        lng: m.location.coordinates[0],
        velocg: m.velocg,
        mag: m.mag,
        sol: m.sol,
        size: 0.4,
        alt: 0.01
      });
    });

    sunMarkers.forEach((m) => {
      newMarkers.push({
        id: newMarkers.length,
        color: '#FDB800',
        name: 'Sun',
        type: "",
        lat: 0,
        lng: 0,
        size: 1.5,
        alt: 0.02
      });
    });

    stars.forEach((m) => {
      newMarkers.push({
        id: m.id,
        color: starScale(m.color),
        name: 'Star',
        type: 'star',
        lat: m.location.coordinates[1],
        lng: m.location.coordinates[0],
        // coordinates: [m.location.coordinates[1], m.location.coordinates[0]],
        size: 0.35,
        alt: 0
      });
    });

    setMarkers(newMarkers);
  }, []);

  const markerTooltip = (marker) => {
    return `<h2>${marker.name}</h2>`;
  };

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
            console.log(date);
            console.log(responseOne.data.meteors);
            console.log(responseTwo.data.stars);
            updateMarkers(responseOne.data.meteors, responseTwo.data.stars);
          })
        )
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, [date, source, updateMarkers]);

  console.log(globeEl.current);

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

      

      {props.showGlobe ? (
        <Suspense fallback={<Preloader />}>
          <ReactGlobe
            ref={globeEl}
            width={1800}

            backgroundColor='#1C00ff00'
            backgroundImageUrl={null}
            showGraticules={true}
            globeImageUrl={globeTextureImage}
            bumpImageUrl={globeTextureImage}

            pointsData={markers}
            pointLabel={markerTooltip}
            pointLat="lat"
            pointLng="lng"
            pointRadius="size"
            pointColor="color"
            pointAltitude="alt"
            pointsTransitionDuration={2000}
          />
        </Suspense>
          
      ) : (
        <Suspense fallback={<Preloader />}>
          <StickyHeadTable markers={markers} />
          </Suspense>
      )}

      
    </section>
  );
};

export default React.memo(Responsive(MainSection));
