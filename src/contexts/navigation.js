import React, { useEffect, useCallback } from 'react';
import throttle from 'lodash.throttle';
import { useCache, generateMeteorKey, generateStarKey } from './storage';
import { getDateString, getYesterdaysDate, getDateRange } from '../utils/date';

import { fetchStars } from '../clients/star';
import { fetchMeteors } from '../clients/meteor';
import { fetchConstellations } from '../clients/constellation';

const options = [
  'ALL',
  'ARCHIVE',
  'AR',
  'AUS',
  'CAMS',
  'EXOSS',
  'GMN',
  'MA',
  'NCA',
  'TEXAS',
  'UAE',
  'BENELUX',
  'CHILE',
  'EDMOND',
  'FL',
  'LOCAMS',
  'NAMIBIA',
  'NZ',
  'SA',
  'SONOTACO',
  'TK',
];

const NavigationContext = React.createContext();

export function NavigationProvider({ children }) {
  const { cachedMeteors, cachedStars, cachedConstellations } = useCache();
  const [date, setDate] = React.useState(getYesterdaysDate());
  const [source, setSource] = React.useState('ALL');
  const [scaleFactorToRender,setScaleFactorToRender] = React.useState(0.8);
  const [meteorsToRender, setMeteors] = React.useState([]);
  const [starsToRender, setStars] = React.useState([]);
  const [constellationsToRender, setConstellations] = React.useState([]);

  const [isInTimelineView, toggleTimelineView] = React.useState(false);

  const initializeDateLoc = () => {
    let dateParam, sourceParam;
    if (window.location.search) {
      const params = new URLSearchParams(window.location.search);
      if (params.has('date') && Date.parse(params.get('date'))) {
        dateParam = getDateString(new Date(params.get('date')));
        setDate(dateParam);
      }
      if (params.has('loc') && options.includes(params.get('loc'))) {
        sourceParam = params.get('loc');
        setSource(sourceParam);
      }
    }
    return [dateParam, sourceParam];
  };

  const updateDateParams = (newDate) => {
    let newParams = new URLSearchParams(window.location.search);
    newParams.set('date', newDate);
    console.log(newParams.toString());
    window.history.pushState({}, '', '?' + newParams.toString());
  };

  const updateSourceParams = (newSource) => {
    let newParams = new URLSearchParams(window.location.search);
    newParams.set('loc', newSource);
    console.log(newParams.toString());
    window.history.pushState({}, '', '?' + newParams.toString());
  };

  const retrieveMeteors = async (date, source) => {
    console.log('fetch meteors');
    let meteors;
    const key = generateMeteorKey(date, source);
    if (cachedMeteors.has(key)) {
      meteors = cachedMeteors.get(key);
    } else {
      meteors = await fetchMeteors(source, date);
      cachedMeteors.set(key, meteors);
    }
    return meteors;
  };

  const retrieveStars = async (date) => {
    let stars;
    const key = generateStarKey(date);
    if (cachedStars.has(key)) {
      stars = cachedStars.get(key);
    } else {
      stars = await fetchStars(date);
      cachedStars.set(key, stars);
    }
    return stars;
  };

  const retrieveConstellations = async (date) => {
    let constellations;
    const key = generateStarKey(date);
    if (cachedConstellations.has(key)) {
      constellations = cachedConstellations.get(key);
    } else {
      constellations = await fetchConstellations(date);
      cachedConstellations.set(key, constellations);
    }
    return constellations;
  };

  const setDataAll = async (date, source) => {
    const meteors = await retrieveMeteors(date, source);
    const stars = await retrieveStars(date);
    const constellations = await retrieveConstellations(date);
    setMeteors(meteors);
    setStars(stars);
    setConstellations(constellations);
  };

  const fetchDataRange = async (dateRange) => {
    await Promise.all(
      dateRange.map(async (date) => {
        await retrieveMeteors(date, source);
        await retrieveStars(date);
        await retrieveConstellations(date);
      })
    );
  };

  useEffect(() => {
    const [dateParam, sourceParam] = initializeDateLoc();
    let finalDate = dateParam ? dateParam : date;
    let finalSource = sourceParam ? sourceParam : source;
    setDataAll(finalDate, finalSource);
    // eslint-disable-next-line
  }, []);

  const onDateChange = useCallback(
    throttle((newDate) => {
      console.log('throttled');
      setDataAll(newDate, source);
      updateDateParams(newDate);
    }, 3000),
    [source]
  );

  const onSourceChange = (newSource) => {
    setDataAll(date, newSource);
    updateSourceParams(newSource);
  };

  return (
    <NavigationContext.Provider
      value={{
        date: date,
        source: source,
        meteors: meteorsToRender,
        stars: starsToRender,
        constellations: constellationsToRender,
        isInTimelineView: isInTimelineView,
        scaleFactor: scaleFactorToRender,
        startDate: startDate,
        endDate: endDate,
        timelineLoading: timelineLoading,
        changeDate: (newDate) => {
          setDate(newDate);
          onDateChange(newDate);
        },
        changeSource: (newSource) => {
          setSource(newSource);
          onSourceChange(newSource);
        },
        toggleTimelineView: () => {
          toggleTimelineView(!isInTimelineView);
        },
        loadRange: async (start, end) => {
          const dateRange = getDateRange(new Date(start), new Date(end));
          await fetchDataRange(dateRange);
        },
        setGlobeMarkers: (current) => {
          setDataAll(current, source);
        },
        setScaleFactor : (scaleFactor) => {
          console.log("onChange in navigation", scaleFactor)
          setScaleFactorToRender(scaleFactor);
        }
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationState() {
  const context = React.useContext(NavigationContext);
  if (context === undefined) {
    throw new Error(
      'useNavigationState must be used within a NavigationProvider'
    );
  }
  return context;
}
