import updateDisplay from './dom';
import weatherStorage from './weatherObject';

const fetchWeather = (location) => {
  async function talktToAPI() {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=47db8690ea3e4433803123706232203&q=${location}&days=5`
    );
    const responseData = await response.json();
    console.log(responseData);
    console.log(
      `Its ${responseData.current.temp_c} degrees celcius in ${responseData.location.name}`
    );
    updateDisplay(responseData);
    weatherStorage(responseData);
    weatherStorage.readWeather();
    return responseData;
  }
  talktToAPI();
};

export default fetchWeather;
