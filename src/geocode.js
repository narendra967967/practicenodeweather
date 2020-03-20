const request = require('request')
const getgeocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?types=address&access_token=pk.eyJ1IjoibmFyZW5kcmE5NjciLCJhIjoiY2s3dHpqdjNyMDR3bzNma2R1czR3OXI5aiJ9.MpEMf2XNoJBh7Q-w1qpC1Q&limit=1"

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("The netwrok service is not available. ", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find longitude and latitude.", undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                log: body.features[0].center[0],
                loc: body.features[0].place_name
            })
        }

    })
}

const gettempdata = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/60e380e91157db1f116df80eaef63708/" + latitude + "," + longitude + "?units=si"
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("The netwrok service is not available. ", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, {
                temp: body.currently.temperature,

            })
        }

    })
}
module.exports = {
    'getgeocode': getgeocode,
    'gettempdata': gettempdata
}