import React, { useState, useCallback, useEffect, Suspense } from 'react';
import axios from 'axios';
import Responsive from 'react-responsive-decorator';
import Header from './Header';
import Preloader from './Preloader';
import ZoomButton from './ZoomButton'

import globeTextureImage from '../images/background.jpg';

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


// const starScale = (colorCode) => {
//   let code = parseFloat(colorCode);

//   if (code <= 0) {
//     return "rgb(0, 0, 0, 0.062)";
//   } else if (code <= 1) {
//     return "rgb(0, 0, 0, 0.534)";
//   } else {
//     return "rgb(0, 0, 0, 0.719)";
//   }
// }

const MainSection = (props) => {

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
    // let newX = globeDistance + 0.5;
    // setGlobeDistance(newX)
    console.log("Attempt to zoom in")
  };
  const handleZoomOut = () => {
    // let newX = globeDistance - 0.5;
    // setGlobeDistance(newX)
    console.log("Attempt to zoom out")
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
      });
    });

    stars.forEach((m) => {
      newMarkers.push({
        id: m.id,
        color: '#000000',
        name: 'Star',
        type: 'star',
        lat: m.location.coordinates[1],
        lng: m.location.coordinates[0],
        // coordinates: [m.location.coordinates[1], m.location.coordinates[0]],
        size: 0.35,
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
            console.log(date);
            console.log(responseOne.data.meteors);
            console.log(responseTwo.data.stars);
                // empty the markers state
            
            updateMarkers(responseOne.data.meteors, responseTwo.data.stars);
          })
        )
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, [date, source, updateMarkers]);


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
            width={1800}

            backgroundColor='#1C00ff00'
            backgroundImageUrl={null}
            showGraticules={true}
            globeImageUrl={globeTextureImage}
            bumpImageUrl={globeTextureImage}

            pointsData={markers}
            pointLat="lat"
            pointLng="lng"
            pointRadius="size"
            pointColor="color"
            pointAltitude={0}


            // labelsData={markers}
            // labelLat="lat"
            // labelLng="lnh"
            // labelAltitude={() => 0 + 1e-6}
            // labelDotRadius={0.12}
            // labelDotOrientation={() => 'bottom'}
            // labelColor="color"
            // labelText="name"
            // labelSize={0.15}
            // labelResolution={1}


            // polygonsData={markers}
            // polygonLabel="name"
            // polygonGeoJsonGeometry="coordinates"
            // polygonCapColor={() => 'rgba(200, 0, 0, 0.6)'}
            // polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}

          />
            
        ) : (
          <StickyHeadTable markers={markers} />
        )}

      </Suspense>
    </section>
  );
};

export default React.memo(Responsive(MainSection));
