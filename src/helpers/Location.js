class Location {
  static getCurrent() {
    return new Promise((resolve, reject) => {
      const options = {
        enableHighAccuracy: true,
        // timeout: 5000,
        maximumAge: 0
      };

      const location = {
        status: true,
        lat: null,
        lon: null
      };

      function success(position) {
        location.status = true;
        location.lat = position.coords.latitude;
        location.lon = position.coords.longitude;
        resolve(location)
      }

      function error() {
        location.status = false;
        location.lat = null;
        location.lon = null;
        reject(location)
      }

      if(!navigator.geolocation) {
        error();
      } else {
        navigator.geolocation.getCurrentPosition(success, error, options);
      }
    })
  }
}

export default Location
