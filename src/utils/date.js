// Get Yesterday's Date
export function getDateString(date) {
  return `${date.toISOString().slice(0, 10)}`;
}

export function getYesterdaysDate() {
  let date = new Date();
  date.setUTCDate(date.getUTCDate() - 1);
  return getDateString(date);
}

export function getNextDate(date) {
  const newDate = new Date(date);
  newDate.setUTCDate(newDate.getUTCDate() + 1);
  return getDateString(newDate);
}

export function calculateNewDate(start, daysPassed) {
  const newDate = new Date(start);
  newDate.setUTCDate(newDate.getUTCDate() + daysPassed);
  return getDateString(newDate);
}

export function getDateRange(start, end) {
  let dateArray = [];
  let current = start;
  while (new Date(current).getTime() <= new Date(end).getTime()) {
    dateArray.push(getDateString(new Date(current)));
    current = getNextDate(current);
  }
  return dateArray;
}

export function dateDiff(start, end) {
  const timeDiff = end.getTime() - start.getTime();
  return timeDiff / (1000 * 3600 * 24);
}

export function getStartDate() {
  const newDate = new Date();
  newDate.setUTCDate(newDate.getUTCDate() - 6);
  return getDateString(newDate);
}
