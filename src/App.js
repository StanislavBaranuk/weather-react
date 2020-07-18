import React from 'react';
import logo from './logo.svg';
import './App.css';
import store from "./store/index";
import '../assets/style/index.scss';

function geoFindMe() {
debugger
  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

function App() {

  return (
    <div className="App">
      <button id = "find-me" onClick={geoFindMe}>Show my location</button><br/>
      <p id = "status"></p>
      <a id = "map-link" target="_blank"></a>
    </div>
  );
}

export default App;