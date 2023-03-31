import updateDisplay from './dom';
import weatherStorage from './weatherObject';

const fetchWeather = async (location) => {
  async function searchWithCity() {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=47db8690ea3e4433803123706232203&q=${location}&days=5`
      );
      const responseData = await response.json();
      console.log('Searching with search input');
      console.log(responseData);
      updateDisplay(responseData);
      weatherStorage(responseData);
    } catch (error) {
      console.log(error);
    }
  }

  searchWithCity();
};

export default fetchWeather;
