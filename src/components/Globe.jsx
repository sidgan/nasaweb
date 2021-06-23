import React, { useState, useCallback, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import debounce from 'lodash.debounce';
// import { render } from '@testing-library/react';

import Preloader from './Preloader';
import ZoomButton from './ZoomButton';
import DataTooltip from './tooltips/DataTooltip';

import globeTextureImage from '../images/background.jpg';

import { useNavigationState } from '../contexts/navigation';

// Lazy Loading React Component
const ReactGlobe = React.lazy(() => import('react-globe.gl'));
const StickyHeadTable = React.lazy(() => import('./Table'));

const longtitudeData = require('../json/longtitudeLabels.json');
const latitudeData = require('../json/latitudeLabels.json');

const meridianLabels = [];

longtitudeData.labels.forEach((m) => {
  meridianLabels.push({
    name: m.name,
    lat: m.lat,
    lng: m.lng,
  });
});
latitudeData.labels.forEach((m) => {
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
  let code = parseFloat(colorCode);
  if (code >= -4.0 && code < -4.9) {
    return 0.96;
  } else if (code >= -3.0 && code < -3.9) {
    return 0.91;
  } else if (code >= -2.0 && code < -2.9) {
    return 0.89;
  } else if (code >= -1.0 && code < -1.9) {
    return 0.83;
  } else if (code <= 0 && code >= -0.9) {
    return 0.79;
  } else if (code > 0 && code <= 0.9) {
    return 0.73;
  } else if (code >= 1.0 && code <= 1.9) {
    return 0.63;
  } else if (code >= 2.0 && code <= 2.9) {
    return 0.53;
  } else if (code >= 3.0 && code <= 3.9) {
    return 0.46;
  } else if (code >= 4.0 && code <= 4.9) {
    return 0.32;
  } else if (code >= 5.0 && code <= 5.9) {
    return 0.28;
  } else {
    return 0.19;
  }
};

const MainSection = (props) => {
  const globeEl = React.useRef();
  const [alt, setAlt] = useState(2);

  const { meteors, stars, constellations } = useNavigationState();
  const [globeReady, setGlobeReady] = useState(false);

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
        abbrv: '',
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
        name: m.name !== '' ? m.name : 'Star',
        type: 'star',
        abbrv: '',
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
              abbrv: m.abbreviation,
              startLng: p[i][0],
              startLat: p[i][1],
              endLng: p[j][0],
              endLat: p[j][1],
              color: 'rgba(0, 0, 0, 0.55)',
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
      type: 'sun',
      lat: 0,
      lng: 0,
      size: 3,
      alt: 0.05,
    });
    setMarkers(newMarkers);
  }, []);

  const markerTooltip = (marker) => {
    if (marker.name !== '') {
      if (marker.abbrv === '' || !marker.abbrv) {
        return `<h2>${marker.name}</h2>`;
      } else {
        return `<h2>${marker.name} (${marker.abbrv})</h2>`;
      }
    }
  };

  const markerInfoTip = (marker) => {
    if (marker.type === 'sun' || marker.type === 'star') {
      console.log('Wrong marker clicked');
    } else {
      setDetail(marker);

      if (detail === '' || showDetail === false) {
        setShowDetail(true);
      }
    }
  };

  useEffect(() => {
    updateMarkers(meteors, stars, constellations);
  }, [meteors, stars, constellations, updateMarkers]);

  const setURL = useCallback(
    debounce((pov) => {
      const mappings = {
        altitude: 'alt',
        lat: 'lat',
        lng: 'long',
      };
      let newParams = new URLSearchParams(window.location.search);
      Object.entries(pov).forEach(([coord, value]) => {
        newParams.set(mappings[coord], value.toFixed(3));
      });
      window.history.pushState({}, '', '?' + newParams.toString());
    }, 500)
  );

  console.log(globeEl.current);

  const elem = document.getElementById('Globe');

  return (
    <div className="globe-container">
      <div className="globe-content" id="Globe">
        {props.showGlobe ? (
          <Suspense fallback={<Preloader />}>
            <div className="zoom-1">
              <ZoomButton onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
            </div>
            <ReactGlobe
              ref={globeEl}
              width={window.innerWidth}
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
              arcStroke={0.25}
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
                elem.style.cursor = label ? 'pointer' : null;
              }}
              onCustomLayerClick={markerInfoTip}
              customLayerLabel={markerTooltip}
              onGlobeReady={() => {
                setGlobeReady(true);
                console.log(window.location.search);
                let pov = {
                  lng: 180,
                };
                const properties = ['alt', 'lat', 'long'];
                const mappings = {
                  alt: 'altitude',
                  lat: 'lat',
                  long: 'lng',
                };
                if (window.location.search) {
                  const params = new URLSearchParams(window.location.search);
                  properties.forEach((property) => {
                    if (params.has(property) && Number(params.get(property))) {
                      pov[mappings[property]] = Number(params.get(property));
                    }
                  });
                }
                globeEl.current.pointOfView(pov);
                globeEl.current.controls().dampingFactor = 0.75;
              }}
              labelsData={meridianLabels}
              labelLat={(d) => d.lat}
              labelAltitude={0}
              labelLng={(d) => d.lng}
              labelText={(d) => d.name}
              labelSize={1}
              labelIncludeDot={false}
              labelColor={(d) => 'rgba(255, 255, 255, 0.75)'}
              labelResolution={10}
              onZoom={(pov) => {
                if (globeReady) {
                  setURL(pov);
                }
              }}
            />
          </Suspense>
        ) : (
          <Suspense fallback={<Preloader size={200} />}>
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
