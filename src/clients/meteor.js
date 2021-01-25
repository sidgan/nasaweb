import axios from 'axios';

const METEORS_URL = 'https://meteorshowers.seti.org/api/meteor';

export async function fetchMeteors(source, date) {
  const response = await axios.get(METEORS_URL, {
    params: {
      source: `${source}`,
      date: `${date}`,
    },
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  });

  return response.data.meteors;
}
