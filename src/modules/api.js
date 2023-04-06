import updateDisplay from './dom';
import weatherStorage from './weatherObject';

const fetchWeather = async (location) => {
  async function searchWithCity() {
    if (location === undefined) {
      location = 'London';
    }
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=15e42e0620b649a8ae961742230604&q=${location}&days=6`
      );
      const responseData = await response.json();
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
