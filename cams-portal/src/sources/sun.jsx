
export const getSunData = () => {
    const data = require('../json/sun.json')
    console.log(data)
    return data
    // fetch('../json/sun.json')
    //     .then(function(resp) {
    //         return resp.json()
    //     })

}


export const sunData = {
    "type": "FeatureCollection",
    "features": [
        {
        "geometry": { "type": "Point", "coordinates": [0.0, 0.0] },
        "type": "Feature",
        "properties": { "color": "55.0", "name": "Sun", "mag": -36.0 }
        }
    ]
}
  