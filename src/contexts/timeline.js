import React from 'react';

export function getTodaysDate() {
  let date = new Date();
  return `${date.toISOString().slice(0, 10)}`;
}

export default React.createContext({
  startDate: getTodaysDate(),
  endDate: getTodaysDate(),
});