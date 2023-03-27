const weatherJSON = require('../assets/weather_conditions.json');

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
    description.textContent = `${weatherData.current.condition.text}`;
  }
  function updateIcon() {
    const data = weatherJSON.find(
      (item) => item.code === weatherData.current.condition.code
    );
    currentIcon.src = `../src/assets/icons/line/all/${data.day}`;
    currentIcon.alt = `${weatherData.current.condition.text}`;
  }
  updateNow();
  updateIcon();
};

export default updateDisplay;
