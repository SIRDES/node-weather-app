const request = require("request");
const getWeather = require("./getWeather")

const getGeocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZGVzbW9uZHRldHRlaDEiLCJhIjoiY2wwbXh3NngzMTV6ZjNicXR3NXp6eG9jbyJ9.5o4KYPjpfnCAbQFbCedZCA&limit=1`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (response.body.features === undefined) {
      callback("unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        lat: response.body.features[0].center[1],
        lon: response.body.features[0].center[0],
        place_name: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = getGeocode
