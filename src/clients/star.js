import axios from 'axios';

const STAR_URL = 'https://meteorshowers.seti.org/api/star';

export async function fetchStars(date) {
  const response = await axios.get(STAR_URL, {
    params: {
      date: `${date}`,
    },
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  });

  return response.data.stars;
}
