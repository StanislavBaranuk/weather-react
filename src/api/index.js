import axios from 'axios'

const weatherApiKey = '2148c5c17d3b2dba3cee165508ea3418';
const weatherServer = 'https://api.openweathermap.org/data/2.5/';

export function getWeatherByCoords(lat, lon) {
  return axios.get(weatherServer + 'weather?lat=' + lat + '&lon=' + lon + '&appid=' + weatherApiKey).then((data) => {
    return data.data;
  })
}

export function getWeatherByID(id) {
  return axios.get(weatherServer + 'weather?id=' + id + '&appid=' + weatherApiKey).then((data) => {
    return data.data;
  })
}

