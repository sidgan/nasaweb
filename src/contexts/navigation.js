import React, { useEffect } from 'react';
import { useCache, generateMeteorKey, generateStarKey } from './storage';

import { fetchStars } from '../clients/star';
import { fetchMeteors } from '../clients/meteor';
import { fetchConstellations } from '../clients/constellation';

function getNewDate() {
  // Get Yesterday's Date
  let date = new Date();
  date.setDate(date.getDate() - 1);

  return `${date.toISOString().slice(0, 10)}`;
}

const NavigationContext = React.createContext();

export function NavigationProvider({ children }) {
  const { cachedMeteors, cachedStars } = useCache();
  const [date, changeDate] = React.useState(getNewDate());
  const [source, changeSource] = React.useState('ALL');

  const [meteorsToRender, changeMeteors] = React.useState([]);
  const [starsToRender, changeStars] = React.useState([]);
  const [constellationsToRender, changeConstellations] = React.useState([]);

  const retrieveMeteors = async (date, source) => {
    let meteors;
    const key = generateMeteorKey(date, source);
    if (cachedMeteors.has(key)) {
      meteors = cachedMeteors.get(key);
    } else {
      meteors = await fetchMeteors(source, date);
      cachedMeteors.set(key, meteors);
    }
    changeMeteors(meteors);
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
    changeStars(stars);
  };

  const retrieveConstellations = async (date) => {
    let constellations;

    constellations = await fetchConstellations(date);
    changeConstellations(constellations);
  };

  useEffect(() => {
    retrieveMeteors(date, source);
    retrieveStars(date);
    retrieveConstellations(date);
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
        changeDate: (newDate) => {
          changeDate(newDate);
          retrieveMeteors(newDate, source);
          retrieveStars(newDate);
        },
        changeSource: (newSource) => {
          changeSource(newSource);
          retrieveMeteors(date, newSource);
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
