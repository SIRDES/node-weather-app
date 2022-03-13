const request = require("request");

const getWeather = (lat,lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=d2dc444e398778f1d76029eb291b396b&query=${lat},${lon}`;

  request({url: url, json:true}, (error, response) => {
    if(error){
      callback("unable to connect to weather services", undefined)
    }else if (response.body.error){
      callback("unable to fetch weather condition. Try a different location", undefined)
    }else{
      const weatherData = response.body.current
      callback(undefined, weatherData)
    }
  })
} 
module.exports = getWeather
