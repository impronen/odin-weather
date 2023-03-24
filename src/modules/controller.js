import fetchWeather from './api';

const injectData = () => {
  const cityToSearch = document.querySelector('.citysearch');
  const searchBtn = document.querySelector('#runsearch');
  searchBtn.addEventListener('click', function runSearch() {
    fetchWeather(cityToSearch.value);
  });
};

export default injectData;
