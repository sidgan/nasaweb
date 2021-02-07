import React, { useState, useCallback, useEffect, Suspense } from 'react';
import { render } from '@testing-library/react';
import Responsive from 'react-responsive-decorator';
import Preloader from './Preloader';
import ZoomButton from './ZoomButton';
import DataTooltip from './Tooltip';

import globeTextureImage from '../images/background.jpg';
import { useNavigationState } from '../contexts/navigation';

import { fetchStars } from '../clients/star';
import { fetchMeteors } from '../clients/meteor';

// Lazy Loading React Component
const ReactGlobe = React.lazy(() => import('react-globe.gl'));
const StickyHeadTable = React.lazy(() => import('./Table'));

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

  if (code <= 0.0 && code <= 10) {
    return 0.46;
  } else if (code >= 11 && code <= 20) {
    return 0.41;
  } else if (code >= 21 && code <= 30) {
    return 0.33;
  } else if (code >= 31 && code <= 40) {
    return 0.27;
  } else if (code >= 41 && code <= 50) {
    return 0.21;
  } else {
    return 0.17;
  }
};

const MainSection = (props) => {
  const globeEl = React.useRef();
  const [alt, setAlt] = useState(2);

  const { meteors, stars } = useNavigationState();

  const [markers, setMarkers] = useState([]);

  const handleZoomIn = () => {
    let altitude = parseFloat(alt - 0.5);
    globeEl.current.pointOfView({ altitude: altitude });
    setAlt(altitude);
  };
  const handleZoomOut = () => {
    let altitude = parseFloat(alt + 0.5);
    globeEl.current.pointOfView({ altitude: altitude });
    setAlt(altitude);
  };

  const updateMarkers = useCallback((meteors, stars) => {
    let newMarkers = [];

    meteors.forEach((m) => {
      newMarkers.push({
        id: newMarkers.length,
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

    // this is the Sun coordinate
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

    setMarkers(newMarkers);
  }, []);

  const markerTooltip = (marker) => {
    return `<h2>${marker.name}</h2>`;
  };

  const markerInfoTip = (marker) => {
    if (marker.type === 'meteor') {
      return render(<DataTooltip meteor={marker} />);
    }
  };

  useEffect(() => {
    updateMarkers(meteors, stars);
  }, [meteors, stars]);

  console.log(globeEl.current);

  return (
    <section>
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
            />
          </Suspense>
        ) : (
          <Suspense fallback={<Preloader />}>
            <StickyHeadTable markers={markers} />
          </Suspense>
        )}
      </div>
    </section>
  );
};

export default React.memo(Responsive(MainSection));
