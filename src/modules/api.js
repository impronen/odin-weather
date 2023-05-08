import updateDisplay from './dom';

const fetchWeather = async (location) => {
  async function searchWithCity() {
    if (location === undefined) {
      location = 'London';
    }
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=13b21cb85833440182c95944230805&q=${location}&days=6`
      );
      const responseData = await response.json();
      console.log(responseData);
      updateDisplay(responseData);
    } catch (error) {
      console.log(error);
    }
  }

  searchWithCity();
};

export default fetchWeather;
