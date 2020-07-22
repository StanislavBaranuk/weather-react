import { SET_WEATHER, SET_CURRENT_LOCATION } from "../constants/action-types";

export function setWeather(payload = null) {
  return {type: SET_WEATHER, payload}
}

export function setCurrentLocation(payload = null) {
  return {type: SET_CURRENT_LOCATION, payload}
}
