import React, { useState, useCallback, useEffect, Suspense } from 'react';
import * as THREE from 'three';

// import { render } from '@testing-library/react';

import Preloader from './Preloader';
import ZoomButton from './ZoomButton';
import DataTooltip from './Tooltip';

import globeTextureImage from '../images/background.jpg';

import { useNavigationState } from '../contexts/navigation';

// Lazy Loading React Component
const ReactGlobe = React.lazy(() => import('react-globe.gl'));
const StickyHeadTable = React.lazy(() => import('./Table'));

const meridianData = require('../json/meridianLabels.json');
const meridianLabels = [];

meridianData.labels.forEach((m) => {
  meridianLabels.push({
    name: m.name,
    lat: m.lat,
    lng: m.lng,
  });
});

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

const starSizeScale = (colorCode) => {
  let code = parseFloat(colorCode) * 10;

  if (code >= 11 && code <= 20) {
    return 0.76;
  } else if (code >= 21 && code <= 30) {
    return 0.52;
  } else if (code >= 31 && code <= 40) {
    return 0.24;
  } else if (code >= 41 && code <= 50) {
    return 0.22;
  } else {
    return 0.21;
  }
};

const MainSection = (props) => {
  const globeEl = React.useRef();
  const [alt, setAlt] = useState(2);

  const { meteors, stars, constellations } = useNavigationState();

  // Markers State
  const [markers, setMarkers] = useState([]);
  const [constellationMarkers, setConstellationMarkers] = useState([]);

  const [showDetail, setShowDetail] = useState(false);

  const [detail, setDetail] = useState('');

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
        size: 0.5,
        alt: 0.01,
      });
    });

    stars.forEach((m) => {
      newMarkers.push({
        id: m.id,
        color: 'rgb(0, 0, 0)',
        name: 'Star',
        type: 'star',
        lat: m.location.coordinates[1],
        lng: m.location.coordinates[0],
        size: starSizeScale(m.mag),
        alt: 0,
      });
    });

    constellations.forEach((m) => {
      let name = m.name;
      m.points.forEach((p) => {
        for (let i = 0; i < p.length; i++) {
          let j = i + 1;
          if (j >= p.length) {
            j = 0;
          } else {
            console.log(p[i]);
          }

          if (j === 0) {
            console.log('End here!');
          } else {
            newConstellations.push({
              points: p,
              id: newConstellations.length,
              name: name,
              startLng: p[i][0],
              startLat: p[i][1],
              endLng: p[j][0],
              endLat: p[j][1],
              color: '#302f2f',
            });
          }
        }
      });
    });

    console.log(newConstellations);
    setConstellationMarkers(newConstellations);

    // this is the Sun coordinate
    newMarkers.push({
      id: newMarkers.length,
      color: '#FDB800',
      name: 'Sun',
      type: '',
      lat: 0,
      lng: 0,
      size: 3,
      alt: 0.05,
    });
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
    updateMarkers(meteors, stars, constellations);
  }, [meteors, stars, constellations, updateMarkers]);

  console.log(globeEl.current);

  const elem = document.getElementById('Globe');

  return (
    <div className="globe-container">
      <div className="zoom-1">
        <ZoomButton onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      </div>
      <div className="globe-content" id="Globe">
        {props.showGlobe ? (
          <Suspense fallback={<Preloader />}>
            <ReactGlobe
              ref={globeEl}
              width={window.innerWidth - 50}
              height={window.innerHeight}
              altitude={alt}
              backgroundColor="#070c26"
              backgroundImageUrl={null}
              showGraticules={true}
              globeImageUrl={globeTextureImage}
              bumpImageUrl={globeTextureImage}
              arcsData={constellationMarkers}
              arcLabel={markerTooltip}
              arcStartLat={(d) => d.startLat}
              arcStartLng={(d) => d.startLng}
              arcEndLat={(d) => d.endLat}
              arcEndLng={(d) => d.endLng}
              arcColor={(d) => d.color}
              arcAltitude={0}
              arcStroke={0.125}
              customLayerData={markers}
              customThreeObject={(d) =>
                new THREE.Mesh(
                  new THREE.SphereBufferGeometry(d.size),
                  new THREE.MeshLambertMaterial({
                    color: d.color,
                  })
                )
              }
              customThreeObjectUpdate={(obj, d) => {
                Object.assign(
                  obj.position,
                  globeEl.current.getCoords(d.lat, d.lng, d.alt)
                );
              }}
              onCustomLayerHover={(label) => {
                console.log(label);
                elem.style.cursor = label ? 'pointer' : null;
              }}
              onCustomLayerClick={markerInfoTip}
              customLayerLabel={markerTooltip}
              labelsData={meridianLabels}
              labelLat={(d) => d.lat}
              labelAltitude={0.1}
              labelLng={(d) => d.lng}
              labelText={(d) => d.name}
              labelSize={1}
              labelIncludeDot={false}
              labelColor={(d) => 'rgba(255, 255, 255, 0.75)'}
              labelResolution={10}
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
    </div>
  );
};

export default React.memo(MainSection);
