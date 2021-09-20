import axios from 'axios';

const TIMELINE_STATUS_URL = 'https://meteorshowers.seti.org/api/timeline';
const TIMELINE_CREATE_URL =
  'https://meteorshowers.seti.org/api/timeline/create';

export async function createTimeline(startDate, endDate, params) {
  const response = await axios.post(TIMELINE_CREATE_URL, {
    start_date: startDate,
    end_date: endDate,
  });

  if (!response.data.success) {
    throw new Error('cannot create timeline');
  }

  return response.data.token;
}

export async function getTimeline(token) {
  const response = await axios.get(TIMELINE_STATUS_URL, {
    params: {
      token,
    },
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  });

  return response.data;
}
