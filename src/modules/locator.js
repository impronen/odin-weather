const userLocator = async () => {
  let userLocation = [];
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    userLocation.push(pos.coords);
    console.log(userLocation);
    return userLocation;
  }
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
};

export default userLocator;
