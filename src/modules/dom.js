const weatherJSON = require('../assets/weather_conditions.json');

// Import icon assets
function importIcons(r) {
  let icons = {};
  r.keys().map((item) => {
    icons[item.replace('./', '')] = r(item);
  });
  return icons;
}
const icons = importIcons(
  require.context('../assets/icons/line/all', false, /\.(png|jpe?g|svg)$/)
);

/* DOM MANIPULATION */

const updateDisplay = (weatherData) => {
  const tempterature = document.querySelector('#currentTempterature');
  const description = document.querySelector('#currentDescription');
  const city = document.querySelector('#city');
  const country = document.querySelector('#country');
  const currentIcon = document.querySelector('#currentIcon');

  const humidity = document.querySelector('#humidityValue');
  const airPressureValue = document.querySelector('#airPressureValue');
  const chanceOfRainValue = document.querySelector('#chanceOfRainValue');
  const windSpeedValue = document.querySelector('#windSpeedValue');

  function loadStaticIcons() {
    const humidityIcon = document.querySelector('#humidityIcon');
    const airPressureIcon = document.querySelector('#airPressureIcon');
    const chanceOfRainIcon = document.querySelector('#chanceOfRainIcon');
    const windSpeedIcon = document.querySelector('#windSpeedIcon');

    const celciusIcon = document.querySelector('#celciusIcon');

    humidityIcon.src = icons['humidity.svg'];
    airPressureIcon.src = icons['barometer.svg'];
    chanceOfRainIcon.src = icons['umbrella.svg'];
    windSpeedIcon.src = icons['windsock.svg'];
    celciusIcon.src = icons['thermometer-celsius.svg'];
  }

  function updateNow() {
    tempterature.textContent = `${Math.round(weatherData.current.temp_c)}C`;
    city.textContent = `${weatherData.location.name}, ${weatherData.location.region}`;
    country.textContent = `${weatherData.location.country}`;
    description.textContent = `${weatherData.current.condition.text}`;

    humidity.textContent = `${weatherData.current.humidity} %`;
    airPressureValue.textContent = `${weatherData.current.pressure_mb} hPa`;
    chanceOfRainValue.textContent = `${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%`;
    windSpeedValue.textContent = `${weatherData.current.wind_kph} / kph`;
  }

  function updateIcons() {
    const weatherIcons = document.querySelectorAll('.weatherIcon');
    for (let i = 0; i < weatherIcons.length; i++) {
      const icon = weatherJSON.find(
        (item) =>
          item.code === weatherData.forecast.forecastday[i].day.condition.code
      );
      weatherIcons[i].src = icons[icon.day];
    }
    const icon = weatherJSON.find(
      (item) => item.code === weatherData.current.condition.code
    );

    if (weatherData.current.is_day === 0) {
      currentIcon.src = icons[icon.night];
    } else {
      currentIcon.src = icons[icon.day];
    }
  }

  function updateForecast() {
    const forecastTemps = document.querySelectorAll('.temperature');
    const forecastTempsLow = document.querySelectorAll('.temperatureLow');
    const forecastDescription = document.querySelectorAll('.description');

    for (let i = 0; i < forecastTemps.length; i++) {
      forecastDescription[i].innerText =
        weatherData.forecast.forecastday[i].day.condition.text;
      forecastTemps[i].innerText = `High: ${Math.round(
        weatherData.forecast.forecastday[i].day.maxtemp_c
      )}C`;
      forecastTempsLow[i].innerText = `Low: ${Math.round(
        weatherData.forecast.forecastday[i].day.mintemp_c
      )}C`;
    }
  }

  updateNow();
  loadStaticIcons();
  updateIcons();
  updateForecast();
};

export default updateDisplay;
