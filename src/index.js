import './style.css';
import fetchWeather from './modules/api';
import injectData from './modules/controller';

fetchWeather('New York');
injectData();
