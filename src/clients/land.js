import axios from 'axios';

const LAND_URL = 'https://unpkg.com/world-atlas@1/world/110m.json';

export async function fetchLand() {
  const response = await axios.get(LAND_URL, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  });

  return response.data;
}
