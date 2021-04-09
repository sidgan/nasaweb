import React, { useEffect } from 'react';
import { useCache, generateMeteorKey, generateStarKey } from './storage';
import { getYesterdaysDate, getDateRange } from '../utils/date';

import { fetchStars } from '../clients/star';
import { fetchMeteors } from '../clients/meteor';
import { fetchConstellations } from '../clients/constellation';

const NavigationContext = React.createContext();

export function NavigationProvider({ children }) {
  const { cachedMeteors, cachedStars, cachedConstellations } = useCache();
  const [date, setDate] = React.useState(getYesterdaysDate());
  const [source, setSource] = React.useState('ALL');

  const [meteorsToRender, setMeteors] = React.useState([]);
  const [starsToRender, setStars] = React.useState([]);
  const [constellationsToRender, setConstellations] = React.useState([]);

  const [isInTimelineView, toggleTimelineView] = React.useState(false);

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
      cachedStars.set(key, constellations);
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
    setDataAll(date, source);
    // eslint-disable-next-line
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        date: date,
        source: source,
        meteors: meteorsToRender,
        stars: starsToRender,
        constellations: constellationsToRender,
        isInTimelineView: isInTimelineView,
        changeDate: (newDate) => {
          setDate(newDate);
          setDataAll(newDate, source);
        },
        changeSource: (newSource) => {
          setSource(newSource);
          setDataAll(date, newSource);
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
