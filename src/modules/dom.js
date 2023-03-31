const weatherJSON = require('../assets/weather_conditions.json');

const updateDisplay = (weatherData) => {
  const tempterature = document.querySelector('#tempterature');
  const description = document.querySelector('#description');
  const city = document.querySelector('#city');
  const country = document.querySelector('#country');
  const currentIcon = document.querySelector('#currentIcon');

  const humidity = document.querySelector('#humidity');
  const airPressure = document.querySelector('#airPressure');
  const chanceOfRain = document.querySelector('#chanceOfRain');
  const windSpeed = document.querySelector('#windSpeed');

  function updateNow() {
    tempterature.textContent = `${weatherData.current.temp_c}C`;
    city.textContent = `${weatherData.location.name}, ${weatherData.location.region}`;
    country.textContent = `${weatherData.location.country}`;
    description.textContent = `${weatherData.current.condition.text}`;

    humidity.textContent = `Humidity: ${weatherData.current.humidity}`;
    airPressure.textContent = `Air pressure: ${weatherData.current.pressure_mb}`;
    chanceOfRain.textContent = `Chance of rain: ${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%`;
    windSpeed.textContent = `Wind speed: ${weatherData.current.wind_kph}/kph`;
  }
  function updateCurrentIcon() {
    const icon = weatherJSON.find(
      (item) => item.code === weatherData.current.condition.code
    );
    if (weatherData.current.is_day === 0) {
      currentIcon.src = `../src/assets/icons/line/all/${icon.night}`;
    } else {
      currentIcon.src = `../src/assets/icons/line/all/${icon.day}`;
    }

    currentIcon.alt = `${weatherData.current.condition.text}`;
  }
  updateNow();
  updateCurrentIcon();
};

export default updateDisplay;
