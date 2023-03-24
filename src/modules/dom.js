const updateDisplay = (weatherData) => {
  const basicData = document.querySelector('.basic-data');
  const tempterature = document.querySelector('#tempterature');
  const description = document.querySelector('#description');
  const city = document.querySelector('#city');
  const country = document.querySelector('#country');
  const currentIcon = document.querySelector('#currentIcon');

  function updateNow() {
    tempterature.textContent = `${weatherData.current.temp_c}C`;
    city.textContent = `${weatherData.location.name}, ${weatherData.location.region}`;
    country.textContent = `${weatherData.location.country}`;
    currentIcon.src = '../src/assets/icons/fill/darksky/clear-day.svg';
  }
  updateNow();
};

export default updateDisplay;
