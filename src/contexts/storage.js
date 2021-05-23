import React from 'react';

const StorageContext = React.createContext();

export function StorageProvider({ children }) {
  const [cachedMeteors] = React.useState(new Map());
  const [cachedStars] = React.useState(new Map());
  const [cachedConstellations] = React.useState(new Map());
  return (
    <StorageContext.Provider
      value={{
        cachedMeteors: cachedMeteors,
        cachedStars: cachedStars,
        cachedConstellations: cachedConstellations,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}

export function generateMeteorKey(date, source) {
  return `${date}#${source}`;
}

export function generateStarKey(date) {
  return `${date}`;
}

export function useCache() {
  const context = React.useContext(StorageContext);
  if (context === undefined) {
    throw new Error('useCache must be used within a StorageProvider');
  }
  return context;
}
