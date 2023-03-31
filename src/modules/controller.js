import fetchWeather from './api';

const injectData = () => {
  const cityToSearch = document.querySelector('.citysearch');
  const searchBtn = document.querySelector('#runsearch');

  function fixSpecialChars() {
    // This function is needed, as weatherAPI parses characters like öäå badly
    let cityValue = cityToSearch.value.toLowerCase().split('');
    let iteratedCity = [];
    cityValue.forEach((element) => {
      if (element === 'ö') {
        iteratedCity.push('o');
      } else if (element === 'ä') {
        iteratedCity.push('a');
      } else if (element === 'å') {
        iteratedCity.push('a');
      } else {
        iteratedCity.push(element);
      }
    });
    const parsedCity = iteratedCity.join('');
    return parsedCity;
  }

  searchBtn.addEventListener('click', function runSearch() {
    const searcParameter = fixSpecialChars();
    fetchWeather(searcParameter);
  });

  cityToSearch.addEventListener('keypress', function runSearch(event) {
    if (event.key === 'Enter') {
      const searcParameter = fixSpecialChars();
      fetchWeather(searcParameter);
    }
  });
};

export default injectData;
