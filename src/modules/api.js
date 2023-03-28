import updateDisplay from './dom';

const fetchWeather = (location) => {
  async function talktToAPI() {
    console.log(location);
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=47db8690ea3e4433803123706232203&q=${location}`
    );
    const responseData = await response.json();
    console.log(response);
    console.log(responseData);
    console.log(
      `Its ${responseData.current.temp_c} degrees celcius in ${responseData.location.name}`
    );
    updateDisplay(responseData);
    return responseData;
  }
  talktToAPI();
};

export default fetchWeather;
