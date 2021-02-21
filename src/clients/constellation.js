import axios from 'axios';

const CONSTELLATION_URL = 'https://meteorshowers.seti.org/api/constellation';

export async function fetchConstellations(date) {
    const response = await axios.get(CONSTELLATION_URL, {
        params: {
            date: `${date}`
        },
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
    });

    return response.data.constellations;
}