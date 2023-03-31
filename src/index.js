import './style.css';
import fetchWeather from './modules/api';
import injectData from './modules/controller';
import userLocator from './modules/locator';

fetchWeather('Mikkeli');
injectData();
userLocator();

async function initialSeach() {
  const userLocation = await userLocator();
  console.log(userLocation);
  await fetchWeather(userLocation);
}

initialSeach();
