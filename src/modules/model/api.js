const fetchWeather = (location) => {
  async function talktToAPI() {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=47db8690ea3e4433803123706232203&q=${location}`
    );
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  }
  talktToAPI();
};

export default fetchWeather;
