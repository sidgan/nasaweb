import React from 'react';

export function getNewDate() {
  // Get Yesterday's Date
  let date = new Date();
  date.setDate(date.getDate() - 1);

  return `${date.toISOString().slice(0, 10)}`;
}

export default React.createContext({
  date: getNewDate(),
  source: 'ALL',
});
