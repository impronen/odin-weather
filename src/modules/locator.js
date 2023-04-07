import fetchWeather from './api';

const userLocator = async () => {
  function success(pos) {
    const userLocation = pos.coords;
    console.log(userLocation);
    fetchWeather(`${userLocation.latitude},${userLocation.longitude}`);
  }
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    fetchWeather('London');
  }
  try {
    navigator.geolocation.getCurrentPosition(success, error, options);
  } catch (error) {
    console.log(error);
  }
};

export default userLocator;
