import React, { useState, useCallback, useEffect, Suspense } from 'react';
import Responsive from 'react-responsive-decorator';
// import * as THREE from "three";
import Header from './Header';
import Preloader from './Preloader';
import ZoomButton from './ZoomButton';
import DataTooltip from './Tooltip';

import globeTextureImage from '../images/background.jpg';
import NavigationContext from '../contexts/navigation';

import { fetchStars } from '../clients/star';
import { fetchMeteors } from '../clients/meteor';
import { fetchConstellations } from '../clients/constellation';

// Lazy Loading React Component
const ReactGlobe = React.lazy(() => import('react-globe.gl'));
const StickyHeadTable = React.lazy(() => import('./Table'));

const coordinatesData = [
  {
    name: "-80°",
    lat: -80,
    lng: -80,
    alt: 0.05,
    radius: 1,
    color: 'rgba(255, 255, 255, 0.5)'
  },
  {
    name: "-60°",
    lat: -60,
    lng: -80,
    alt: 0.05,
    radius: 1,
    color: 'rgba(255, 255, 255, 0.5)'
  },
  {
    name: "-40°",
    lat: -40,
    lng: -80,
    alt: 0.05,
    radius: 1,
    color: 'rgba(255, 255, 255, 0.5)'
  },
  {
    name: "-20°",
    lat: -20,
    lng: -80,
    alt: 0.05,
    radius: 1,
    color: 'rgba(255, 255, 255, 0.5)'
  },
  {
    name: "0°",
    lat: 0,
    lng: -80,
    alt: 0.05,
    radius: 1,
    color: 'rgba(255, 255, 255, 0.5)'
  },
  {
    name: "20°",
    lat: 20,
    lng: -80,
    alt: 0.05,
    radius: 1,
    color: 'rgba(255, 255, 255, 0.5)'
  },
  {
    name: "40°",
    lat: 40,
    lng: -80,
    alt: 0.05,
    radius: 1,
    color: 'rgba(255, 255, 255, 0.5)'
  },
  {
    name: "60°",
    lat: 60,
    lng: -80,
    alt: 0.05,
    radius: 1,
    color: 'rgba(255, 255, 255, 0.5)'
  },
  {
    name: "80°",
    lat: 80,
    lng: -80,
    alt: 0.05,
    radius: 1,
    color: 'rgba(255, 255, 255, 0.5)'
  },
]


const colorScale = (colorCode) => {
  let code = parseFloat(colorCode);

  if (code <= 0) {
    return 'rgba(255, 255, 255, 0.5)';
  } else if (code > 0 && code <= 20) {
    return 'rgba(160, 32, 240, 0.5)';
  } else if (code > 20 && code <= 30) {
    return 'rgba(0, 0, 255, 0.5)';
  } else if (code > 30 && code <= 40) {
    return 'rgba(0, 165, 255, 0.5)';
  } else if (code > 40 && code <= 50) {
    return 'rgba(0, 255, 0, 0.5)';
  } else if (code > 50 && code <= 60) {
    return 'rgba(255, 255, 0, 0.5)';
  } else if (code > 60 && code <= 70) {
    return 'rgba(255, 165, 0, 0.5)';
  } else {
    return 'rgba(255, 0, 0, 0.5)';
  }
};

const starScale = (colorCode) => {
  let code = parseFloat(colorCode);

  if (code <= 0) {
    return 'rgba(0, 0, 0, 0.4)';
  } else if (code <= 1) {
    return 'rgba(0, 0, 0, 0.6)';
  } else {
    return 'rgba(0, 0, 0, 0.8)';
  }
};

const starSizeScale = (colorCode) => {
  let code = parseFloat(colorCode) * 10;
  if (code <= -2.0 && code <= 0.9) return 0.46;
  else if (code >= 1.0 && code <= 10) {
    return 0.4;
  } else if (code >= 11 && code <= 20) {
    return 0.36;
  } else if (code >= 21 && code <= 30) {
    return 0.3;
  } else if (code >= 31 && code <= 40) {
    return 0.24;
  } else if (code >= 41 && code <= 50) {
    return 0.19;
  } else {
    return 0.12;
  }
};

const MainSection = (props) => {
  const globeEl = React.useRef();
  const [alt, setAlt] = useState(2);

  const [navigationState, setNavigationState] = useState(
    React.useContext(NavigationContext)
  );

  // Markers State
  const [markers, setMarkers] = useState([]);
  const [constellationMarkers, setConstellationMarkers] = useState([]);

  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] = useState('');

  const handleDateChange = (date) => {
    if (date !== navigationState.date) {
      setNavigationState({
        date: date,
        source: navigationState.source,
      });
    }
  };
  const handleSourceChange = (source) => {
    if (source !== navigationState.source) {
      setNavigationState({
        date: navigationState.date,
        source,
      });
    }
  };

  const handleZoomIn = () => {
    if (parseFloat(alt) !== 0.5) {
      let altitude = parseFloat(alt - 0.5);
      globeEl.current.pointOfView({ altitude: altitude });
      setAlt(altitude);
    }
  };

  const handleZoomOut = () => {
    if (parseFloat(alt) !== 5.5) {
      let altitude = parseFloat(alt + 0.5);
      globeEl.current.pointOfView({ altitude: altitude });
      setAlt(altitude);
    }
  };

  const updateMarkers = useCallback((meteors, stars, constellations) => {
    let newMarkers = [];
    let newConstellations = [];

    setShowDetail(false);
    const sunMarkers = [require('../json/sun.json')];

    meteors.forEach((m) => {
      newMarkers.push({
        id: m.id,
        iau: m.iau,
        name: m.name,
        type: 'meteor',
        color: colorScale(m.color),
        lat: m.location.coordinates[1],
        lng: m.location.coordinates[0],
        velocg: m.velocg,
        mag: m.mag,
        sol: m.sol,
        size: 0.4,
        alt: 0,
      });
    });

    sunMarkers.forEach((m) => {
      newMarkers.push({
        id: newMarkers.length,
        color: '#FDB800',
        name: 'Sun',
        type: '',
        lat: 0,
        lng: 0,
        size: 1.5,
        alt: 0,
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
        size: starSizeScale(m.mag),
        alt: 0,
      });
    });


    console.log(constellations);
    constellations.forEach((m) => {
      let name = m.name;

      for (let i = 0; i < m.points[0].length; i++) {

        let j = i + 1;
        if (j >= m.points[0].length) {
          j = 0
        } else {
          console.log(m.points[0][i])
        };

        newConstellations.push({
          points: m.points[0],
          id: newConstellations.length,
          name: name,
          startLat: m.points[0][i][0],
          startLng: m.points[0][i][1],
          endLat: m.points[0][j][0],
          endLng: m.points[0][j][1],
          color: "rgba(0, 0, 0, 0.5)"
        })
      }

      // m.points[0].forEach((i) => {
      //   let next = count + 1;
      //   newConstellations.push({
      //     id: newConstellations.length,
      //     name: name,
      //     startLat: i[0],
      //     startLng: i[1],
      //     endLat: m.points[0][next][0],
      //     endLng: m.points[0][next][1],
      //   })
      // });

    });

    setConstellationMarkers(newConstellations);
    setMarkers(newMarkers);
  }, []);

  const markerTooltip = (marker) => {
    return `<h2>${marker.name}</h2>`;
  };

  const markerInfoTip = (marker) => {
    setDetail(marker);

    if (detail === '' || showDetail === false) {
      setShowDetail(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const meteorRequest = fetchMeteors(
        navigationState.source,
        navigationState.date
      );
      const starsRequest = fetchStars(navigationState.date);
      const constellationRequest = fetchConstellations(navigationState.date);

      await Promise.all([meteorRequest, starsRequest, constellationRequest]).then((results) => {
        const [meteors, stars, constellations] = results;

        updateMarkers(meteors, stars, constellations);
      });
    };

    fetchData();
  }, [navigationState.date, navigationState.source, updateMarkers]);

  console.log(globeEl.current);

  return (
    <section>
      <Header
        onDateChange={handleDateChange}
        onSourceChange={handleSourceChange}
      />
      <div className="zoom-1">
        <ZoomButton onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      </div>

      <div className="content">
        {props.showGlobe ? (
          <Suspense fallback={<Preloader />}>
            <ReactGlobe
              ref={globeEl}
              width={window.innerWidth - 50}
              height={window.innerHeight}
              altitude={alt}
              backgroundColor="#1C00ff00"
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
              onPointClick={markerInfoTip}

              labelsData={coordinatesData}
              labelLat={d => d.lat}
              labelAltitude={d => d.alt}
              labelLng={d => d.lng}
              labelText={d => d.name}
              labelSize = {d => d.radius * 2}
              labelIncludeDot={false}
              labelColor={d => d.color}
              labelResolution={10}

              arcsData={constellationMarkers}
              arcLabel={d => d.name}
              arcStartLat={d => d.startLat}
              arcStartLng={d => d.startLng}
              arcEndLat={d => d.endLat}
              arcEndLng={d => d.endLng}
              arcColor={d => d.color}
              arcDashLength={1}
              arcDashGap={0.2}
              arcAltitude={0.1}

              // pathsData={constellationMarkers}
              // pathLabel={d => d.name}
              // pathPoints={d => d.points}
              // pathPointLat={d => d.startLat}
              // pathPointLng={d => d.startLng}
              // pathColor={d => d.color}
              // pathPointAlt={0.005}
              // pathDashLength={0.8}
              // pathDashGap={0.2}
            />
          </Suspense>
        ) : (
          <Suspense fallback={<Preloader />}>
            <StickyHeadTable markers={markers} />
          </Suspense>
        )}
      </div>
      <React.Fragment>
        {showDetail ? (
          <DataTooltip
            meteor={detail}
            handleClose={() => setShowDetail(false)}
          />
        ) : null}
      </React.Fragment>
    </section>
  );
};

export default React.memo(Responsive(MainSection));
