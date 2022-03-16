// Get Yesterday's Date
export function getDateString(date) {
  return `${date.toISOString().slice(0, 10)}`;
}

function checkDateIsLessThan(date1, date2) {
  return date1.getTime() < date2.getTime();
}

export function checkIfValidDate(date, maxDate) {
  return (
    checkDateIsLessThan(new Date(date), new Date(maxDate)) &&
    checkDateIsLessThan(new Date('2010-04-14'), new Date(date))
  );
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
  if (checkIfValidDate(getDateString(newDate), getMaxDate())) {
    return getDateString(newDate);
  }
  return getMaxDate();
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

export function getMaxDate() {
  let date = new Date();
  date.setDate(date.getDate());
  return `${date.toISOString().slice(0, 10)}`;
}
