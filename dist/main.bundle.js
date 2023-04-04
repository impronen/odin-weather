(self["webpackChunkodin_weather"] = self["webpackChunkodin_weather"] || []).push([["main"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/controller */ "./src/modules/controller.js");
/* harmony import */ var _modules_locator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/locator */ "./src/modules/locator.js");



(0,_modules_controller__WEBPACK_IMPORTED_MODULE_1__["default"])();
(0,_modules_locator__WEBPACK_IMPORTED_MODULE_2__["default"])();

/***/ }),

/***/ "./src/modules/api.js":
/*!****************************!*\
  !*** ./src/modules/api.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/modules/dom.js");
/* harmony import */ var _weatherObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weatherObject */ "./src/modules/weatherObject.js");


const fetchWeather = async location => {
  async function searchWithCity() {
    if (location === undefined) {
      location = 'London';
    }
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=47db8690ea3e4433803123706232203&q=${location}&days=6`);
      const responseData = await response.json();
      console.log(responseData);
      (0,_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(responseData);
      (0,_weatherObject__WEBPACK_IMPORTED_MODULE_1__["default"])(responseData);
    } catch (error) {
      console.log(error);
    }
  }
  searchWithCity();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fetchWeather);

/***/ }),

/***/ "./src/modules/controller.js":
/*!***********************************!*\
  !*** ./src/modules/controller.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/modules/api.js");

const injectData = () => {
  const cityToSearch = document.querySelector('.citysearch');
  const searchBtn = document.querySelector('#runsearch');
  function fixSpecialChars() {
    // This function is needed, as weatherAPI parses characters like öäå badly
    let cityValue = cityToSearch.value.toLowerCase().split('');
    let iteratedCity = [];
    cityValue.forEach(element => {
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
    (0,_api__WEBPACK_IMPORTED_MODULE_0__["default"])(searcParameter);
  });
  cityToSearch.addEventListener('keypress', function runSearch(event) {
    if (event.key === 'Enter') {
      const searcParameter = fixSpecialChars();
      (0,_api__WEBPACK_IMPORTED_MODULE_0__["default"])(searcParameter);
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (injectData);

/***/ }),

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const weatherJSON = __webpack_require__(/*! ../assets/weather_conditions.json */ "./src/assets/weather_conditions.json");

// Import icon assets
function importIcons(r) {
  let icons = {};
  r.keys().map(item => {
    icons[item.replace('./', '')] = r(item);
  });
  return icons;
}
const icons = importIcons(__webpack_require__("./src/assets/icons/line/all sync \\.(png%7Cjpe?g%7Csvg)$"));

/* DOM MANIPULATION */

const updateDisplay = weatherData => {
  const tempterature = document.querySelector('#currentTempterature');
  const description = document.querySelector('#currentDescription');
  const city = document.querySelector('#city');
  const country = document.querySelector('#country');
  const currentIcon = document.querySelector('#currentIcon');
  const humidity = document.querySelector('#humidityValue');
  const airPressureValue = document.querySelector('#airPressureValue');
  const chanceOfRainValue = document.querySelector('#chanceOfRainValue');
  const windSpeedValue = document.querySelector('#windSpeedValue');
  function loadStaticIcons() {
    const humidityIcon = document.querySelector('#humidityIcon');
    const airPressureIcon = document.querySelector('#airPressureIcon');
    const chanceOfRainIcon = document.querySelector('#chanceOfRainIcon');
    const windSpeedIcon = document.querySelector('#windSpeedIcon');
    const celciusIcon = document.querySelector('#celciusIcon');
    humidityIcon.src = icons['humidity.svg'];
    airPressureIcon.src = icons['barometer.svg'];
    chanceOfRainIcon.src = icons['umbrella.svg'];
    windSpeedIcon.src = icons['windsock.svg'];
    celciusIcon.src = icons['thermometer-celsius.svg'];
  }
  function updateNow() {
    tempterature.textContent = `${Math.round(weatherData.current.temp_c)}C`;
    city.textContent = `${weatherData.location.name}, ${weatherData.location.region}`;
    country.textContent = `${weatherData.location.country}`;
    description.textContent = `${weatherData.current.condition.text}`;
    humidity.textContent = `${weatherData.current.humidity} %`;
    airPressureValue.textContent = `${weatherData.current.pressure_mb} hPa`;
    chanceOfRainValue.textContent = `${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%`;
    windSpeedValue.textContent = `${weatherData.current.wind_kph} / kph`;
  }
  function updateIcons() {
    const weatherIcons = document.querySelectorAll('.weatherIcon');
    for (let i = 0; i < weatherIcons.length; i++) {
      const icon = weatherJSON.find(item => item.code === weatherData.forecast.forecastday[i].day.condition.code);
      weatherIcons[i].src = icons[icon.day];
    }
    const icon = weatherJSON.find(item => item.code === weatherData.current.condition.code);
    if (weatherData.current.is_day === 0) {
      currentIcon.src = icons[icon.night];
    } else {
      currentIcon.src = icons[icon.day];
    }
  }
  function updateForecast() {
    const forecastTemps = document.querySelectorAll('.temperature');
    const forecastTempsLow = document.querySelectorAll('.temperatureLow');
    const forecastDescription = document.querySelectorAll('.description');
    for (let i = 0; i < forecastTemps.length; i++) {
      forecastDescription[i].innerText = weatherData.forecast.forecastday[i].day.condition.text;
      forecastTemps[i].innerText = `High: ${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}C`;
      forecastTempsLow[i].innerText = `Low: ${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}C`;
    }
  }
  updateNow();
  loadStaticIcons();
  updateIcons();
  updateForecast();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateDisplay);

/***/ }),

/***/ "./src/modules/locator.js":
/*!********************************!*\
  !*** ./src/modules/locator.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/modules/api.js");

const userLocator = async () => {
  function success(pos) {
    const userLocation = pos.coords;
    (0,_api__WEBPACK_IMPORTED_MODULE_0__["default"])(`${userLocation.latitude},${userLocation.longitude}`);
  }
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  try {
    navigator.geolocation.getCurrentPosition(success, error, options);
  } catch (error) {
    console.log(error);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userLocator);

/***/ }),

/***/ "./src/modules/weatherObject.js":
/*!**************************************!*\
  !*** ./src/modules/weatherObject.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const weatherStorage = newData => {
  const latestWeatherData = [];
  latestWeatherData.push(newData);
  console.log(latestWeatherData);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weatherStorage);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "header {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-evenly;\n  align-items: center;\n  padding-top: 40px;\n  padding-bottom: 80px;\n  flex-wrap: wrap;\n}\n\nbody {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  margin: auto;\n  max-width: 1090px;\n  color: #464136;\n  font-family: roboto, -apple-system, BlinkMacSystemFont, 'Open Sans',\n    'Helvetica Neue', sans-serif;\n  background: rgb(238, 174, 202);\n  background: linear-gradient(\n    90deg,\n    rgba(238, 174, 202, 1) 0%,\n    rgba(148, 187, 233, 1) 100%\n  );\n}\n\n.mainHeading {\n  margin-left: -2%;\n}\n\n.headerRightSide {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.scaleChanger {\n  padding-right: 10px;\n}\n\nbutton {\n  background-color: #ffc3a5;\n  font-size: 14px;\n  padding: 15px;\n  border: none;\n  border-radius: 25px;\n  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,\n    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;\n}\n\n.citysearch {\n  font-size: 14px;\n  padding: 15px;\n  padding-left: 15px;\n\n  border: none;\n  border-radius: 25px;\n  margin-right: 15px;\n  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,\n    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;\n}\n\ninput:hover {\n  box-shadow: rgb(247, 247, 247) 0px 2px 6px -1px,\n    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;\n}\n\ninput:focus {\n  background-color: #fdfff4;\n  outline: 1px solid rgb(247, 247, 247);\n  outline-offset: 1px;\n}\n\nmain {\n  display: flex;\n  justify-content: center;\n}\n\n.mainContainer {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  flex-grow: 1;\n}\n\n.currentWeatherContainer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  flex-grow: 1;\n}\n\n.basic-data {\n  align-self: flex-start;\n  margin-top: 20px;\n  margin-bottom: 20px;\n  padding: 3%;\n  /* From https://css.glass */\n  background: rgba(255, 255, 255, 0.23);\n  border-radius: 16px;\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n  backdrop-filter: blur(7.6px);\n  -webkit-backdrop-filter: blur(7.6px);\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  cursor: default;\n}\n\n.additional-data {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  margin-right: 1%;\n  max-width: 400px;\n}\n\n.additional-data > div {\n  text-align: center;\n  width: 105px;\n  height: 105px;\n  margin-left: 20px;\n  margin-bottom: 20px;\n  padding: 20px;\n  /* From https://css.glass */\n  background: rgba(255, 255, 255, 0.082);\n  border-radius: 16px;\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n  backdrop-filter: blur(7.6px);\n  -webkit-backdrop-filter: blur(7.6px);\n  border: 1px solid rgba(255, 255, 255, 0.048);\n  cursor: default;\n}\n\n.iconAndData {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  font-size: small;\n  font-weight: bolder;\n}\n\n.topRow {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n}\n\n#currentTempterature {\n  font-size: 44px;\n}\n\n#currentDescription {\n  text-align: center;\n  margin-top: -10px;\n  margin-bottom: 15px;\n  font-size: 20px;\n}\n\n#city,\n#country {\n  text-align: center;\n  font-size: smaller;\n}\n\n.forecastContainer {\n  display: flex;\n  flex-direction: column;\n  margin-top: 30%;\n  flex-grow: 1;\n}\n\n.forecast {\n  text-align: center;\n}\n\n.forecastCards {\n  display: flex;\n  justify-content: space-evenly;\n  flex-wrap: wrap;\n}\n\n.forecastCards > div {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-width: 100px;\n  max-width: 120px;\n  padding: 15px;\n  padding-bottom: 15px;\n  margin: 5px;\n  /* From https://css.glass */\n  background: rgba(255, 255, 255, 0.082);\n  border-radius: 16px;\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n  backdrop-filter: blur(7.6px);\n  -webkit-backdrop-filter: blur(7.6px);\n  border: 1px solid rgba(255, 255, 255, 0.048);\n  cursor: default;\n}\n\n.temps {\n  display: flex;\n  justify-content: space-between;\n  max-width: 80%;\n}\n\n.temperature,\n.description,\n.temperatureLow {\n  margin: 1%;\n  font-size: small;\n}\n\n.description {\n  font-weight: bold;\n  max-width: max-content;\n}\n\nfooter {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  margin-top: auto;\n  padding: 20px;\n  font-size: smaller;\n}\n\na:link {\n  color: #ffc3a5;\n}\n\na:visited {\n  color: rgb(155, 67, 105);\n}\n\na:hover {\n  color: rgb(226, 89, 148);\n}\n\na:active {\n  color: rgba(148, 187, 233, 1);\n}\n\n@media screen and (max-width: 600px) {\n  .basic-data {\n    width: 85%;\n  }\n  .currentWeatherContainer,\n  .additional-data {\n    justify-content: center;\n    margin-right: 0px;\n  }\n  .additional-data > div,\n  .forecastCards > div {\n    margin-left: 5px;\n    margin-bottom: 5px;\n  }\n  .additional-data > div {\n    max-width: 100px;\n  }\n  .forecastContainer {\n    margin-top: auto;\n  }\n  p {\n    margin-top: 5px;\n    margin-bottom: 5px;\n  }\n  footer {\n    flex-wrap: wrap;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["header {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-evenly;\n  align-items: center;\n  padding-top: 40px;\n  padding-bottom: 80px;\n  flex-wrap: wrap;\n}\n\nbody {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  margin: auto;\n  max-width: 1090px;\n  color: #464136;\n  font-family: roboto, -apple-system, BlinkMacSystemFont, 'Open Sans',\n    'Helvetica Neue', sans-serif;\n  background: rgb(238, 174, 202);\n  background: linear-gradient(\n    90deg,\n    rgba(238, 174, 202, 1) 0%,\n    rgba(148, 187, 233, 1) 100%\n  );\n}\n\n.mainHeading {\n  margin-left: -2%;\n}\n\n.headerRightSide {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.scaleChanger {\n  padding-right: 10px;\n}\n\nbutton {\n  background-color: #ffc3a5;\n  font-size: 14px;\n  padding: 15px;\n  border: none;\n  border-radius: 25px;\n  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,\n    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;\n}\n\n.citysearch {\n  font-size: 14px;\n  padding: 15px;\n  padding-left: 15px;\n\n  border: none;\n  border-radius: 25px;\n  margin-right: 15px;\n  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,\n    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;\n}\n\ninput:hover {\n  box-shadow: rgb(247, 247, 247) 0px 2px 6px -1px,\n    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;\n}\n\ninput:focus {\n  background-color: #fdfff4;\n  outline: 1px solid rgb(247, 247, 247);\n  outline-offset: 1px;\n}\n\nmain {\n  display: flex;\n  justify-content: center;\n}\n\n.mainContainer {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  flex-grow: 1;\n}\n\n.currentWeatherContainer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  flex-grow: 1;\n}\n\n.basic-data {\n  align-self: flex-start;\n  margin-top: 20px;\n  margin-bottom: 20px;\n  padding: 3%;\n  /* From https://css.glass */\n  background: rgba(255, 255, 255, 0.23);\n  border-radius: 16px;\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n  backdrop-filter: blur(7.6px);\n  -webkit-backdrop-filter: blur(7.6px);\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  cursor: default;\n}\n\n.additional-data {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  margin-right: 1%;\n  max-width: 400px;\n}\n\n.additional-data > div {\n  text-align: center;\n  width: 105px;\n  height: 105px;\n  margin-left: 20px;\n  margin-bottom: 20px;\n  padding: 20px;\n  /* From https://css.glass */\n  background: rgba(255, 255, 255, 0.082);\n  border-radius: 16px;\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n  backdrop-filter: blur(7.6px);\n  -webkit-backdrop-filter: blur(7.6px);\n  border: 1px solid rgba(255, 255, 255, 0.048);\n  cursor: default;\n}\n\n.iconAndData {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  font-size: small;\n  font-weight: bolder;\n}\n\n.topRow {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n}\n\n#currentTempterature {\n  font-size: 44px;\n}\n\n#currentDescription {\n  text-align: center;\n  margin-top: -10px;\n  margin-bottom: 15px;\n  font-size: 20px;\n}\n\n#city,\n#country {\n  text-align: center;\n  font-size: smaller;\n}\n\n.forecastContainer {\n  display: flex;\n  flex-direction: column;\n  margin-top: 30%;\n  flex-grow: 1;\n}\n\n.forecast {\n  text-align: center;\n}\n\n.forecastCards {\n  display: flex;\n  justify-content: space-evenly;\n  flex-wrap: wrap;\n}\n\n.forecastCards > div {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-width: 100px;\n  max-width: 120px;\n  padding: 15px;\n  padding-bottom: 15px;\n  margin: 5px;\n  /* From https://css.glass */\n  background: rgba(255, 255, 255, 0.082);\n  border-radius: 16px;\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n  backdrop-filter: blur(7.6px);\n  -webkit-backdrop-filter: blur(7.6px);\n  border: 1px solid rgba(255, 255, 255, 0.048);\n  cursor: default;\n}\n\n.temps {\n  display: flex;\n  justify-content: space-between;\n  max-width: 80%;\n}\n\n.temperature,\n.description,\n.temperatureLow {\n  margin: 1%;\n  font-size: small;\n}\n\n.description {\n  font-weight: bold;\n  max-width: max-content;\n}\n\nfooter {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  margin-top: auto;\n  padding: 20px;\n  font-size: smaller;\n}\n\na:link {\n  color: #ffc3a5;\n}\n\na:visited {\n  color: rgb(155, 67, 105);\n}\n\na:hover {\n  color: rgb(226, 89, 148);\n}\n\na:active {\n  color: rgba(148, 187, 233, 1);\n}\n\n@media screen and (max-width: 600px) {\n  .basic-data {\n    width: 85%;\n  }\n  .currentWeatherContainer,\n  .additional-data {\n    justify-content: center;\n    margin-right: 0px;\n  }\n  .additional-data > div,\n  .forecastCards > div {\n    margin-left: 5px;\n    margin-bottom: 5px;\n  }\n  .additional-data > div {\n    max-width: 100px;\n  }\n  .forecastContainer {\n    margin-top: auto;\n  }\n  p {\n    margin-top: 5px;\n    margin-bottom: 5px;\n  }\n  footer {\n    flex-wrap: wrap;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/icons/line/all sync \\.(png%7Cjpe?g%7Csvg)$":
/*!*****************************************************************************!*\
  !*** ./src/assets/icons/line/all/ sync nonrecursive \.(png%7Cjpe?g%7Csvg)$ ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./barometer.svg": "./src/assets/icons/line/all/barometer.svg",
	"./celsius.svg": "./src/assets/icons/line/all/celsius.svg",
	"./clear-day.svg": "./src/assets/icons/line/all/clear-day.svg",
	"./clear-night.svg": "./src/assets/icons/line/all/clear-night.svg",
	"./cloudy.svg": "./src/assets/icons/line/all/cloudy.svg",
	"./compass.svg": "./src/assets/icons/line/all/compass.svg",
	"./drizzle.svg": "./src/assets/icons/line/all/drizzle.svg",
	"./dust-day.svg": "./src/assets/icons/line/all/dust-day.svg",
	"./dust-night.svg": "./src/assets/icons/line/all/dust-night.svg",
	"./dust-wind.svg": "./src/assets/icons/line/all/dust-wind.svg",
	"./dust.svg": "./src/assets/icons/line/all/dust.svg",
	"./fahrenheit.svg": "./src/assets/icons/line/all/fahrenheit.svg",
	"./falling-stars.svg": "./src/assets/icons/line/all/falling-stars.svg",
	"./fog-day.svg": "./src/assets/icons/line/all/fog-day.svg",
	"./fog-night.svg": "./src/assets/icons/line/all/fog-night.svg",
	"./fog.svg": "./src/assets/icons/line/all/fog.svg",
	"./hail.svg": "./src/assets/icons/line/all/hail.svg",
	"./haze-day.svg": "./src/assets/icons/line/all/haze-day.svg",
	"./haze-night.svg": "./src/assets/icons/line/all/haze-night.svg",
	"./haze.svg": "./src/assets/icons/line/all/haze.svg",
	"./horizon.svg": "./src/assets/icons/line/all/horizon.svg",
	"./humidity.svg": "./src/assets/icons/line/all/humidity.svg",
	"./hurricane.svg": "./src/assets/icons/line/all/hurricane.svg",
	"./lightning-bolt.svg": "./src/assets/icons/line/all/lightning-bolt.svg",
	"./mist.svg": "./src/assets/icons/line/all/mist.svg",
	"./moon-first-quarter.svg": "./src/assets/icons/line/all/moon-first-quarter.svg",
	"./moon-full.svg": "./src/assets/icons/line/all/moon-full.svg",
	"./moon-last-quarter.svg": "./src/assets/icons/line/all/moon-last-quarter.svg",
	"./moon-new.svg": "./src/assets/icons/line/all/moon-new.svg",
	"./moon-waning-crescent.svg": "./src/assets/icons/line/all/moon-waning-crescent.svg",
	"./moon-waning-gibbous.svg": "./src/assets/icons/line/all/moon-waning-gibbous.svg",
	"./moon-waxing-crescent.svg": "./src/assets/icons/line/all/moon-waxing-crescent.svg",
	"./moon-waxing-gibbous.svg": "./src/assets/icons/line/all/moon-waxing-gibbous.svg",
	"./moonrise.svg": "./src/assets/icons/line/all/moonrise.svg",
	"./moonset.svg": "./src/assets/icons/line/all/moonset.svg",
	"./not-available.svg": "./src/assets/icons/line/all/not-available.svg",
	"./overcast-day.svg": "./src/assets/icons/line/all/overcast-day.svg",
	"./overcast-night.svg": "./src/assets/icons/line/all/overcast-night.svg",
	"./overcast.svg": "./src/assets/icons/line/all/overcast.svg",
	"./partly-cloudy-day-drizzle.svg": "./src/assets/icons/line/all/partly-cloudy-day-drizzle.svg",
	"./partly-cloudy-day-fog.svg": "./src/assets/icons/line/all/partly-cloudy-day-fog.svg",
	"./partly-cloudy-day-hail.svg": "./src/assets/icons/line/all/partly-cloudy-day-hail.svg",
	"./partly-cloudy-day-haze.svg": "./src/assets/icons/line/all/partly-cloudy-day-haze.svg",
	"./partly-cloudy-day-rain.svg": "./src/assets/icons/line/all/partly-cloudy-day-rain.svg",
	"./partly-cloudy-day-sleet.svg": "./src/assets/icons/line/all/partly-cloudy-day-sleet.svg",
	"./partly-cloudy-day-smoke.svg": "./src/assets/icons/line/all/partly-cloudy-day-smoke.svg",
	"./partly-cloudy-day-snow.svg": "./src/assets/icons/line/all/partly-cloudy-day-snow.svg",
	"./partly-cloudy-day.svg": "./src/assets/icons/line/all/partly-cloudy-day.svg",
	"./partly-cloudy-night-drizzle.svg": "./src/assets/icons/line/all/partly-cloudy-night-drizzle.svg",
	"./partly-cloudy-night-fog.svg": "./src/assets/icons/line/all/partly-cloudy-night-fog.svg",
	"./partly-cloudy-night-hail.svg": "./src/assets/icons/line/all/partly-cloudy-night-hail.svg",
	"./partly-cloudy-night-haze.svg": "./src/assets/icons/line/all/partly-cloudy-night-haze.svg",
	"./partly-cloudy-night-rain.svg": "./src/assets/icons/line/all/partly-cloudy-night-rain.svg",
	"./partly-cloudy-night-sleet.svg": "./src/assets/icons/line/all/partly-cloudy-night-sleet.svg",
	"./partly-cloudy-night-smoke.svg": "./src/assets/icons/line/all/partly-cloudy-night-smoke.svg",
	"./partly-cloudy-night-snow.svg": "./src/assets/icons/line/all/partly-cloudy-night-snow.svg",
	"./partly-cloudy-night.svg": "./src/assets/icons/line/all/partly-cloudy-night.svg",
	"./pressure-high-alt.svg": "./src/assets/icons/line/all/pressure-high-alt.svg",
	"./pressure-high.svg": "./src/assets/icons/line/all/pressure-high.svg",
	"./pressure-low-alt.svg": "./src/assets/icons/line/all/pressure-low-alt.svg",
	"./pressure-low.svg": "./src/assets/icons/line/all/pressure-low.svg",
	"./rain.svg": "./src/assets/icons/line/all/rain.svg",
	"./raindrop.svg": "./src/assets/icons/line/all/raindrop.svg",
	"./raindrops.svg": "./src/assets/icons/line/all/raindrops.svg",
	"./sleet.svg": "./src/assets/icons/line/all/sleet.svg",
	"./smoke-particles.svg": "./src/assets/icons/line/all/smoke-particles.svg",
	"./smoke.svg": "./src/assets/icons/line/all/smoke.svg",
	"./snow.svg": "./src/assets/icons/line/all/snow.svg",
	"./snowflake.svg": "./src/assets/icons/line/all/snowflake.svg",
	"./solar-eclipse.svg": "./src/assets/icons/line/all/solar-eclipse.svg",
	"./star.svg": "./src/assets/icons/line/all/star.svg",
	"./starry-night.svg": "./src/assets/icons/line/all/starry-night.svg",
	"./sunrise.svg": "./src/assets/icons/line/all/sunrise.svg",
	"./sunset.svg": "./src/assets/icons/line/all/sunset.svg",
	"./thermometer-celsius.svg": "./src/assets/icons/line/all/thermometer-celsius.svg",
	"./thermometer-colder.svg": "./src/assets/icons/line/all/thermometer-colder.svg",
	"./thermometer-fahrenheit.svg": "./src/assets/icons/line/all/thermometer-fahrenheit.svg",
	"./thermometer-glass-celsius.svg": "./src/assets/icons/line/all/thermometer-glass-celsius.svg",
	"./thermometer-glass-fahrenheit.svg": "./src/assets/icons/line/all/thermometer-glass-fahrenheit.svg",
	"./thermometer-glass.svg": "./src/assets/icons/line/all/thermometer-glass.svg",
	"./thermometer-mercury-cold.svg": "./src/assets/icons/line/all/thermometer-mercury-cold.svg",
	"./thermometer-mercury.svg": "./src/assets/icons/line/all/thermometer-mercury.svg",
	"./thermometer-warmer.svg": "./src/assets/icons/line/all/thermometer-warmer.svg",
	"./thermometer.svg": "./src/assets/icons/line/all/thermometer.svg",
	"./thunderstorms-day-rain.svg": "./src/assets/icons/line/all/thunderstorms-day-rain.svg",
	"./thunderstorms-day-snow.svg": "./src/assets/icons/line/all/thunderstorms-day-snow.svg",
	"./thunderstorms-day.svg": "./src/assets/icons/line/all/thunderstorms-day.svg",
	"./thunderstorms-night-rain.svg": "./src/assets/icons/line/all/thunderstorms-night-rain.svg",
	"./thunderstorms-night-snow.svg": "./src/assets/icons/line/all/thunderstorms-night-snow.svg",
	"./thunderstorms-night.svg": "./src/assets/icons/line/all/thunderstorms-night.svg",
	"./thunderstorms-rain.svg": "./src/assets/icons/line/all/thunderstorms-rain.svg",
	"./thunderstorms-snow.svg": "./src/assets/icons/line/all/thunderstorms-snow.svg",
	"./thunderstorms.svg": "./src/assets/icons/line/all/thunderstorms.svg",
	"./tornado.svg": "./src/assets/icons/line/all/tornado.svg",
	"./umbrella.svg": "./src/assets/icons/line/all/umbrella.svg",
	"./uv-index-1.svg": "./src/assets/icons/line/all/uv-index-1.svg",
	"./uv-index-10.svg": "./src/assets/icons/line/all/uv-index-10.svg",
	"./uv-index-11.svg": "./src/assets/icons/line/all/uv-index-11.svg",
	"./uv-index-2.svg": "./src/assets/icons/line/all/uv-index-2.svg",
	"./uv-index-3.svg": "./src/assets/icons/line/all/uv-index-3.svg",
	"./uv-index-4.svg": "./src/assets/icons/line/all/uv-index-4.svg",
	"./uv-index-5.svg": "./src/assets/icons/line/all/uv-index-5.svg",
	"./uv-index-6.svg": "./src/assets/icons/line/all/uv-index-6.svg",
	"./uv-index-7.svg": "./src/assets/icons/line/all/uv-index-7.svg",
	"./uv-index-8.svg": "./src/assets/icons/line/all/uv-index-8.svg",
	"./uv-index-9.svg": "./src/assets/icons/line/all/uv-index-9.svg",
	"./uv-index.svg": "./src/assets/icons/line/all/uv-index.svg",
	"./wind-beaufort-0.svg": "./src/assets/icons/line/all/wind-beaufort-0.svg",
	"./wind-beaufort-1.svg": "./src/assets/icons/line/all/wind-beaufort-1.svg",
	"./wind-beaufort-10.svg": "./src/assets/icons/line/all/wind-beaufort-10.svg",
	"./wind-beaufort-11.svg": "./src/assets/icons/line/all/wind-beaufort-11.svg",
	"./wind-beaufort-12.svg": "./src/assets/icons/line/all/wind-beaufort-12.svg",
	"./wind-beaufort-2.svg": "./src/assets/icons/line/all/wind-beaufort-2.svg",
	"./wind-beaufort-3.svg": "./src/assets/icons/line/all/wind-beaufort-3.svg",
	"./wind-beaufort-4.svg": "./src/assets/icons/line/all/wind-beaufort-4.svg",
	"./wind-beaufort-5.svg": "./src/assets/icons/line/all/wind-beaufort-5.svg",
	"./wind-beaufort-6.svg": "./src/assets/icons/line/all/wind-beaufort-6.svg",
	"./wind-beaufort-7.svg": "./src/assets/icons/line/all/wind-beaufort-7.svg",
	"./wind-beaufort-8.svg": "./src/assets/icons/line/all/wind-beaufort-8.svg",
	"./wind-beaufort-9.svg": "./src/assets/icons/line/all/wind-beaufort-9.svg",
	"./wind.svg": "./src/assets/icons/line/all/wind.svg",
	"./windsock.svg": "./src/assets/icons/line/all/windsock.svg"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/assets/icons/line/all sync \\.(png%7Cjpe?g%7Csvg)$";

/***/ }),

/***/ "./src/assets/icons/line/all/barometer.svg":
/*!*************************************************!*\
  !*** ./src/assets/icons/line/all/barometer.svg ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "1a6fa988db4c678bf694.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/celsius.svg":
/*!***********************************************!*\
  !*** ./src/assets/icons/line/all/celsius.svg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "e06a9dc80356170d57df.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/clear-day.svg":
/*!*************************************************!*\
  !*** ./src/assets/icons/line/all/clear-day.svg ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "82d493fc389b8c730118.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/clear-night.svg":
/*!***************************************************!*\
  !*** ./src/assets/icons/line/all/clear-night.svg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "a42b7aecb402f64a710e.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/cloudy.svg":
/*!**********************************************!*\
  !*** ./src/assets/icons/line/all/cloudy.svg ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "480c02b3176fc05c58f8.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/compass.svg":
/*!***********************************************!*\
  !*** ./src/assets/icons/line/all/compass.svg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "7958cf2591da6e9152f5.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/drizzle.svg":
/*!***********************************************!*\
  !*** ./src/assets/icons/line/all/drizzle.svg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "8ec6348464463b87cb2d.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/dust-day.svg":
/*!************************************************!*\
  !*** ./src/assets/icons/line/all/dust-day.svg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "db43e08557bd183b84e6.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/dust-night.svg":
/*!**************************************************!*\
  !*** ./src/assets/icons/line/all/dust-night.svg ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "f5d7af65dc882e07e611.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/dust-wind.svg":
/*!*************************************************!*\
  !*** ./src/assets/icons/line/all/dust-wind.svg ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "08dcf47744f0a8752b10.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/dust.svg":
/*!********************************************!*\
  !*** ./src/assets/icons/line/all/dust.svg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "2b2c8773c16ea41d6db2.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/fahrenheit.svg":
/*!**************************************************!*\
  !*** ./src/assets/icons/line/all/fahrenheit.svg ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "9f35fa2f8c2a52243fd4.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/falling-stars.svg":
/*!*****************************************************!*\
  !*** ./src/assets/icons/line/all/falling-stars.svg ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "7f3795530f2c9fed139e.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/fog-day.svg":
/*!***********************************************!*\
  !*** ./src/assets/icons/line/all/fog-day.svg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ad91214021df4c7ba690.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/fog-night.svg":
/*!*************************************************!*\
  !*** ./src/assets/icons/line/all/fog-night.svg ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "5c566277dae8a57081f3.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/fog.svg":
/*!*******************************************!*\
  !*** ./src/assets/icons/line/all/fog.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "a4fb212c874b83e3d23c.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/hail.svg":
/*!********************************************!*\
  !*** ./src/assets/icons/line/all/hail.svg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "51c45daa29f1295ac8e2.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/haze-day.svg":
/*!************************************************!*\
  !*** ./src/assets/icons/line/all/haze-day.svg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "e3b1b9bcd56fec45e015.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/haze-night.svg":
/*!**************************************************!*\
  !*** ./src/assets/icons/line/all/haze-night.svg ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "a0adf7fc993002a4b6ef.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/haze.svg":
/*!********************************************!*\
  !*** ./src/assets/icons/line/all/haze.svg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "152867dee4a8e6e02841.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/horizon.svg":
/*!***********************************************!*\
  !*** ./src/assets/icons/line/all/horizon.svg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "624711919d5f272731d6.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/humidity.svg":
/*!************************************************!*\
  !*** ./src/assets/icons/line/all/humidity.svg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "f9cc811647cd1c8cbc4c.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/hurricane.svg":
/*!*************************************************!*\
  !*** ./src/assets/icons/line/all/hurricane.svg ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "c63523f9682b9056c21a.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/lightning-bolt.svg":
/*!******************************************************!*\
  !*** ./src/assets/icons/line/all/lightning-bolt.svg ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "0bf50428b8fc6541a6a4.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/mist.svg":
/*!********************************************!*\
  !*** ./src/assets/icons/line/all/mist.svg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "04c7c2b59cc7f880964e.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/moon-first-quarter.svg":
/*!**********************************************************!*\
  !*** ./src/assets/icons/line/all/moon-first-quarter.svg ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ac57baadea8d30b0b3e3.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/moon-full.svg":
/*!*************************************************!*\
  !*** ./src/assets/icons/line/all/moon-full.svg ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "873b497f2027bac94e9a.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/moon-last-quarter.svg":
/*!*********************************************************!*\
  !*** ./src/assets/icons/line/all/moon-last-quarter.svg ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "9d7fdcb08d66e801c683.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/moon-new.svg":
/*!************************************************!*\
  !*** ./src/assets/icons/line/all/moon-new.svg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6c5f7a32f6b132d99b80.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/moon-waning-crescent.svg":
/*!************************************************************!*\
  !*** ./src/assets/icons/line/all/moon-waning-crescent.svg ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "7ced20e325935b6ab406.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/moon-waning-gibbous.svg":
/*!***********************************************************!*\
  !*** ./src/assets/icons/line/all/moon-waning-gibbous.svg ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "623583119c1d1789a9c1.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/moon-waxing-crescent.svg":
/*!************************************************************!*\
  !*** ./src/assets/icons/line/all/moon-waxing-crescent.svg ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ae330212d2435d465cfb.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/moon-waxing-gibbous.svg":
/*!***********************************************************!*\
  !*** ./src/assets/icons/line/all/moon-waxing-gibbous.svg ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "3c577a2ee58efa9e73aa.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/moonrise.svg":
/*!************************************************!*\
  !*** ./src/assets/icons/line/all/moonrise.svg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "7c5db2b9e52e30639ffb.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/moonset.svg":
/*!***********************************************!*\
  !*** ./src/assets/icons/line/all/moonset.svg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "7f7ba5bd625bd30003de.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/not-available.svg":
/*!*****************************************************!*\
  !*** ./src/assets/icons/line/all/not-available.svg ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "28474c0c0732eb5c31b4.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/overcast-day.svg":
/*!****************************************************!*\
  !*** ./src/assets/icons/line/all/overcast-day.svg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "4f508dc987ca7347cd44.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/overcast-night.svg":
/*!******************************************************!*\
  !*** ./src/assets/icons/line/all/overcast-night.svg ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "f48b4d3cf22d4cdcf119.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/overcast.svg":
/*!************************************************!*\
  !*** ./src/assets/icons/line/all/overcast.svg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "e49559c8bc76f5831268.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/partly-cloudy-day-drizzle.svg":
/*!*****************************************************************!*\
  !*** ./src/assets/icons/line/all/partly-cloudy-day-drizzle.svg ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "a5effb5685c45a59b832.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/partly-cloudy-day-fog.svg":
/*!*************************************************************!*\
  !*** ./src/assets/icons/line/all/partly-cloudy-day-fog.svg ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "49fe2a2ab549593c6363.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/partly-cloudy-day-hail.svg":
/*!**************************************************************!*\
  !*** ./src/assets/icons/line/all/partly-cloudy-day-hail.svg ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "511842becdefa6011aa7.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/partly-cloudy-day-haze.svg":
/*!**************************************************************!*\
  !*** ./src/assets/icons/line/all/partly-cloudy-day-haze.svg ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "bacc4f12dba711d42630.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/partly-cloudy-day-rain.svg":
/*!**************************************************************!*\
  !*** ./src/assets/icons/line/all/partly-cloudy-day-rain.svg ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "0fa0c57a11b86f495d04.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/partly-cloudy-day-sleet.svg":
/*!***************************************************************!*\
  !*** ./src/assets/icons/line/all/partly-cloudy-day-sleet.svg ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6373ad43072fec40de67.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/partly-cloudy-day-smoke.svg":
/*!***************************************************************!*\
  !*** ./src/assets/icons/line/all/partly-cloudy-day-smoke.svg ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "1a98a205da331590b6e6.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/partly-cloudy-day-snow.svg":
/*!**************************************************************!*\
  !*** ./src/assets/icons/line/all/partly-cloudy-day-snow.svg ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "9837f9816c7bc53d704c.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/partly-cloudy-day.svg":
/*!*********************************************************!*\
  !*** ./src/assets/icons/line/all/partly-cloudy-day.svg ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "55422f882a4f7a801e19.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/partly-cloudy-night-drizzle.svg":
/*!*******************************************************************!*\
  !*** ./src/assets/icons/line/all/partly-cloudy-night-drizzle.svg ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "a7e5b9900ecfbeb7799a.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/partly-cloudy-night-fog.svg":
/*!***************************************************************!*\
  !*** ./src/assets/icons/line/all/partly-cloudy-night-fog.svg ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ac12781f6a4f43d19e65.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/partly-cloudy-night-hail.svg":
/*!****************************************************************!*\
  !*** ./src/assets/icons/line/all/partly-cloudy-night-hail.svg ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "105e979e1cf90286f0e2.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/partly-cloudy-night-haze.svg":
/*!****************************************************************!*\
  !*** ./src/assets/icons/line/all/partly-cloudy-night-haze.svg ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "2b14ac0d7e5e6be10c92.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/partly-cloudy-night-rain.svg":
/*!****************************************************************!*\
  !*** ./src/assets/icons/line/all/partly-cloudy-night-rain.svg ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "38971dda81ef1de2b3fa.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/partly-cloudy-night-sleet.svg":
/*!*****************************************************************!*\
  !*** ./src/assets/icons/line/all/partly-cloudy-night-sleet.svg ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "0f147e32a0ef1506260d.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/partly-cloudy-night-smoke.svg":
/*!*****************************************************************!*\
  !*** ./src/assets/icons/line/all/partly-cloudy-night-smoke.svg ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "84e293687fb91aae1fd7.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/partly-cloudy-night-snow.svg":
/*!****************************************************************!*\
  !*** ./src/assets/icons/line/all/partly-cloudy-night-snow.svg ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "f7d5b45fd5fa9e12bfe0.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/partly-cloudy-night.svg":
/*!***********************************************************!*\
  !*** ./src/assets/icons/line/all/partly-cloudy-night.svg ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "f84acd637efd8b2fc2ad.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/pressure-high-alt.svg":
/*!*********************************************************!*\
  !*** ./src/assets/icons/line/all/pressure-high-alt.svg ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "83b1c71dcc12d62523b1.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/pressure-high.svg":
/*!*****************************************************!*\
  !*** ./src/assets/icons/line/all/pressure-high.svg ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "80df05ed42d21e4b1f65.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/pressure-low-alt.svg":
/*!********************************************************!*\
  !*** ./src/assets/icons/line/all/pressure-low-alt.svg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "e7d9e4634621c38ab672.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/pressure-low.svg":
/*!****************************************************!*\
  !*** ./src/assets/icons/line/all/pressure-low.svg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "5565c61566cac091a2ae.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/rain.svg":
/*!********************************************!*\
  !*** ./src/assets/icons/line/all/rain.svg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "7d9bdc4d85bf8a6df385.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/raindrop.svg":
/*!************************************************!*\
  !*** ./src/assets/icons/line/all/raindrop.svg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "87bf8de1608474b89d86.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/raindrops.svg":
/*!*************************************************!*\
  !*** ./src/assets/icons/line/all/raindrops.svg ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "381a439e0efa739f59ad.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/sleet.svg":
/*!*********************************************!*\
  !*** ./src/assets/icons/line/all/sleet.svg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "9ebe53f78102eeda8dda.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/smoke-particles.svg":
/*!*******************************************************!*\
  !*** ./src/assets/icons/line/all/smoke-particles.svg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ae4ba912990b0a62e3d0.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/smoke.svg":
/*!*********************************************!*\
  !*** ./src/assets/icons/line/all/smoke.svg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "2120049c8467033332fa.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/snow.svg":
/*!********************************************!*\
  !*** ./src/assets/icons/line/all/snow.svg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "57003ca1eba0d7b9fac6.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/snowflake.svg":
/*!*************************************************!*\
  !*** ./src/assets/icons/line/all/snowflake.svg ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "04950538f62267de9ac7.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/solar-eclipse.svg":
/*!*****************************************************!*\
  !*** ./src/assets/icons/line/all/solar-eclipse.svg ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "9adfc7f1e09d53977d0f.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/star.svg":
/*!********************************************!*\
  !*** ./src/assets/icons/line/all/star.svg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "53abc34d71d85f0458ea.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/starry-night.svg":
/*!****************************************************!*\
  !*** ./src/assets/icons/line/all/starry-night.svg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "d05e8f8a86f269f6aa7a.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/sunrise.svg":
/*!***********************************************!*\
  !*** ./src/assets/icons/line/all/sunrise.svg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "4ee5d8b0c507d6317734.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/sunset.svg":
/*!**********************************************!*\
  !*** ./src/assets/icons/line/all/sunset.svg ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "d94b1f50eb63d66b6f28.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/thermometer-celsius.svg":
/*!***********************************************************!*\
  !*** ./src/assets/icons/line/all/thermometer-celsius.svg ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "e0cf9c31ceb53a283b0e.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/thermometer-colder.svg":
/*!**********************************************************!*\
  !*** ./src/assets/icons/line/all/thermometer-colder.svg ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "cbcde59ee2d82ac18e0a.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/thermometer-fahrenheit.svg":
/*!**************************************************************!*\
  !*** ./src/assets/icons/line/all/thermometer-fahrenheit.svg ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "9e51f6fda1b175a7244b.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/thermometer-glass-celsius.svg":
/*!*****************************************************************!*\
  !*** ./src/assets/icons/line/all/thermometer-glass-celsius.svg ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "686c4323e56d3f12e8aa.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/thermometer-glass-fahrenheit.svg":
/*!********************************************************************!*\
  !*** ./src/assets/icons/line/all/thermometer-glass-fahrenheit.svg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "5f10dc62df9c53cd12bd.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/thermometer-glass.svg":
/*!*********************************************************!*\
  !*** ./src/assets/icons/line/all/thermometer-glass.svg ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "bb823e53b99aec8a3a76.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/thermometer-mercury-cold.svg":
/*!****************************************************************!*\
  !*** ./src/assets/icons/line/all/thermometer-mercury-cold.svg ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "73fe826b436fd3555da3.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/thermometer-mercury.svg":
/*!***********************************************************!*\
  !*** ./src/assets/icons/line/all/thermometer-mercury.svg ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "a150706a5915d213de32.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/thermometer-warmer.svg":
/*!**********************************************************!*\
  !*** ./src/assets/icons/line/all/thermometer-warmer.svg ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "b3ee40486c4175b46ea3.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/thermometer.svg":
/*!***************************************************!*\
  !*** ./src/assets/icons/line/all/thermometer.svg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "b6afe986ff21e7553f51.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/thunderstorms-day-rain.svg":
/*!**************************************************************!*\
  !*** ./src/assets/icons/line/all/thunderstorms-day-rain.svg ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "dd451d939550cfab391d.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/thunderstorms-day-snow.svg":
/*!**************************************************************!*\
  !*** ./src/assets/icons/line/all/thunderstorms-day-snow.svg ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "2842d4baf823180e6c93.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/thunderstorms-day.svg":
/*!*********************************************************!*\
  !*** ./src/assets/icons/line/all/thunderstorms-day.svg ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6f8b3f9049db2fc4a85b.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/thunderstorms-night-rain.svg":
/*!****************************************************************!*\
  !*** ./src/assets/icons/line/all/thunderstorms-night-rain.svg ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "8e519f1843976ec44de7.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/thunderstorms-night-snow.svg":
/*!****************************************************************!*\
  !*** ./src/assets/icons/line/all/thunderstorms-night-snow.svg ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "30b4501785ad34f55fef.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/thunderstorms-night.svg":
/*!***********************************************************!*\
  !*** ./src/assets/icons/line/all/thunderstorms-night.svg ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "e98f2dac4eb23c5e83c3.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/thunderstorms-rain.svg":
/*!**********************************************************!*\
  !*** ./src/assets/icons/line/all/thunderstorms-rain.svg ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "3a41f1346aa38634f476.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/thunderstorms-snow.svg":
/*!**********************************************************!*\
  !*** ./src/assets/icons/line/all/thunderstorms-snow.svg ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ed479556ea1711b2334f.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/thunderstorms.svg":
/*!*****************************************************!*\
  !*** ./src/assets/icons/line/all/thunderstorms.svg ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "d0afc492a200f9650be3.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/tornado.svg":
/*!***********************************************!*\
  !*** ./src/assets/icons/line/all/tornado.svg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "a88ffd1b6ef136687081.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/umbrella.svg":
/*!************************************************!*\
  !*** ./src/assets/icons/line/all/umbrella.svg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "83a363f551ac4169c52b.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/uv-index-1.svg":
/*!**************************************************!*\
  !*** ./src/assets/icons/line/all/uv-index-1.svg ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "33981b21738fe54f4040.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/uv-index-10.svg":
/*!***************************************************!*\
  !*** ./src/assets/icons/line/all/uv-index-10.svg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "d49e9e97ef0311ed5f51.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/uv-index-11.svg":
/*!***************************************************!*\
  !*** ./src/assets/icons/line/all/uv-index-11.svg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6b18579568d15e4048f1.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/uv-index-2.svg":
/*!**************************************************!*\
  !*** ./src/assets/icons/line/all/uv-index-2.svg ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6634f4eb1cd53b4270a5.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/uv-index-3.svg":
/*!**************************************************!*\
  !*** ./src/assets/icons/line/all/uv-index-3.svg ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "b35a91624b2438bb8ca7.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/uv-index-4.svg":
/*!**************************************************!*\
  !*** ./src/assets/icons/line/all/uv-index-4.svg ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "1299b3f6a70d076cce8a.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/uv-index-5.svg":
/*!**************************************************!*\
  !*** ./src/assets/icons/line/all/uv-index-5.svg ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6f9758b172c4e995982e.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/uv-index-6.svg":
/*!**************************************************!*\
  !*** ./src/assets/icons/line/all/uv-index-6.svg ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "548efb305fa0d75e9d5d.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/uv-index-7.svg":
/*!**************************************************!*\
  !*** ./src/assets/icons/line/all/uv-index-7.svg ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "c1e5d174f46d30c96b18.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/uv-index-8.svg":
/*!**************************************************!*\
  !*** ./src/assets/icons/line/all/uv-index-8.svg ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "753280b6230c680f9e4e.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/uv-index-9.svg":
/*!**************************************************!*\
  !*** ./src/assets/icons/line/all/uv-index-9.svg ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6398527992503da9dcdd.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/uv-index.svg":
/*!************************************************!*\
  !*** ./src/assets/icons/line/all/uv-index.svg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "24f4b7fec5d96f4a5768.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/wind-beaufort-0.svg":
/*!*******************************************************!*\
  !*** ./src/assets/icons/line/all/wind-beaufort-0.svg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "1e7e2c2ee120f6e3bd73.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/wind-beaufort-1.svg":
/*!*******************************************************!*\
  !*** ./src/assets/icons/line/all/wind-beaufort-1.svg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "22609e1c84dfd4a6a053.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/wind-beaufort-10.svg":
/*!********************************************************!*\
  !*** ./src/assets/icons/line/all/wind-beaufort-10.svg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "3feb1adac26aa94222fc.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/wind-beaufort-11.svg":
/*!********************************************************!*\
  !*** ./src/assets/icons/line/all/wind-beaufort-11.svg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "0510b4eedd784eef2aa9.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/wind-beaufort-12.svg":
/*!********************************************************!*\
  !*** ./src/assets/icons/line/all/wind-beaufort-12.svg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "36bbde6e92d9e879f806.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/wind-beaufort-2.svg":
/*!*******************************************************!*\
  !*** ./src/assets/icons/line/all/wind-beaufort-2.svg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "eae1f4989d820a2293ad.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/wind-beaufort-3.svg":
/*!*******************************************************!*\
  !*** ./src/assets/icons/line/all/wind-beaufort-3.svg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "58d55c81e4b7e2965bca.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/wind-beaufort-4.svg":
/*!*******************************************************!*\
  !*** ./src/assets/icons/line/all/wind-beaufort-4.svg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "7fa5c6a3d2523c1a97c2.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/wind-beaufort-5.svg":
/*!*******************************************************!*\
  !*** ./src/assets/icons/line/all/wind-beaufort-5.svg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "d72144afde21c6b904a8.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/wind-beaufort-6.svg":
/*!*******************************************************!*\
  !*** ./src/assets/icons/line/all/wind-beaufort-6.svg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "3628224dace3f491b279.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/wind-beaufort-7.svg":
/*!*******************************************************!*\
  !*** ./src/assets/icons/line/all/wind-beaufort-7.svg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "419b3c9fd7fb61d89cba.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/wind-beaufort-8.svg":
/*!*******************************************************!*\
  !*** ./src/assets/icons/line/all/wind-beaufort-8.svg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "e4d9384b53178c9e1b32.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/wind-beaufort-9.svg":
/*!*******************************************************!*\
  !*** ./src/assets/icons/line/all/wind-beaufort-9.svg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "66c29d188b446e751bd8.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/wind.svg":
/*!********************************************!*\
  !*** ./src/assets/icons/line/all/wind.svg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "9499e77495febdbbdec8.svg";

/***/ }),

/***/ "./src/assets/icons/line/all/windsock.svg":
/*!************************************************!*\
  !*** ./src/assets/icons/line/all/windsock.svg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "b761528ad3d1542feb6a.svg";

/***/ }),

/***/ "./src/assets/weather_conditions.json":
/*!********************************************!*\
  !*** ./src/assets/weather_conditions.json ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"code":1000,"day":"clear-day.svg","night":"starry-night.svg"},{"code":1003,"day":"partly-cloudy-day.svg","night":"partly-cloudy-night.svg"},{"code":1006,"day":"cloudy.svg","night":"partly-cloudy-night.svg"},{"code":1009,"day":"overcast.svg","night":"overcast-night.svg","icon":122},{"code":1030,"day":"mist.svg","night":"mist.svg","icon":143},{"code":1063,"day":"partly-cloudy-day-rain.svg","night":"partly-cloudy-night-rain.svg","icon":176},{"code":1066,"day":"partly-cloudy-day-snow.svg","night":"partly-cloudy-night-snow.svg","icon":179},{"code":1069,"day":"partly-cloudy-day-sleet.svg","night":"partly-cloudy-night-sleet.svg","icon":182},{"code":1072,"day":"partly-cloudy-day-sleet.svg","night":"partly-cloudy-night-sleet.svg","icon":185},{"code":1087,"day":"thunderstorms-day-rain.svg","night":"thunderstorms-night-rain.svg","icon":200},{"code":1114,"day":"wind.svg","night":"wind.svg","icon":227},{"code":1117,"day":"snow.svg","night":"snow.svg","icon":230},{"code":1135,"day":"fog-day.svg","night":"fog-night.svg","icon":248},{"code":1147,"day":"haze-day.svg","night":"haze-night.svg","icon":260},{"code":1150,"day":"partly-cloudy-day-rain.svg","night":"partly-cloudy-night-rain.svg","icon":263},{"code":1153,"day":"partly-cloudy-day-rain.svg","night":"partly-cloudy-night-rain.svg","icon":266},{"code":1168,"day":"partly-cloudy-day-rain.svg","night":"partly-cloudy-night-rain.svg","icon":281},{"code":1171,"day":"partly-cloudy-day-sleet.svg","night":"partly-cloudy-night-sleet.svg","icon":284},{"code":1180,"day":"partly-cloudy-day-drizzle.svg","night":"partly-cloudy-night-drizzle.svg","icon":293},{"code":1183,"day":"partly-cloudy-day-drizzle.svg","night":"partly-cloudy-night-drizzle.svg","icon":296},{"code":1186,"day":"partly-cloudy-day-rain.svg","night":"partly-cloudy-night-rain.svg","icon":299},{"code":1189,"day":"rain.svg","night":"rain.svg","icon":302},{"code":1192,"day":"raindrops.svg","night":"raindrops.svg","icon":305},{"code":1195,"day":"rain.svg","night":"rain.svg","icon":308},{"code":1198,"day":"sleet.svg","night":"sleet.svg","icon":311},{"code":1201,"day":"sleet.svg","night":"sleet.svg","icon":314},{"code":1204,"day":"sleet.svg","night":"sleet.svg","icon":317},{"code":1207,"day":"sleet.svg","night":"sleet.svg","icon":320},{"code":1210,"day":"partly-cloudy-day-snow.svg","night":"partly-cloudy-night-snow.svg","icon":323},{"code":1213,"day":"snow.svg","night":"snow.svg","icon":326},{"code":1216,"day":"partly-cloudy-day-snow.svg","night":"partly-cloudy-night-snow.svg","icon":329},{"code":1219,"day":"snow.svg","night":"snow.svg","icon":332},{"code":1222,"day":"snow.svg","night":"snow.svg","icon":335},{"code":1225,"day":"snow.svg","night":"snow.svg","icon":338},{"code":1237,"day":"hail.svg","night":"hail.svg","icon":350},{"code":1240,"day":"partly-cloudy-day-rain.svg","night":"partly-cloudy-night-rain.svg","icon":353},{"code":1243,"day":"rain.svg","night":"rain.svg","icon":356},{"code":1246,"day":"raindrops.svg","night":"raindrops.svg","icon":359},{"code":1249,"day":"partly-cloudy-day-sleet.svg","night":"partly-cloudy-night-sleet.svg","icon":362},{"code":1252,"day":"partly-cloudy-day-sleet.svg","night":"partly-cloudy-night-sleet.svg","icon":365},{"code":1255,"day":"partly-cloudy-day-snow.svg","night":"partly-cloudy-night-snow.svg","icon":368},{"code":1258,"day":"snow.svg","night":"snow.svg","icon":371},{"code":1261,"day":"partly-cloudy-day-hail.svg","night":"partly-cloudy-night-hail.svg","icon":374},{"code":1264,"day":"partly-cloudy-day-hail.svg","night":"partly-cloudy-night-hail.svg","icon":377},{"code":1273,"day":"thunderstorms-day-rain.svg","night":"thunderstorms-night-rain.svg","icon":386},{"code":1276,"day":"thunderstorms-rain.svg","night":"thunderstorms-rain.svg","icon":389},{"code":1279,"day":"thunderstorms-day-snow.svg","night":"thunderstorms-night-snow.svg","icon":392},{"code":1282,"day":"thunderstorms-snow.svg","night":"thunderstorms-snow.svg","icon":395}]');

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TSxPQUFPLE9BQU8sS0FBSyxLQUFLLE9BQU8sT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLE9BQU8sTUFBTSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxPQUFPLE9BQU8sVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxLQUFLLFVBQVUsS0FBSyxNQUFNLFlBQVksYUFBYSxNQUFNLE1BQU0sWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsTUFBTSxpQ0FBaUMsa0JBQWtCLHdCQUF3QixrQ0FBa0Msd0JBQXdCLHNCQUFzQix5QkFBeUIsb0JBQW9CLEdBQUcsVUFBVSxzQkFBc0Isa0JBQWtCLDJCQUEyQixpQkFBaUIsc0JBQXNCLG1CQUFtQiwyR0FBMkcsbUNBQW1DLG1IQUFtSCxHQUFHLGtCQUFrQixxQkFBcUIsR0FBRyxzQkFBc0Isa0JBQWtCLHdCQUF3Qix3QkFBd0IsR0FBRyxtQkFBbUIsd0JBQXdCLEdBQUcsWUFBWSw4QkFBOEIsb0JBQW9CLGtCQUFrQixpQkFBaUIsd0JBQXdCLGtHQUFrRyxHQUFHLGlCQUFpQixvQkFBb0Isa0JBQWtCLHVCQUF1QixtQkFBbUIsd0JBQXdCLHVCQUF1QixrR0FBa0csR0FBRyxpQkFBaUIsOEZBQThGLEdBQUcsaUJBQWlCLDhCQUE4QiwwQ0FBMEMsd0JBQXdCLEdBQUcsVUFBVSxrQkFBa0IsNEJBQTRCLEdBQUcsb0JBQW9CLGtCQUFrQiw0QkFBNEIsMkJBQTJCLGlCQUFpQixHQUFHLDhCQUE4QixrQkFBa0IsbUNBQW1DLHdCQUF3QixvQkFBb0IsaUJBQWlCLEdBQUcsaUJBQWlCLDJCQUEyQixxQkFBcUIsd0JBQXdCLGdCQUFnQiwwRUFBMEUsd0JBQXdCLDhDQUE4QyxpQ0FBaUMseUNBQXlDLGdEQUFnRCxvQkFBb0IsR0FBRyxzQkFBc0Isa0JBQWtCLG9CQUFvQiw4QkFBOEIscUJBQXFCLHFCQUFxQixHQUFHLDRCQUE0Qix1QkFBdUIsaUJBQWlCLGtCQUFrQixzQkFBc0Isd0JBQXdCLGtCQUFrQiwyRUFBMkUsd0JBQXdCLDhDQUE4QyxpQ0FBaUMseUNBQXlDLGlEQUFpRCxvQkFBb0IsR0FBRyxrQkFBa0Isa0JBQWtCLHdCQUF3Qix3QkFBd0IscUJBQXFCLHdCQUF3QixHQUFHLGFBQWEsa0JBQWtCLGtDQUFrQyx3QkFBd0IsR0FBRywwQkFBMEIsb0JBQW9CLEdBQUcseUJBQXlCLHVCQUF1QixzQkFBc0Isd0JBQXdCLG9CQUFvQixHQUFHLHNCQUFzQix1QkFBdUIsdUJBQXVCLEdBQUcsd0JBQXdCLGtCQUFrQiwyQkFBMkIsb0JBQW9CLGlCQUFpQixHQUFHLGVBQWUsdUJBQXVCLEdBQUcsb0JBQW9CLGtCQUFrQixrQ0FBa0Msb0JBQW9CLEdBQUcsMEJBQTBCLGtCQUFrQiwyQkFBMkIsd0JBQXdCLHFCQUFxQixxQkFBcUIsa0JBQWtCLHlCQUF5QixnQkFBZ0IsMkVBQTJFLHdCQUF3Qiw4Q0FBOEMsaUNBQWlDLHlDQUF5QyxpREFBaUQsb0JBQW9CLEdBQUcsWUFBWSxrQkFBa0IsbUNBQW1DLG1CQUFtQixHQUFHLG1EQUFtRCxlQUFlLHFCQUFxQixHQUFHLGtCQUFrQixzQkFBc0IsMkJBQTJCLEdBQUcsWUFBWSxrQkFBa0Isd0JBQXdCLGtDQUFrQyxxQkFBcUIsa0JBQWtCLHVCQUF1QixHQUFHLFlBQVksbUJBQW1CLEdBQUcsZUFBZSw2QkFBNkIsR0FBRyxhQUFhLDZCQUE2QixHQUFHLGNBQWMsa0NBQWtDLEdBQUcsMENBQTBDLGlCQUFpQixpQkFBaUIsS0FBSyxtREFBbUQsOEJBQThCLHdCQUF3QixLQUFLLHFEQUFxRCx1QkFBdUIseUJBQXlCLEtBQUssNEJBQTRCLHVCQUF1QixLQUFLLHdCQUF3Qix1QkFBdUIsS0FBSyxPQUFPLHNCQUFzQix5QkFBeUIsS0FBSyxZQUFZLHNCQUFzQixLQUFLLEdBQUcscUJBQXFCO0FBQzdtWTtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7QUNQMUI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSxxRkFBcUY7QUFDckY7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNGQUFzRixxQkFBcUI7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGlEQUFpRCxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNEQUFzRCxxQkFBcUI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNwRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEEsTUFBK0Y7QUFDL0YsTUFBcUY7QUFDckYsTUFBNEY7QUFDNUYsTUFBK0c7QUFDL0csTUFBd0c7QUFDeEcsTUFBd0c7QUFDeEcsTUFBbUc7QUFDbkc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyxzRkFBTzs7OztBQUk2QztBQUNyRSxPQUFPLGlFQUFlLHNGQUFPLElBQUksNkZBQWMsR0FBRyw2RkFBYyxZQUFZLEVBQUM7Ozs7Ozs7Ozs7OztBQzFCaEU7O0FBRWI7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbkZhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNqQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL3NyYy9tb2R1bGVzL2FwaS5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9zcmMvbW9kdWxlcy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9zcmMvbW9kdWxlcy9sb2NhdG9yLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL3NyYy9tb2R1bGVzL3dlYXRoZXJPYmplY3QuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvIHN5bmMgbm9ucmVjdXJzaXZlIFxcLihwbmclN0NqcGUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgaW5qZWN0RGF0YSBmcm9tICcuL21vZHVsZXMvY29udHJvbGxlcic7XG5pbXBvcnQgdXNlckxvY2F0b3IgZnJvbSAnLi9tb2R1bGVzL2xvY2F0b3InO1xuXG5pbmplY3REYXRhKCk7XG51c2VyTG9jYXRvcigpO1xuIiwiaW1wb3J0IHVwZGF0ZURpc3BsYXkgZnJvbSAnLi9kb20nO1xuaW1wb3J0IHdlYXRoZXJTdG9yYWdlIGZyb20gJy4vd2VhdGhlck9iamVjdCc7XG5cbmNvbnN0IGZldGNoV2VhdGhlciA9IGFzeW5jIChsb2NhdGlvbikgPT4ge1xuICBhc3luYyBmdW5jdGlvbiBzZWFyY2hXaXRoQ2l0eSgpIHtcbiAgICBpZiAobG9jYXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgbG9jYXRpb24gPSAnTG9uZG9uJztcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT00N2RiODY5MGVhM2U0NDMzODAzMTIzNzA2MjMyMjAzJnE9JHtsb2NhdGlvbn0mZGF5cz02YFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlRGF0YSk7XG4gICAgICB1cGRhdGVEaXNwbGF5KHJlc3BvbnNlRGF0YSk7XG4gICAgICB3ZWF0aGVyU3RvcmFnZShyZXNwb25zZURhdGEpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgc2VhcmNoV2l0aENpdHkoKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZldGNoV2VhdGhlcjtcbiIsImltcG9ydCBmZXRjaFdlYXRoZXIgZnJvbSAnLi9hcGknO1xuXG5jb25zdCBpbmplY3REYXRhID0gKCkgPT4ge1xuICBjb25zdCBjaXR5VG9TZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2l0eXNlYXJjaCcpO1xuICBjb25zdCBzZWFyY2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcnVuc2VhcmNoJyk7XG5cbiAgZnVuY3Rpb24gZml4U3BlY2lhbENoYXJzKCkge1xuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgbmVlZGVkLCBhcyB3ZWF0aGVyQVBJIHBhcnNlcyBjaGFyYWN0ZXJzIGxpa2Ugw7bDpMOlIGJhZGx5XG4gICAgbGV0IGNpdHlWYWx1ZSA9IGNpdHlUb1NlYXJjaC52YWx1ZS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcnKTtcbiAgICBsZXQgaXRlcmF0ZWRDaXR5ID0gW107XG4gICAgY2l0eVZhbHVlLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGlmIChlbGVtZW50ID09PSAnw7YnKSB7XG4gICAgICAgIGl0ZXJhdGVkQ2l0eS5wdXNoKCdvJyk7XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgPT09ICfDpCcpIHtcbiAgICAgICAgaXRlcmF0ZWRDaXR5LnB1c2goJ2EnKTtcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCA9PT0gJ8OlJykge1xuICAgICAgICBpdGVyYXRlZENpdHkucHVzaCgnYScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlcmF0ZWRDaXR5LnB1c2goZWxlbWVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgcGFyc2VkQ2l0eSA9IGl0ZXJhdGVkQ2l0eS5qb2luKCcnKTtcbiAgICByZXR1cm4gcGFyc2VkQ2l0eTtcbiAgfVxuXG4gIHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIHJ1blNlYXJjaCgpIHtcbiAgICBjb25zdCBzZWFyY1BhcmFtZXRlciA9IGZpeFNwZWNpYWxDaGFycygpO1xuICAgIGZldGNoV2VhdGhlcihzZWFyY1BhcmFtZXRlcik7XG4gIH0pO1xuXG4gIGNpdHlUb1NlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGZ1bmN0aW9uIHJ1blNlYXJjaChldmVudCkge1xuICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgIGNvbnN0IHNlYXJjUGFyYW1ldGVyID0gZml4U3BlY2lhbENoYXJzKCk7XG4gICAgICBmZXRjaFdlYXRoZXIoc2VhcmNQYXJhbWV0ZXIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBpbmplY3REYXRhO1xuIiwiY29uc3Qgd2VhdGhlckpTT04gPSByZXF1aXJlKCcuLi9hc3NldHMvd2VhdGhlcl9jb25kaXRpb25zLmpzb24nKTtcblxuLy8gSW1wb3J0IGljb24gYXNzZXRzXG5mdW5jdGlvbiBpbXBvcnRJY29ucyhyKSB7XG4gIGxldCBpY29ucyA9IHt9O1xuICByLmtleXMoKS5tYXAoKGl0ZW0pID0+IHtcbiAgICBpY29uc1tpdGVtLnJlcGxhY2UoJy4vJywgJycpXSA9IHIoaXRlbSk7XG4gIH0pO1xuICByZXR1cm4gaWNvbnM7XG59XG5jb25zdCBpY29ucyA9IGltcG9ydEljb25zKFxuICByZXF1aXJlLmNvbnRleHQoJy4uL2Fzc2V0cy9pY29ucy9saW5lL2FsbCcsIGZhbHNlLCAvXFwuKHBuZ3xqcGU/Z3xzdmcpJC8pXG4pO1xuXG4vKiBET00gTUFOSVBVTEFUSU9OICovXG5cbmNvbnN0IHVwZGF0ZURpc3BsYXkgPSAod2VhdGhlckRhdGEpID0+IHtcbiAgY29uc3QgdGVtcHRlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2N1cnJlbnRUZW1wdGVyYXR1cmUnKTtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3VycmVudERlc2NyaXB0aW9uJyk7XG4gIGNvbnN0IGNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2l0eScpO1xuICBjb25zdCBjb3VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvdW50cnknKTtcbiAgY29uc3QgY3VycmVudEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3VycmVudEljb24nKTtcblxuICBjb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNodW1pZGl0eVZhbHVlJyk7XG4gIGNvbnN0IGFpclByZXNzdXJlVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWlyUHJlc3N1cmVWYWx1ZScpO1xuICBjb25zdCBjaGFuY2VPZlJhaW5WYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGFuY2VPZlJhaW5WYWx1ZScpO1xuICBjb25zdCB3aW5kU3BlZWRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3aW5kU3BlZWRWYWx1ZScpO1xuXG4gIGZ1bmN0aW9uIGxvYWRTdGF0aWNJY29ucygpIHtcbiAgICBjb25zdCBodW1pZGl0eUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaHVtaWRpdHlJY29uJyk7XG4gICAgY29uc3QgYWlyUHJlc3N1cmVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FpclByZXNzdXJlSWNvbicpO1xuICAgIGNvbnN0IGNoYW5jZU9mUmFpbkljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmNlT2ZSYWluSWNvbicpO1xuICAgIGNvbnN0IHdpbmRTcGVlZEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2luZFNwZWVkSWNvbicpO1xuXG4gICAgY29uc3QgY2VsY2l1c0ljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2VsY2l1c0ljb24nKTtcblxuICAgIGh1bWlkaXR5SWNvbi5zcmMgPSBpY29uc1snaHVtaWRpdHkuc3ZnJ107XG4gICAgYWlyUHJlc3N1cmVJY29uLnNyYyA9IGljb25zWydiYXJvbWV0ZXIuc3ZnJ107XG4gICAgY2hhbmNlT2ZSYWluSWNvbi5zcmMgPSBpY29uc1sndW1icmVsbGEuc3ZnJ107XG4gICAgd2luZFNwZWVkSWNvbi5zcmMgPSBpY29uc1snd2luZHNvY2suc3ZnJ107XG4gICAgY2VsY2l1c0ljb24uc3JjID0gaWNvbnNbJ3RoZXJtb21ldGVyLWNlbHNpdXMuc3ZnJ107XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVOb3coKSB7XG4gICAgdGVtcHRlcmF0dXJlLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZCh3ZWF0aGVyRGF0YS5jdXJyZW50LnRlbXBfYyl9Q2A7XG4gICAgY2l0eS50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJEYXRhLmxvY2F0aW9uLm5hbWV9LCAke3dlYXRoZXJEYXRhLmxvY2F0aW9uLnJlZ2lvbn1gO1xuICAgIGNvdW50cnkudGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyRGF0YS5sb2NhdGlvbi5jb3VudHJ5fWA7XG4gICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyRGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0fWA7XG5cbiAgICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJEYXRhLmN1cnJlbnQuaHVtaWRpdHl9ICVgO1xuICAgIGFpclByZXNzdXJlVmFsdWUudGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyRGF0YS5jdXJyZW50LnByZXNzdXJlX21ifSBoUGFgO1xuICAgIGNoYW5jZU9mUmFpblZhbHVlLnRleHRDb250ZW50ID0gYCR7d2VhdGhlckRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSVgO1xuICAgIHdpbmRTcGVlZFZhbHVlLnRleHRDb250ZW50ID0gYCR7d2VhdGhlckRhdGEuY3VycmVudC53aW5kX2twaH0gLyBrcGhgO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlSWNvbnMoKSB7XG4gICAgY29uc3Qgd2VhdGhlckljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndlYXRoZXJJY29uJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWF0aGVySWNvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGljb24gPSB3ZWF0aGVySlNPTi5maW5kKFxuICAgICAgICAoaXRlbSkgPT5cbiAgICAgICAgICBpdGVtLmNvZGUgPT09IHdlYXRoZXJEYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5jb25kaXRpb24uY29kZVxuICAgICAgKTtcbiAgICAgIHdlYXRoZXJJY29uc1tpXS5zcmMgPSBpY29uc1tpY29uLmRheV07XG4gICAgfVxuICAgIGNvbnN0IGljb24gPSB3ZWF0aGVySlNPTi5maW5kKFxuICAgICAgKGl0ZW0pID0+IGl0ZW0uY29kZSA9PT0gd2VhdGhlckRhdGEuY3VycmVudC5jb25kaXRpb24uY29kZVxuICAgICk7XG5cbiAgICBpZiAod2VhdGhlckRhdGEuY3VycmVudC5pc19kYXkgPT09IDApIHtcbiAgICAgIGN1cnJlbnRJY29uLnNyYyA9IGljb25zW2ljb24ubmlnaHRdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50SWNvbi5zcmMgPSBpY29uc1tpY29uLmRheV07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlRm9yZWNhc3QoKSB7XG4gICAgY29uc3QgZm9yZWNhc3RUZW1wcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZW1wZXJhdHVyZScpO1xuICAgIGNvbnN0IGZvcmVjYXN0VGVtcHNMb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVtcGVyYXR1cmVMb3cnKTtcbiAgICBjb25zdCBmb3JlY2FzdERlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlc2NyaXB0aW9uJyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcmVjYXN0VGVtcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvcmVjYXN0RGVzY3JpcHRpb25baV0uaW5uZXJUZXh0ID1cbiAgICAgICAgd2VhdGhlckRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF5LmNvbmRpdGlvbi50ZXh0O1xuICAgICAgZm9yZWNhc3RUZW1wc1tpXS5pbm5lclRleHQgPSBgSGlnaDogJHtNYXRoLnJvdW5kKFxuICAgICAgICB3ZWF0aGVyRGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkubWF4dGVtcF9jXG4gICAgICApfUNgO1xuICAgICAgZm9yZWNhc3RUZW1wc0xvd1tpXS5pbm5lclRleHQgPSBgTG93OiAke01hdGgucm91bmQoXG4gICAgICAgIHdlYXRoZXJEYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5taW50ZW1wX2NcbiAgICAgICl9Q2A7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlTm93KCk7XG4gIGxvYWRTdGF0aWNJY29ucygpO1xuICB1cGRhdGVJY29ucygpO1xuICB1cGRhdGVGb3JlY2FzdCgpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlRGlzcGxheTtcbiIsImltcG9ydCBmZXRjaFdlYXRoZXIgZnJvbSAnLi9hcGknO1xuXG5jb25zdCB1c2VyTG9jYXRvciA9IGFzeW5jICgpID0+IHtcbiAgZnVuY3Rpb24gc3VjY2Vzcyhwb3MpIHtcbiAgICBjb25zdCB1c2VyTG9jYXRpb24gPSBwb3MuY29vcmRzO1xuICAgIGZldGNoV2VhdGhlcihgJHt1c2VyTG9jYXRpb24ubGF0aXR1ZGV9LCR7dXNlckxvY2F0aW9uLmxvbmdpdHVkZX1gKTtcbiAgfVxuICBjb25zdCBvcHRpb25zID0ge1xuICAgIGVuYWJsZUhpZ2hBY2N1cmFjeTogdHJ1ZSxcbiAgICB0aW1lb3V0OiA1MDAwLFxuICAgIG1heGltdW1BZ2U6IDAsXG4gIH07XG5cbiAgZnVuY3Rpb24gZXJyb3IoZXJyKSB7XG4gICAgY29uc29sZS53YXJuKGBFUlJPUigke2Vyci5jb2RlfSk6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gIH1cbiAgdHJ5IHtcbiAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHN1Y2Nlc3MsIGVycm9yLCBvcHRpb25zKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZXJMb2NhdG9yO1xuIiwiY29uc3Qgd2VhdGhlclN0b3JhZ2UgPSAobmV3RGF0YSkgPT4ge1xuICBjb25zdCBsYXRlc3RXZWF0aGVyRGF0YSA9IFtdO1xuICBsYXRlc3RXZWF0aGVyRGF0YS5wdXNoKG5ld0RhdGEpO1xuXG4gIGNvbnNvbGUubG9nKGxhdGVzdFdlYXRoZXJEYXRhKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdlYXRoZXJTdG9yYWdlO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJoZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nLXRvcDogNDBweDtcXG4gIHBhZGRpbmctYm90dG9tOiA4MHB4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbn1cXG5cXG5ib2R5IHtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBtYXJnaW46IGF1dG87XFxuICBtYXgtd2lkdGg6IDEwOTBweDtcXG4gIGNvbG9yOiAjNDY0MTM2O1xcbiAgZm9udC1mYW1pbHk6IHJvYm90bywgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnT3BlbiBTYW5zJyxcXG4gICAgJ0hlbHZldGljYSBOZXVlJywgc2Fucy1zZXJpZjtcXG4gIGJhY2tncm91bmQ6IHJnYigyMzgsIDE3NCwgMjAyKTtcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcXG4gICAgOTBkZWcsXFxuICAgIHJnYmEoMjM4LCAxNzQsIDIwMiwgMSkgMCUsXFxuICAgIHJnYmEoMTQ4LCAxODcsIDIzMywgMSkgMTAwJVxcbiAgKTtcXG59XFxuXFxuLm1haW5IZWFkaW5nIHtcXG4gIG1hcmdpbi1sZWZ0OiAtMiU7XFxufVxcblxcbi5oZWFkZXJSaWdodFNpZGUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uc2NhbGVDaGFuZ2VyIHtcXG4gIHBhZGRpbmctcmlnaHQ6IDEwcHg7XFxufVxcblxcbmJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZjM2E1O1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxuICBib3gtc2hhZG93OiByZ2JhKDUwLCA1MCwgOTMsIDAuMjUpIDBweCAycHggNXB4IC0xcHgsXFxuICAgIHJnYmEoMCwgMCwgMCwgMC4zKSAwcHggMXB4IDNweCAtMXB4O1xcbn1cXG5cXG4uY2l0eXNlYXJjaCB7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xcblxcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMjVweDtcXG4gIG1hcmdpbi1yaWdodDogMTVweDtcXG4gIGJveC1zaGFkb3c6IHJnYmEoNTAsIDUwLCA5MywgMC4yNSkgMHB4IDJweCA1cHggLTFweCxcXG4gICAgcmdiYSgwLCAwLCAwLCAwLjMpIDBweCAxcHggM3B4IC0xcHg7XFxufVxcblxcbmlucHV0OmhvdmVyIHtcXG4gIGJveC1zaGFkb3c6IHJnYigyNDcsIDI0NywgMjQ3KSAwcHggMnB4IDZweCAtMXB4LFxcbiAgICByZ2JhKDAsIDAsIDAsIDAuMykgMHB4IDFweCAzcHggLTFweDtcXG59XFxuXFxuaW5wdXQ6Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZkZmZmNDtcXG4gIG91dGxpbmU6IDFweCBzb2xpZCByZ2IoMjQ3LCAyNDcsIDI0Nyk7XFxuICBvdXRsaW5lLW9mZnNldDogMXB4O1xcbn1cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLm1haW5Db250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGZsZXgtZ3JvdzogMTtcXG59XFxuXFxuLmN1cnJlbnRXZWF0aGVyQ29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgZmxleC1ncm93OiAxO1xcbn1cXG5cXG4uYmFzaWMtZGF0YSB7XFxuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBwYWRkaW5nOiAzJTtcXG4gIC8qIEZyb20gaHR0cHM6Ly9jc3MuZ2xhc3MgKi9cXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMyk7XFxuICBib3JkZXItcmFkaXVzOiAxNnB4O1xcbiAgYm94LXNoYWRvdzogMCA0cHggMzBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNy42cHgpO1xcbiAgLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXI6IGJsdXIoNy42cHgpO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KTtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuLmFkZGl0aW9uYWwtZGF0YSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG4gIG1hcmdpbi1yaWdodDogMSU7XFxuICBtYXgtd2lkdGg6IDQwMHB4O1xcbn1cXG5cXG4uYWRkaXRpb25hbC1kYXRhID4gZGl2IHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHdpZHRoOiAxMDVweDtcXG4gIGhlaWdodDogMTA1cHg7XFxuICBtYXJnaW4tbGVmdDogMjBweDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgLyogRnJvbSBodHRwczovL2Nzcy5nbGFzcyAqL1xcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA4Mik7XFxuICBib3JkZXItcmFkaXVzOiAxNnB4O1xcbiAgYm94LXNoYWRvdzogMCA0cHggMzBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNy42cHgpO1xcbiAgLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXI6IGJsdXIoNy42cHgpO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA0OCk7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcblxcbi5pY29uQW5kRGF0YSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IHNtYWxsO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuLnRvcFJvdyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jY3VycmVudFRlbXB0ZXJhdHVyZSB7XFxuICBmb250LXNpemU6IDQ0cHg7XFxufVxcblxcbiNjdXJyZW50RGVzY3JpcHRpb24ge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWFyZ2luLXRvcDogLTEwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbn1cXG5cXG4jY2l0eSxcXG4jY291bnRyeSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IHNtYWxsZXI7XFxufVxcblxcbi5mb3JlY2FzdENvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIG1hcmdpbi10b3A6IDMwJTtcXG4gIGZsZXgtZ3JvdzogMTtcXG59XFxuXFxuLmZvcmVjYXN0IHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmZvcmVjYXN0Q2FyZHMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbn1cXG5cXG4uZm9yZWNhc3RDYXJkcyA+IGRpdiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBtaW4td2lkdGg6IDEwMHB4O1xcbiAgbWF4LXdpZHRoOiAxMjBweDtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICBwYWRkaW5nLWJvdHRvbTogMTVweDtcXG4gIG1hcmdpbjogNXB4O1xcbiAgLyogRnJvbSBodHRwczovL2Nzcy5nbGFzcyAqL1xcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA4Mik7XFxuICBib3JkZXItcmFkaXVzOiAxNnB4O1xcbiAgYm94LXNoYWRvdzogMCA0cHggMzBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNy42cHgpO1xcbiAgLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXI6IGJsdXIoNy42cHgpO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA0OCk7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcblxcbi50ZW1wcyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgbWF4LXdpZHRoOiA4MCU7XFxufVxcblxcbi50ZW1wZXJhdHVyZSxcXG4uZGVzY3JpcHRpb24sXFxuLnRlbXBlcmF0dXJlTG93IHtcXG4gIG1hcmdpbjogMSU7XFxuICBmb250LXNpemU6IHNtYWxsO1xcbn1cXG5cXG4uZGVzY3JpcHRpb24ge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBtYXgtd2lkdGg6IG1heC1jb250ZW50O1xcbn1cXG5cXG5mb290ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIG1hcmdpbi10b3A6IGF1dG87XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgZm9udC1zaXplOiBzbWFsbGVyO1xcbn1cXG5cXG5hOmxpbmsge1xcbiAgY29sb3I6ICNmZmMzYTU7XFxufVxcblxcbmE6dmlzaXRlZCB7XFxuICBjb2xvcjogcmdiKDE1NSwgNjcsIDEwNSk7XFxufVxcblxcbmE6aG92ZXIge1xcbiAgY29sb3I6IHJnYigyMjYsIDg5LCAxNDgpO1xcbn1cXG5cXG5hOmFjdGl2ZSB7XFxuICBjb2xvcjogcmdiYSgxNDgsIDE4NywgMjMzLCAxKTtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gIC5iYXNpYy1kYXRhIHtcXG4gICAgd2lkdGg6IDg1JTtcXG4gIH1cXG4gIC5jdXJyZW50V2VhdGhlckNvbnRhaW5lcixcXG4gIC5hZGRpdGlvbmFsLWRhdGEge1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwcHg7XFxuICB9XFxuICAuYWRkaXRpb25hbC1kYXRhID4gZGl2LFxcbiAgLmZvcmVjYXN0Q2FyZHMgPiBkaXYge1xcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XFxuICB9XFxuICAuYWRkaXRpb25hbC1kYXRhID4gZGl2IHtcXG4gICAgbWF4LXdpZHRoOiAxMDBweDtcXG4gIH1cXG4gIC5mb3JlY2FzdENvbnRhaW5lciB7XFxuICAgIG1hcmdpbi10b3A6IGF1dG87XFxuICB9XFxuICBwIHtcXG4gICAgbWFyZ2luLXRvcDogNXB4O1xcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XFxuICB9XFxuICBmb290ZXIge1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICB9XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDZCQUE2QjtFQUM3QixtQkFBbUI7RUFDbkIsaUJBQWlCO0VB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QkFBZ0I7RUFDaEIsYUFBYTtFQUNiLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRTtJQUNFLFVBQVU7RUFDWjtFQUNBOztJQUVFLHVCQUF1QjtJQUN2QixpQkFBaUI7RUFDbkI7RUFDQTs7SUFFRSxnQkFBZ0I7SUFDaEIsa0JBQWtCO0VBQ3BCO0VBQ0E7SUFDRSxnQkFBZ0I7RUFDbEI7RUFDQTtJQUNFLGdCQUFnQjtFQUNsQjtFQUNBO0lBQ0UsZUFBZTtJQUNmLGtCQUFrQjtFQUNwQjtFQUNBO0lBQ0UsZUFBZTtFQUNqQjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmctdG9wOiA0MHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDgwcHg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxufVxcblxcbmJvZHkge1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIG1hcmdpbjogYXV0bztcXG4gIG1heC13aWR0aDogMTA5MHB4O1xcbiAgY29sb3I6ICM0NjQxMzY7XFxuICBmb250LWZhbWlseTogcm9ib3RvLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdPcGVuIFNhbnMnLFxcbiAgICAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmO1xcbiAgYmFja2dyb3VuZDogcmdiKDIzOCwgMTc0LCAyMDIpO1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxcbiAgICA5MGRlZyxcXG4gICAgcmdiYSgyMzgsIDE3NCwgMjAyLCAxKSAwJSxcXG4gICAgcmdiYSgxNDgsIDE4NywgMjMzLCAxKSAxMDAlXFxuICApO1xcbn1cXG5cXG4ubWFpbkhlYWRpbmcge1xcbiAgbWFyZ2luLWxlZnQ6IC0yJTtcXG59XFxuXFxuLmhlYWRlclJpZ2h0U2lkZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zY2FsZUNoYW5nZXIge1xcbiAgcGFkZGluZy1yaWdodDogMTBweDtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmMzYTU7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMjVweDtcXG4gIGJveC1zaGFkb3c6IHJnYmEoNTAsIDUwLCA5MywgMC4yNSkgMHB4IDJweCA1cHggLTFweCxcXG4gICAgcmdiYSgwLCAwLCAwLCAwLjMpIDBweCAxcHggM3B4IC0xcHg7XFxufVxcblxcbi5jaXR5c2VhcmNoIHtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICBwYWRkaW5nLWxlZnQ6IDE1cHg7XFxuXFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAyNXB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xcbiAgYm94LXNoYWRvdzogcmdiYSg1MCwgNTAsIDkzLCAwLjI1KSAwcHggMnB4IDVweCAtMXB4LFxcbiAgICByZ2JhKDAsIDAsIDAsIDAuMykgMHB4IDFweCAzcHggLTFweDtcXG59XFxuXFxuaW5wdXQ6aG92ZXIge1xcbiAgYm94LXNoYWRvdzogcmdiKDI0NywgMjQ3LCAyNDcpIDBweCAycHggNnB4IC0xcHgsXFxuICAgIHJnYmEoMCwgMCwgMCwgMC4zKSAwcHggMXB4IDNweCAtMXB4O1xcbn1cXG5cXG5pbnB1dDpmb2N1cyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmRmZmY0O1xcbiAgb3V0bGluZTogMXB4IHNvbGlkIHJnYigyNDcsIDI0NywgMjQ3KTtcXG4gIG91dGxpbmUtb2Zmc2V0OiAxcHg7XFxufVxcblxcbm1haW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4ubWFpbkNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZmxleC1ncm93OiAxO1xcbn1cXG5cXG4uY3VycmVudFdlYXRoZXJDb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBmbGV4LWdyb3c6IDE7XFxufVxcblxcbi5iYXNpYy1kYXRhIHtcXG4gIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIHBhZGRpbmc6IDMlO1xcbiAgLyogRnJvbSBodHRwczovL2Nzcy5nbGFzcyAqL1xcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIzKTtcXG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XFxuICBib3gtc2hhZG93OiAwIDRweCAzMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig3LjZweCk7XFxuICAtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cig3LjZweCk7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpO1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4uYWRkaXRpb25hbC1kYXRhIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgbWFyZ2luLXJpZ2h0OiAxJTtcXG4gIG1heC13aWR0aDogNDAwcHg7XFxufVxcblxcbi5hZGRpdGlvbmFsLWRhdGEgPiBkaXYge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgd2lkdGg6IDEwNXB4O1xcbiAgaGVpZ2h0OiAxMDVweDtcXG4gIG1hcmdpbi1sZWZ0OiAyMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICAvKiBGcm9tIGh0dHBzOi8vY3NzLmdsYXNzICovXFxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDgyKTtcXG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XFxuICBib3gtc2hhZG93OiAwIDRweCAzMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig3LjZweCk7XFxuICAtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cig3LjZweCk7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDQ4KTtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuLmljb25BbmREYXRhIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogc21hbGw7XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbn1cXG5cXG4udG9wUm93IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbiNjdXJyZW50VGVtcHRlcmF0dXJlIHtcXG4gIGZvbnQtc2l6ZTogNDRweDtcXG59XFxuXFxuI2N1cnJlbnREZXNjcmlwdGlvbiB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW4tdG9wOiAtMTBweDtcXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XFxuICBmb250LXNpemU6IDIwcHg7XFxufVxcblxcbiNjaXR5LFxcbiNjb3VudHJ5IHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogc21hbGxlcjtcXG59XFxuXFxuLmZvcmVjYXN0Q29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgbWFyZ2luLXRvcDogMzAlO1xcbiAgZmxleC1ncm93OiAxO1xcbn1cXG5cXG4uZm9yZWNhc3Qge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4uZm9yZWNhc3RDYXJkcyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxufVxcblxcbi5mb3JlY2FzdENhcmRzID4gZGl2IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1pbi13aWR0aDogMTAwcHg7XFxuICBtYXgtd2lkdGg6IDEyMHB4O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIHBhZGRpbmctYm90dG9tOiAxNXB4O1xcbiAgbWFyZ2luOiA1cHg7XFxuICAvKiBGcm9tIGh0dHBzOi8vY3NzLmdsYXNzICovXFxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDgyKTtcXG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XFxuICBib3gtc2hhZG93OiAwIDRweCAzMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig3LjZweCk7XFxuICAtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cig3LjZweCk7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDQ4KTtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuLnRlbXBzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBtYXgtd2lkdGg6IDgwJTtcXG59XFxuXFxuLnRlbXBlcmF0dXJlLFxcbi5kZXNjcmlwdGlvbixcXG4udGVtcGVyYXR1cmVMb3cge1xcbiAgbWFyZ2luOiAxJTtcXG4gIGZvbnQtc2l6ZTogc21hbGw7XFxufVxcblxcbi5kZXNjcmlwdGlvbiB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIG1heC13aWR0aDogbWF4LWNvbnRlbnQ7XFxufVxcblxcbmZvb3RlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgbWFyZ2luLXRvcDogYXV0bztcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBmb250LXNpemU6IHNtYWxsZXI7XFxufVxcblxcbmE6bGluayB7XFxuICBjb2xvcjogI2ZmYzNhNTtcXG59XFxuXFxuYTp2aXNpdGVkIHtcXG4gIGNvbG9yOiByZ2IoMTU1LCA2NywgMTA1KTtcXG59XFxuXFxuYTpob3ZlciB7XFxuICBjb2xvcjogcmdiKDIyNiwgODksIDE0OCk7XFxufVxcblxcbmE6YWN0aXZlIHtcXG4gIGNvbG9yOiByZ2JhKDE0OCwgMTg3LCAyMzMsIDEpO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgLmJhc2ljLWRhdGEge1xcbiAgICB3aWR0aDogODUlO1xcbiAgfVxcbiAgLmN1cnJlbnRXZWF0aGVyQ29udGFpbmVyLFxcbiAgLmFkZGl0aW9uYWwtZGF0YSB7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBtYXJnaW4tcmlnaHQ6IDBweDtcXG4gIH1cXG4gIC5hZGRpdGlvbmFsLWRhdGEgPiBkaXYsXFxuICAuZm9yZWNhc3RDYXJkcyA+IGRpdiB7XFxuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXG4gIH1cXG4gIC5hZGRpdGlvbmFsLWRhdGEgPiBkaXYge1xcbiAgICBtYXgtd2lkdGg6IDEwMHB4O1xcbiAgfVxcbiAgLmZvcmVjYXN0Q29udGFpbmVyIHtcXG4gICAgbWFyZ2luLXRvcDogYXV0bztcXG4gIH1cXG4gIHAge1xcbiAgICBtYXJnaW4tdG9wOiA1cHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXG4gIH1cXG4gIGZvb3RlciB7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsInZhciBtYXAgPSB7XG5cdFwiLi9iYXJvbWV0ZXIuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2Jhcm9tZXRlci5zdmdcIixcblx0XCIuL2NlbHNpdXMuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2NlbHNpdXMuc3ZnXCIsXG5cdFwiLi9jbGVhci1kYXkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2NsZWFyLWRheS5zdmdcIixcblx0XCIuL2NsZWFyLW5pZ2h0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9jbGVhci1uaWdodC5zdmdcIixcblx0XCIuL2Nsb3VkeS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvY2xvdWR5LnN2Z1wiLFxuXHRcIi4vY29tcGFzcy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvY29tcGFzcy5zdmdcIixcblx0XCIuL2RyaXp6bGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2RyaXp6bGUuc3ZnXCIsXG5cdFwiLi9kdXN0LWRheS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvZHVzdC1kYXkuc3ZnXCIsXG5cdFwiLi9kdXN0LW5pZ2h0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9kdXN0LW5pZ2h0LnN2Z1wiLFxuXHRcIi4vZHVzdC13aW5kLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9kdXN0LXdpbmQuc3ZnXCIsXG5cdFwiLi9kdXN0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9kdXN0LnN2Z1wiLFxuXHRcIi4vZmFocmVuaGVpdC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvZmFocmVuaGVpdC5zdmdcIixcblx0XCIuL2ZhbGxpbmctc3RhcnMuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2ZhbGxpbmctc3RhcnMuc3ZnXCIsXG5cdFwiLi9mb2ctZGF5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9mb2ctZGF5LnN2Z1wiLFxuXHRcIi4vZm9nLW5pZ2h0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9mb2ctbmlnaHQuc3ZnXCIsXG5cdFwiLi9mb2cuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2ZvZy5zdmdcIixcblx0XCIuL2hhaWwuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2hhaWwuc3ZnXCIsXG5cdFwiLi9oYXplLWRheS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvaGF6ZS1kYXkuc3ZnXCIsXG5cdFwiLi9oYXplLW5pZ2h0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9oYXplLW5pZ2h0LnN2Z1wiLFxuXHRcIi4vaGF6ZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvaGF6ZS5zdmdcIixcblx0XCIuL2hvcml6b24uc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2hvcml6b24uc3ZnXCIsXG5cdFwiLi9odW1pZGl0eS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvaHVtaWRpdHkuc3ZnXCIsXG5cdFwiLi9odXJyaWNhbmUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2h1cnJpY2FuZS5zdmdcIixcblx0XCIuL2xpZ2h0bmluZy1ib2x0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9saWdodG5pbmctYm9sdC5zdmdcIixcblx0XCIuL21pc3Quc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL21pc3Quc3ZnXCIsXG5cdFwiLi9tb29uLWZpcnN0LXF1YXJ0ZXIuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL21vb24tZmlyc3QtcXVhcnRlci5zdmdcIixcblx0XCIuL21vb24tZnVsbC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvbW9vbi1mdWxsLnN2Z1wiLFxuXHRcIi4vbW9vbi1sYXN0LXF1YXJ0ZXIuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL21vb24tbGFzdC1xdWFydGVyLnN2Z1wiLFxuXHRcIi4vbW9vbi1uZXcuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL21vb24tbmV3LnN2Z1wiLFxuXHRcIi4vbW9vbi13YW5pbmctY3Jlc2NlbnQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL21vb24td2FuaW5nLWNyZXNjZW50LnN2Z1wiLFxuXHRcIi4vbW9vbi13YW5pbmctZ2liYm91cy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvbW9vbi13YW5pbmctZ2liYm91cy5zdmdcIixcblx0XCIuL21vb24td2F4aW5nLWNyZXNjZW50LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9tb29uLXdheGluZy1jcmVzY2VudC5zdmdcIixcblx0XCIuL21vb24td2F4aW5nLWdpYmJvdXMuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL21vb24td2F4aW5nLWdpYmJvdXMuc3ZnXCIsXG5cdFwiLi9tb29ucmlzZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvbW9vbnJpc2Uuc3ZnXCIsXG5cdFwiLi9tb29uc2V0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9tb29uc2V0LnN2Z1wiLFxuXHRcIi4vbm90LWF2YWlsYWJsZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvbm90LWF2YWlsYWJsZS5zdmdcIixcblx0XCIuL292ZXJjYXN0LWRheS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvb3ZlcmNhc3QtZGF5LnN2Z1wiLFxuXHRcIi4vb3ZlcmNhc3QtbmlnaHQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL292ZXJjYXN0LW5pZ2h0LnN2Z1wiLFxuXHRcIi4vb3ZlcmNhc3Quc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL292ZXJjYXN0LnN2Z1wiLFxuXHRcIi4vcGFydGx5LWNsb3VkeS1kYXktZHJpenpsZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcGFydGx5LWNsb3VkeS1kYXktZHJpenpsZS5zdmdcIixcblx0XCIuL3BhcnRseS1jbG91ZHktZGF5LWZvZy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcGFydGx5LWNsb3VkeS1kYXktZm9nLnN2Z1wiLFxuXHRcIi4vcGFydGx5LWNsb3VkeS1kYXktaGFpbC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcGFydGx5LWNsb3VkeS1kYXktaGFpbC5zdmdcIixcblx0XCIuL3BhcnRseS1jbG91ZHktZGF5LWhhemUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3BhcnRseS1jbG91ZHktZGF5LWhhemUuc3ZnXCIsXG5cdFwiLi9wYXJ0bHktY2xvdWR5LWRheS1yYWluLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wYXJ0bHktY2xvdWR5LWRheS1yYWluLnN2Z1wiLFxuXHRcIi4vcGFydGx5LWNsb3VkeS1kYXktc2xlZXQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3BhcnRseS1jbG91ZHktZGF5LXNsZWV0LnN2Z1wiLFxuXHRcIi4vcGFydGx5LWNsb3VkeS1kYXktc21va2Uuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3BhcnRseS1jbG91ZHktZGF5LXNtb2tlLnN2Z1wiLFxuXHRcIi4vcGFydGx5LWNsb3VkeS1kYXktc25vdy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcGFydGx5LWNsb3VkeS1kYXktc25vdy5zdmdcIixcblx0XCIuL3BhcnRseS1jbG91ZHktZGF5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wYXJ0bHktY2xvdWR5LWRheS5zdmdcIixcblx0XCIuL3BhcnRseS1jbG91ZHktbmlnaHQtZHJpenpsZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcGFydGx5LWNsb3VkeS1uaWdodC1kcml6emxlLnN2Z1wiLFxuXHRcIi4vcGFydGx5LWNsb3VkeS1uaWdodC1mb2cuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3BhcnRseS1jbG91ZHktbmlnaHQtZm9nLnN2Z1wiLFxuXHRcIi4vcGFydGx5LWNsb3VkeS1uaWdodC1oYWlsLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wYXJ0bHktY2xvdWR5LW5pZ2h0LWhhaWwuc3ZnXCIsXG5cdFwiLi9wYXJ0bHktY2xvdWR5LW5pZ2h0LWhhemUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3BhcnRseS1jbG91ZHktbmlnaHQtaGF6ZS5zdmdcIixcblx0XCIuL3BhcnRseS1jbG91ZHktbmlnaHQtcmFpbi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcGFydGx5LWNsb3VkeS1uaWdodC1yYWluLnN2Z1wiLFxuXHRcIi4vcGFydGx5LWNsb3VkeS1uaWdodC1zbGVldC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcGFydGx5LWNsb3VkeS1uaWdodC1zbGVldC5zdmdcIixcblx0XCIuL3BhcnRseS1jbG91ZHktbmlnaHQtc21va2Uuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3BhcnRseS1jbG91ZHktbmlnaHQtc21va2Uuc3ZnXCIsXG5cdFwiLi9wYXJ0bHktY2xvdWR5LW5pZ2h0LXNub3cuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3BhcnRseS1jbG91ZHktbmlnaHQtc25vdy5zdmdcIixcblx0XCIuL3BhcnRseS1jbG91ZHktbmlnaHQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3BhcnRseS1jbG91ZHktbmlnaHQuc3ZnXCIsXG5cdFwiLi9wcmVzc3VyZS1oaWdoLWFsdC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcHJlc3N1cmUtaGlnaC1hbHQuc3ZnXCIsXG5cdFwiLi9wcmVzc3VyZS1oaWdoLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wcmVzc3VyZS1oaWdoLnN2Z1wiLFxuXHRcIi4vcHJlc3N1cmUtbG93LWFsdC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcHJlc3N1cmUtbG93LWFsdC5zdmdcIixcblx0XCIuL3ByZXNzdXJlLWxvdy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcHJlc3N1cmUtbG93LnN2Z1wiLFxuXHRcIi4vcmFpbi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcmFpbi5zdmdcIixcblx0XCIuL3JhaW5kcm9wLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9yYWluZHJvcC5zdmdcIixcblx0XCIuL3JhaW5kcm9wcy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcmFpbmRyb3BzLnN2Z1wiLFxuXHRcIi4vc2xlZXQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3NsZWV0LnN2Z1wiLFxuXHRcIi4vc21va2UtcGFydGljbGVzLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9zbW9rZS1wYXJ0aWNsZXMuc3ZnXCIsXG5cdFwiLi9zbW9rZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvc21va2Uuc3ZnXCIsXG5cdFwiLi9zbm93LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9zbm93LnN2Z1wiLFxuXHRcIi4vc25vd2ZsYWtlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9zbm93Zmxha2Uuc3ZnXCIsXG5cdFwiLi9zb2xhci1lY2xpcHNlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9zb2xhci1lY2xpcHNlLnN2Z1wiLFxuXHRcIi4vc3Rhci5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvc3Rhci5zdmdcIixcblx0XCIuL3N0YXJyeS1uaWdodC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvc3RhcnJ5LW5pZ2h0LnN2Z1wiLFxuXHRcIi4vc3VucmlzZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvc3VucmlzZS5zdmdcIixcblx0XCIuL3N1bnNldC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvc3Vuc2V0LnN2Z1wiLFxuXHRcIi4vdGhlcm1vbWV0ZXItY2Vsc2l1cy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdGhlcm1vbWV0ZXItY2Vsc2l1cy5zdmdcIixcblx0XCIuL3RoZXJtb21ldGVyLWNvbGRlci5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdGhlcm1vbWV0ZXItY29sZGVyLnN2Z1wiLFxuXHRcIi4vdGhlcm1vbWV0ZXItZmFocmVuaGVpdC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdGhlcm1vbWV0ZXItZmFocmVuaGVpdC5zdmdcIixcblx0XCIuL3RoZXJtb21ldGVyLWdsYXNzLWNlbHNpdXMuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3RoZXJtb21ldGVyLWdsYXNzLWNlbHNpdXMuc3ZnXCIsXG5cdFwiLi90aGVybW9tZXRlci1nbGFzcy1mYWhyZW5oZWl0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC90aGVybW9tZXRlci1nbGFzcy1mYWhyZW5oZWl0LnN2Z1wiLFxuXHRcIi4vdGhlcm1vbWV0ZXItZ2xhc3Muc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3RoZXJtb21ldGVyLWdsYXNzLnN2Z1wiLFxuXHRcIi4vdGhlcm1vbWV0ZXItbWVyY3VyeS1jb2xkLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC90aGVybW9tZXRlci1tZXJjdXJ5LWNvbGQuc3ZnXCIsXG5cdFwiLi90aGVybW9tZXRlci1tZXJjdXJ5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC90aGVybW9tZXRlci1tZXJjdXJ5LnN2Z1wiLFxuXHRcIi4vdGhlcm1vbWV0ZXItd2FybWVyLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC90aGVybW9tZXRlci13YXJtZXIuc3ZnXCIsXG5cdFwiLi90aGVybW9tZXRlci5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdGhlcm1vbWV0ZXIuc3ZnXCIsXG5cdFwiLi90aHVuZGVyc3Rvcm1zLWRheS1yYWluLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC90aHVuZGVyc3Rvcm1zLWRheS1yYWluLnN2Z1wiLFxuXHRcIi4vdGh1bmRlcnN0b3Jtcy1kYXktc25vdy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdGh1bmRlcnN0b3Jtcy1kYXktc25vdy5zdmdcIixcblx0XCIuL3RodW5kZXJzdG9ybXMtZGF5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC90aHVuZGVyc3Rvcm1zLWRheS5zdmdcIixcblx0XCIuL3RodW5kZXJzdG9ybXMtbmlnaHQtcmFpbi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdGh1bmRlcnN0b3Jtcy1uaWdodC1yYWluLnN2Z1wiLFxuXHRcIi4vdGh1bmRlcnN0b3Jtcy1uaWdodC1zbm93LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC90aHVuZGVyc3Rvcm1zLW5pZ2h0LXNub3cuc3ZnXCIsXG5cdFwiLi90aHVuZGVyc3Rvcm1zLW5pZ2h0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC90aHVuZGVyc3Rvcm1zLW5pZ2h0LnN2Z1wiLFxuXHRcIi4vdGh1bmRlcnN0b3Jtcy1yYWluLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC90aHVuZGVyc3Rvcm1zLXJhaW4uc3ZnXCIsXG5cdFwiLi90aHVuZGVyc3Rvcm1zLXNub3cuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3RodW5kZXJzdG9ybXMtc25vdy5zdmdcIixcblx0XCIuL3RodW5kZXJzdG9ybXMuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3RodW5kZXJzdG9ybXMuc3ZnXCIsXG5cdFwiLi90b3JuYWRvLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC90b3JuYWRvLnN2Z1wiLFxuXHRcIi4vdW1icmVsbGEuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3VtYnJlbGxhLnN2Z1wiLFxuXHRcIi4vdXYtaW5kZXgtMS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdXYtaW5kZXgtMS5zdmdcIixcblx0XCIuL3V2LWluZGV4LTEwLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC91di1pbmRleC0xMC5zdmdcIixcblx0XCIuL3V2LWluZGV4LTExLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC91di1pbmRleC0xMS5zdmdcIixcblx0XCIuL3V2LWluZGV4LTIuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3V2LWluZGV4LTIuc3ZnXCIsXG5cdFwiLi91di1pbmRleC0zLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC91di1pbmRleC0zLnN2Z1wiLFxuXHRcIi4vdXYtaW5kZXgtNC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdXYtaW5kZXgtNC5zdmdcIixcblx0XCIuL3V2LWluZGV4LTUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3V2LWluZGV4LTUuc3ZnXCIsXG5cdFwiLi91di1pbmRleC02LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC91di1pbmRleC02LnN2Z1wiLFxuXHRcIi4vdXYtaW5kZXgtNy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdXYtaW5kZXgtNy5zdmdcIixcblx0XCIuL3V2LWluZGV4LTguc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3V2LWluZGV4LTguc3ZnXCIsXG5cdFwiLi91di1pbmRleC05LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC91di1pbmRleC05LnN2Z1wiLFxuXHRcIi4vdXYtaW5kZXguc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3V2LWluZGV4LnN2Z1wiLFxuXHRcIi4vd2luZC1iZWF1Zm9ydC0wLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC93aW5kLWJlYXVmb3J0LTAuc3ZnXCIsXG5cdFwiLi93aW5kLWJlYXVmb3J0LTEuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3dpbmQtYmVhdWZvcnQtMS5zdmdcIixcblx0XCIuL3dpbmQtYmVhdWZvcnQtMTAuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3dpbmQtYmVhdWZvcnQtMTAuc3ZnXCIsXG5cdFwiLi93aW5kLWJlYXVmb3J0LTExLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC93aW5kLWJlYXVmb3J0LTExLnN2Z1wiLFxuXHRcIi4vd2luZC1iZWF1Zm9ydC0xMi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvd2luZC1iZWF1Zm9ydC0xMi5zdmdcIixcblx0XCIuL3dpbmQtYmVhdWZvcnQtMi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvd2luZC1iZWF1Zm9ydC0yLnN2Z1wiLFxuXHRcIi4vd2luZC1iZWF1Zm9ydC0zLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC93aW5kLWJlYXVmb3J0LTMuc3ZnXCIsXG5cdFwiLi93aW5kLWJlYXVmb3J0LTQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3dpbmQtYmVhdWZvcnQtNC5zdmdcIixcblx0XCIuL3dpbmQtYmVhdWZvcnQtNS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvd2luZC1iZWF1Zm9ydC01LnN2Z1wiLFxuXHRcIi4vd2luZC1iZWF1Zm9ydC02LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC93aW5kLWJlYXVmb3J0LTYuc3ZnXCIsXG5cdFwiLi93aW5kLWJlYXVmb3J0LTcuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3dpbmQtYmVhdWZvcnQtNy5zdmdcIixcblx0XCIuL3dpbmQtYmVhdWZvcnQtOC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvd2luZC1iZWF1Zm9ydC04LnN2Z1wiLFxuXHRcIi4vd2luZC1iZWF1Zm9ydC05LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC93aW5kLWJlYXVmb3J0LTkuc3ZnXCIsXG5cdFwiLi93aW5kLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC93aW5kLnN2Z1wiLFxuXHRcIi4vd2luZHNvY2suc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3dpbmRzb2NrLnN2Z1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwgc3luYyBcXFxcLihwbmclN0NqcGU/ZyU3Q3N2ZykkXCI7Il0sIm5hbWVzIjpbImluamVjdERhdGEiLCJ1c2VyTG9jYXRvciIsInVwZGF0ZURpc3BsYXkiLCJ3ZWF0aGVyU3RvcmFnZSIsImZldGNoV2VhdGhlciIsImxvY2F0aW9uIiwic2VhcmNoV2l0aENpdHkiLCJ1bmRlZmluZWQiLCJyZXNwb25zZSIsImZldGNoIiwicmVzcG9uc2VEYXRhIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImNpdHlUb1NlYXJjaCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInNlYXJjaEJ0biIsImZpeFNwZWNpYWxDaGFycyIsImNpdHlWYWx1ZSIsInZhbHVlIiwidG9Mb3dlckNhc2UiLCJzcGxpdCIsIml0ZXJhdGVkQ2l0eSIsImZvckVhY2giLCJlbGVtZW50IiwicHVzaCIsInBhcnNlZENpdHkiLCJqb2luIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJ1blNlYXJjaCIsInNlYXJjUGFyYW1ldGVyIiwiZXZlbnQiLCJrZXkiLCJ3ZWF0aGVySlNPTiIsInJlcXVpcmUiLCJpbXBvcnRJY29ucyIsInIiLCJpY29ucyIsImtleXMiLCJtYXAiLCJpdGVtIiwicmVwbGFjZSIsImNvbnRleHQiLCJ3ZWF0aGVyRGF0YSIsInRlbXB0ZXJhdHVyZSIsImRlc2NyaXB0aW9uIiwiY2l0eSIsImNvdW50cnkiLCJjdXJyZW50SWNvbiIsImh1bWlkaXR5IiwiYWlyUHJlc3N1cmVWYWx1ZSIsImNoYW5jZU9mUmFpblZhbHVlIiwid2luZFNwZWVkVmFsdWUiLCJsb2FkU3RhdGljSWNvbnMiLCJodW1pZGl0eUljb24iLCJhaXJQcmVzc3VyZUljb24iLCJjaGFuY2VPZlJhaW5JY29uIiwid2luZFNwZWVkSWNvbiIsImNlbGNpdXNJY29uIiwic3JjIiwidXBkYXRlTm93IiwidGV4dENvbnRlbnQiLCJNYXRoIiwicm91bmQiLCJjdXJyZW50IiwidGVtcF9jIiwibmFtZSIsInJlZ2lvbiIsImNvbmRpdGlvbiIsInRleHQiLCJwcmVzc3VyZV9tYiIsImZvcmVjYXN0IiwiZm9yZWNhc3RkYXkiLCJkYXkiLCJkYWlseV9jaGFuY2Vfb2ZfcmFpbiIsIndpbmRfa3BoIiwidXBkYXRlSWNvbnMiLCJ3ZWF0aGVySWNvbnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaSIsImxlbmd0aCIsImljb24iLCJmaW5kIiwiY29kZSIsImlzX2RheSIsIm5pZ2h0IiwidXBkYXRlRm9yZWNhc3QiLCJmb3JlY2FzdFRlbXBzIiwiZm9yZWNhc3RUZW1wc0xvdyIsImZvcmVjYXN0RGVzY3JpcHRpb24iLCJpbm5lclRleHQiLCJtYXh0ZW1wX2MiLCJtaW50ZW1wX2MiLCJzdWNjZXNzIiwicG9zIiwidXNlckxvY2F0aW9uIiwiY29vcmRzIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJvcHRpb25zIiwiZW5hYmxlSGlnaEFjY3VyYWN5IiwidGltZW91dCIsIm1heGltdW1BZ2UiLCJlcnIiLCJ3YXJuIiwibWVzc2FnZSIsIm5hdmlnYXRvciIsImdlb2xvY2F0aW9uIiwiZ2V0Q3VycmVudFBvc2l0aW9uIiwibmV3RGF0YSIsImxhdGVzdFdlYXRoZXJEYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==