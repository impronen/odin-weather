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
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=15e42e0620b649a8ae961742230604&q=${location}&days=6`);
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
    for (let i = 1; i < forecastTemps.length + 1; i++) {
      forecastDescription[i - 1].innerText = weatherData.forecast.forecastday[i].day.condition.text;
      forecastTemps[i - 1].innerText = `High: ${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}C`;
      forecastTempsLow[i - 1].innerText = `Low: ${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}C`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TyxLQUFLLFVBQVUsVUFBVSxhQUFhLFdBQVcsWUFBWSxhQUFhLE1BQU0sT0FBTyxPQUFPLEtBQUssS0FBSyxPQUFPLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxPQUFPLE1BQU0sWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsT0FBTyxPQUFPLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssS0FBSyxVQUFVLEtBQUssTUFBTSxZQUFZLGFBQWEsTUFBTSxNQUFNLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLE1BQU0saUNBQWlDLGtCQUFrQix3QkFBd0Isa0NBQWtDLHdCQUF3QixzQkFBc0IseUJBQXlCLG9CQUFvQixHQUFHLFVBQVUsc0JBQXNCLGtCQUFrQiwyQkFBMkIsaUJBQWlCLHNCQUFzQixtQkFBbUIsMkdBQTJHLG1DQUFtQyxtSEFBbUgsR0FBRyxrQkFBa0IscUJBQXFCLEdBQUcsc0JBQXNCLGtCQUFrQix3QkFBd0Isd0JBQXdCLEdBQUcsbUJBQW1CLHdCQUF3QixHQUFHLFlBQVksOEJBQThCLG9CQUFvQixrQkFBa0IsaUJBQWlCLHdCQUF3QixrR0FBa0csR0FBRyxpQkFBaUIsb0JBQW9CLGtCQUFrQix1QkFBdUIsbUJBQW1CLHdCQUF3Qix1QkFBdUIsa0dBQWtHLEdBQUcsaUJBQWlCLDhGQUE4RixHQUFHLGlCQUFpQiw4QkFBOEIsMENBQTBDLHdCQUF3QixHQUFHLFVBQVUsa0JBQWtCLDRCQUE0QixHQUFHLG9CQUFvQixrQkFBa0IsNEJBQTRCLDJCQUEyQixpQkFBaUIsR0FBRyw4QkFBOEIsa0JBQWtCLG1DQUFtQyx3QkFBd0Isb0JBQW9CLGlCQUFpQixHQUFHLGlCQUFpQiwyQkFBMkIscUJBQXFCLHdCQUF3QixnQkFBZ0IsMEVBQTBFLHdCQUF3Qiw4Q0FBOEMsaUNBQWlDLHlDQUF5QyxnREFBZ0Qsb0JBQW9CLEdBQUcsc0JBQXNCLGtCQUFrQixvQkFBb0IsOEJBQThCLHFCQUFxQixxQkFBcUIsR0FBRyw0QkFBNEIsdUJBQXVCLGlCQUFpQixrQkFBa0Isc0JBQXNCLHdCQUF3QixrQkFBa0IsMkVBQTJFLHdCQUF3Qiw4Q0FBOEMsaUNBQWlDLHlDQUF5QyxpREFBaUQsb0JBQW9CLEdBQUcsa0JBQWtCLGtCQUFrQix3QkFBd0Isd0JBQXdCLHFCQUFxQix3QkFBd0IsR0FBRyxhQUFhLGtCQUFrQixrQ0FBa0Msd0JBQXdCLEdBQUcsMEJBQTBCLG9CQUFvQixHQUFHLHlCQUF5Qix1QkFBdUIsc0JBQXNCLHdCQUF3QixvQkFBb0IsR0FBRyxzQkFBc0IsdUJBQXVCLHVCQUF1QixHQUFHLHdCQUF3QixrQkFBa0IsMkJBQTJCLG9CQUFvQixpQkFBaUIsR0FBRyxlQUFlLHVCQUF1QixHQUFHLG9CQUFvQixrQkFBa0Isa0NBQWtDLG9CQUFvQixHQUFHLDBCQUEwQixrQkFBa0IsMkJBQTJCLHdCQUF3QixxQkFBcUIscUJBQXFCLGtCQUFrQix5QkFBeUIsZ0JBQWdCLDJFQUEyRSx3QkFBd0IsOENBQThDLGlDQUFpQyx5Q0FBeUMsaURBQWlELG9CQUFvQixHQUFHLFlBQVksa0JBQWtCLG1DQUFtQyxtQkFBbUIsR0FBRyxtREFBbUQsZUFBZSxxQkFBcUIsR0FBRyxrQkFBa0Isc0JBQXNCLDJCQUEyQixHQUFHLFlBQVksa0JBQWtCLHdCQUF3QixrQ0FBa0MscUJBQXFCLGtCQUFrQix1QkFBdUIsR0FBRyxZQUFZLG1CQUFtQixHQUFHLGVBQWUsNkJBQTZCLEdBQUcsYUFBYSw2QkFBNkIsR0FBRyxjQUFjLGtDQUFrQyxHQUFHLDBDQUEwQyxpQkFBaUIsaUJBQWlCLEtBQUssbURBQW1ELDhCQUE4Qix3QkFBd0IsS0FBSyxxREFBcUQsdUJBQXVCLHlCQUF5QixLQUFLLDRCQUE0Qix1QkFBdUIsS0FBSyx3QkFBd0IsdUJBQXVCLEtBQUssT0FBTyxzQkFBc0IseUJBQXlCLEtBQUssWUFBWSxzQkFBc0IsS0FBSyxHQUFHLHFCQUFxQjtBQUM3bVk7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7O0FDUDFCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0EscUZBQXFGO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFCQUFxQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzRkFBc0YscUJBQXFCO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDcEZhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsY0FBYztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RBLE1BQStGO0FBQy9GLE1BQXFGO0FBQ3JGLE1BQTRGO0FBQzVGLE1BQStHO0FBQy9HLE1BQXdHO0FBQ3hHLE1BQXdHO0FBQ3hHLE1BQW1HO0FBQ25HO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsc0ZBQU87Ozs7QUFJNkM7QUFDckUsT0FBTyxpRUFBZSxzRkFBTyxJQUFJLDZGQUFjLEdBQUcsNkZBQWMsWUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNkJBQTZCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ25GYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDakNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4td2VhdGhlci8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9zcmMvbW9kdWxlcy9hcGkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vc3JjL21vZHVsZXMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vc3JjL21vZHVsZXMvbG9jYXRvci5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9zcmMvbW9kdWxlcy93ZWF0aGVyT2JqZWN0LmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsLyBzeW5jIG5vbnJlY3Vyc2l2ZSBcXC4ocG5nJTdDanBlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IGluamVjdERhdGEgZnJvbSAnLi9tb2R1bGVzL2NvbnRyb2xsZXInO1xuaW1wb3J0IHVzZXJMb2NhdG9yIGZyb20gJy4vbW9kdWxlcy9sb2NhdG9yJztcblxuaW5qZWN0RGF0YSgpO1xudXNlckxvY2F0b3IoKTtcbiIsImltcG9ydCB1cGRhdGVEaXNwbGF5IGZyb20gJy4vZG9tJztcbmltcG9ydCB3ZWF0aGVyU3RvcmFnZSBmcm9tICcuL3dlYXRoZXJPYmplY3QnO1xuXG5jb25zdCBmZXRjaFdlYXRoZXIgPSBhc3luYyAobG9jYXRpb24pID0+IHtcbiAgYXN5bmMgZnVuY3Rpb24gc2VhcmNoV2l0aENpdHkoKSB7XG4gICAgaWYgKGxvY2F0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGxvY2F0aW9uID0gJ0xvbmRvbic7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9MTVlNDJlMDYyMGI2NDlhOGFlOTYxNzQyMjMwNjA0JnE9JHtsb2NhdGlvbn0mZGF5cz02YFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlRGF0YSk7XG4gICAgICB1cGRhdGVEaXNwbGF5KHJlc3BvbnNlRGF0YSk7XG4gICAgICB3ZWF0aGVyU3RvcmFnZShyZXNwb25zZURhdGEpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgc2VhcmNoV2l0aENpdHkoKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZldGNoV2VhdGhlcjtcbiIsImltcG9ydCBmZXRjaFdlYXRoZXIgZnJvbSAnLi9hcGknO1xuXG5jb25zdCBpbmplY3REYXRhID0gKCkgPT4ge1xuICBjb25zdCBjaXR5VG9TZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2l0eXNlYXJjaCcpO1xuICBjb25zdCBzZWFyY2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcnVuc2VhcmNoJyk7XG5cbiAgZnVuY3Rpb24gZml4U3BlY2lhbENoYXJzKCkge1xuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgbmVlZGVkLCBhcyB3ZWF0aGVyQVBJIHBhcnNlcyBjaGFyYWN0ZXJzIGxpa2Ugw7bDpMOlIGJhZGx5XG4gICAgbGV0IGNpdHlWYWx1ZSA9IGNpdHlUb1NlYXJjaC52YWx1ZS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcnKTtcbiAgICBsZXQgaXRlcmF0ZWRDaXR5ID0gW107XG4gICAgY2l0eVZhbHVlLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGlmIChlbGVtZW50ID09PSAnw7YnKSB7XG4gICAgICAgIGl0ZXJhdGVkQ2l0eS5wdXNoKCdvJyk7XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgPT09ICfDpCcpIHtcbiAgICAgICAgaXRlcmF0ZWRDaXR5LnB1c2goJ2EnKTtcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCA9PT0gJ8OlJykge1xuICAgICAgICBpdGVyYXRlZENpdHkucHVzaCgnYScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlcmF0ZWRDaXR5LnB1c2goZWxlbWVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgcGFyc2VkQ2l0eSA9IGl0ZXJhdGVkQ2l0eS5qb2luKCcnKTtcbiAgICByZXR1cm4gcGFyc2VkQ2l0eTtcbiAgfVxuXG4gIHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIHJ1blNlYXJjaCgpIHtcbiAgICBjb25zdCBzZWFyY1BhcmFtZXRlciA9IGZpeFNwZWNpYWxDaGFycygpO1xuICAgIGZldGNoV2VhdGhlcihzZWFyY1BhcmFtZXRlcik7XG4gIH0pO1xuXG4gIGNpdHlUb1NlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGZ1bmN0aW9uIHJ1blNlYXJjaChldmVudCkge1xuICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgIGNvbnN0IHNlYXJjUGFyYW1ldGVyID0gZml4U3BlY2lhbENoYXJzKCk7XG4gICAgICBmZXRjaFdlYXRoZXIoc2VhcmNQYXJhbWV0ZXIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBpbmplY3REYXRhO1xuIiwiY29uc3Qgd2VhdGhlckpTT04gPSByZXF1aXJlKCcuLi9hc3NldHMvd2VhdGhlcl9jb25kaXRpb25zLmpzb24nKTtcblxuLy8gSW1wb3J0IGljb24gYXNzZXRzXG5mdW5jdGlvbiBpbXBvcnRJY29ucyhyKSB7XG4gIGxldCBpY29ucyA9IHt9O1xuICByLmtleXMoKS5tYXAoKGl0ZW0pID0+IHtcbiAgICBpY29uc1tpdGVtLnJlcGxhY2UoJy4vJywgJycpXSA9IHIoaXRlbSk7XG4gIH0pO1xuICByZXR1cm4gaWNvbnM7XG59XG5jb25zdCBpY29ucyA9IGltcG9ydEljb25zKFxuICByZXF1aXJlLmNvbnRleHQoJy4uL2Fzc2V0cy9pY29ucy9saW5lL2FsbCcsIGZhbHNlLCAvXFwuKHBuZ3xqcGU/Z3xzdmcpJC8pXG4pO1xuXG4vKiBET00gTUFOSVBVTEFUSU9OICovXG5cbmNvbnN0IHVwZGF0ZURpc3BsYXkgPSAod2VhdGhlckRhdGEpID0+IHtcbiAgY29uc3QgdGVtcHRlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2N1cnJlbnRUZW1wdGVyYXR1cmUnKTtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3VycmVudERlc2NyaXB0aW9uJyk7XG4gIGNvbnN0IGNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2l0eScpO1xuICBjb25zdCBjb3VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvdW50cnknKTtcbiAgY29uc3QgY3VycmVudEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3VycmVudEljb24nKTtcblxuICBjb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNodW1pZGl0eVZhbHVlJyk7XG4gIGNvbnN0IGFpclByZXNzdXJlVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWlyUHJlc3N1cmVWYWx1ZScpO1xuICBjb25zdCBjaGFuY2VPZlJhaW5WYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGFuY2VPZlJhaW5WYWx1ZScpO1xuICBjb25zdCB3aW5kU3BlZWRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3aW5kU3BlZWRWYWx1ZScpO1xuXG4gIGZ1bmN0aW9uIGxvYWRTdGF0aWNJY29ucygpIHtcbiAgICBjb25zdCBodW1pZGl0eUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaHVtaWRpdHlJY29uJyk7XG4gICAgY29uc3QgYWlyUHJlc3N1cmVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FpclByZXNzdXJlSWNvbicpO1xuICAgIGNvbnN0IGNoYW5jZU9mUmFpbkljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmNlT2ZSYWluSWNvbicpO1xuICAgIGNvbnN0IHdpbmRTcGVlZEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2luZFNwZWVkSWNvbicpO1xuXG4gICAgY29uc3QgY2VsY2l1c0ljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2VsY2l1c0ljb24nKTtcblxuICAgIGh1bWlkaXR5SWNvbi5zcmMgPSBpY29uc1snaHVtaWRpdHkuc3ZnJ107XG4gICAgYWlyUHJlc3N1cmVJY29uLnNyYyA9IGljb25zWydiYXJvbWV0ZXIuc3ZnJ107XG4gICAgY2hhbmNlT2ZSYWluSWNvbi5zcmMgPSBpY29uc1sndW1icmVsbGEuc3ZnJ107XG4gICAgd2luZFNwZWVkSWNvbi5zcmMgPSBpY29uc1snd2luZHNvY2suc3ZnJ107XG4gICAgY2VsY2l1c0ljb24uc3JjID0gaWNvbnNbJ3RoZXJtb21ldGVyLWNlbHNpdXMuc3ZnJ107XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVOb3coKSB7XG4gICAgdGVtcHRlcmF0dXJlLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZCh3ZWF0aGVyRGF0YS5jdXJyZW50LnRlbXBfYyl9Q2A7XG4gICAgY2l0eS50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJEYXRhLmxvY2F0aW9uLm5hbWV9LCAke3dlYXRoZXJEYXRhLmxvY2F0aW9uLnJlZ2lvbn1gO1xuICAgIGNvdW50cnkudGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyRGF0YS5sb2NhdGlvbi5jb3VudHJ5fWA7XG4gICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyRGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0fWA7XG5cbiAgICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJEYXRhLmN1cnJlbnQuaHVtaWRpdHl9ICVgO1xuICAgIGFpclByZXNzdXJlVmFsdWUudGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyRGF0YS5jdXJyZW50LnByZXNzdXJlX21ifSBoUGFgO1xuICAgIGNoYW5jZU9mUmFpblZhbHVlLnRleHRDb250ZW50ID0gYCR7d2VhdGhlckRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSVgO1xuICAgIHdpbmRTcGVlZFZhbHVlLnRleHRDb250ZW50ID0gYCR7d2VhdGhlckRhdGEuY3VycmVudC53aW5kX2twaH0gLyBrcGhgO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlSWNvbnMoKSB7XG4gICAgY29uc3Qgd2VhdGhlckljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndlYXRoZXJJY29uJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWF0aGVySWNvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGljb24gPSB3ZWF0aGVySlNPTi5maW5kKFxuICAgICAgICAoaXRlbSkgPT5cbiAgICAgICAgICBpdGVtLmNvZGUgPT09IHdlYXRoZXJEYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5jb25kaXRpb24uY29kZVxuICAgICAgKTtcbiAgICAgIHdlYXRoZXJJY29uc1tpXS5zcmMgPSBpY29uc1tpY29uLmRheV07XG4gICAgfVxuICAgIGNvbnN0IGljb24gPSB3ZWF0aGVySlNPTi5maW5kKFxuICAgICAgKGl0ZW0pID0+IGl0ZW0uY29kZSA9PT0gd2VhdGhlckRhdGEuY3VycmVudC5jb25kaXRpb24uY29kZVxuICAgICk7XG5cbiAgICBpZiAod2VhdGhlckRhdGEuY3VycmVudC5pc19kYXkgPT09IDApIHtcbiAgICAgIGN1cnJlbnRJY29uLnNyYyA9IGljb25zW2ljb24ubmlnaHRdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50SWNvbi5zcmMgPSBpY29uc1tpY29uLmRheV07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlRm9yZWNhc3QoKSB7XG4gICAgY29uc3QgZm9yZWNhc3RUZW1wcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZW1wZXJhdHVyZScpO1xuICAgIGNvbnN0IGZvcmVjYXN0VGVtcHNMb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVtcGVyYXR1cmVMb3cnKTtcbiAgICBjb25zdCBmb3JlY2FzdERlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlc2NyaXB0aW9uJyk7XG5cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGZvcmVjYXN0VGVtcHMubGVuZ3RoICsgMTsgaSsrKSB7XG4gICAgICBmb3JlY2FzdERlc2NyaXB0aW9uW2kgLSAxXS5pbm5lclRleHQgPVxuICAgICAgICB3ZWF0aGVyRGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkuY29uZGl0aW9uLnRleHQ7XG4gICAgICBmb3JlY2FzdFRlbXBzW2kgLSAxXS5pbm5lclRleHQgPSBgSGlnaDogJHtNYXRoLnJvdW5kKFxuICAgICAgICB3ZWF0aGVyRGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkubWF4dGVtcF9jXG4gICAgICApfUNgO1xuICAgICAgZm9yZWNhc3RUZW1wc0xvd1tpIC0gMV0uaW5uZXJUZXh0ID0gYExvdzogJHtNYXRoLnJvdW5kKFxuICAgICAgICB3ZWF0aGVyRGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkubWludGVtcF9jXG4gICAgICApfUNgO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZU5vdygpO1xuICBsb2FkU3RhdGljSWNvbnMoKTtcbiAgdXBkYXRlSWNvbnMoKTtcbiAgdXBkYXRlRm9yZWNhc3QoKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVwZGF0ZURpc3BsYXk7XG4iLCJpbXBvcnQgZmV0Y2hXZWF0aGVyIGZyb20gJy4vYXBpJztcblxuY29uc3QgdXNlckxvY2F0b3IgPSBhc3luYyAoKSA9PiB7XG4gIGZ1bmN0aW9uIHN1Y2Nlc3MocG9zKSB7XG4gICAgY29uc3QgdXNlckxvY2F0aW9uID0gcG9zLmNvb3JkcztcbiAgICBmZXRjaFdlYXRoZXIoYCR7dXNlckxvY2F0aW9uLmxhdGl0dWRlfSwke3VzZXJMb2NhdGlvbi5sb25naXR1ZGV9YCk7XG4gIH1cbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICBlbmFibGVIaWdoQWNjdXJhY3k6IHRydWUsXG4gICAgdGltZW91dDogNTAwMCxcbiAgICBtYXhpbXVtQWdlOiAwLFxuICB9O1xuXG4gIGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgIGNvbnNvbGUud2FybihgRVJST1IoJHtlcnIuY29kZX0pOiAke2Vyci5tZXNzYWdlfWApO1xuICB9XG4gIHRyeSB7XG4gICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihzdWNjZXNzLCBlcnJvciwgb3B0aW9ucyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VyTG9jYXRvcjtcbiIsImNvbnN0IHdlYXRoZXJTdG9yYWdlID0gKG5ld0RhdGEpID0+IHtcbiAgY29uc3QgbGF0ZXN0V2VhdGhlckRhdGEgPSBbXTtcbiAgbGF0ZXN0V2VhdGhlckRhdGEucHVzaChuZXdEYXRhKTtcblxuICBjb25zb2xlLmxvZyhsYXRlc3RXZWF0aGVyRGF0YSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3ZWF0aGVyU3RvcmFnZTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcGFkZGluZy10b3A6IDQwcHg7XFxuICBwYWRkaW5nLWJvdHRvbTogODBweDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG59XFxuXFxuYm9keSB7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgbWF4LXdpZHRoOiAxMDkwcHg7XFxuICBjb2xvcjogIzQ2NDEzNjtcXG4gIGZvbnQtZmFtaWx5OiByb2JvdG8sIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ09wZW4gU2FucycsXFxuICAgICdIZWx2ZXRpY2EgTmV1ZScsIHNhbnMtc2VyaWY7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjM4LCAxNzQsIDIwMik7XFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgIDkwZGVnLFxcbiAgICByZ2JhKDIzOCwgMTc0LCAyMDIsIDEpIDAlLFxcbiAgICByZ2JhKDE0OCwgMTg3LCAyMzMsIDEpIDEwMCVcXG4gICk7XFxufVxcblxcbi5tYWluSGVhZGluZyB7XFxuICBtYXJnaW4tbGVmdDogLTIlO1xcbn1cXG5cXG4uaGVhZGVyUmlnaHRTaWRlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnNjYWxlQ2hhbmdlciB7XFxuICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xcbn1cXG5cXG5idXR0b24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYzNhNTtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAyNXB4O1xcbiAgYm94LXNoYWRvdzogcmdiYSg1MCwgNTAsIDkzLCAwLjI1KSAwcHggMnB4IDVweCAtMXB4LFxcbiAgICByZ2JhKDAsIDAsIDAsIDAuMykgMHB4IDFweCAzcHggLTFweDtcXG59XFxuXFxuLmNpdHlzZWFyY2gge1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIHBhZGRpbmctbGVmdDogMTVweDtcXG5cXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XFxuICBib3gtc2hhZG93OiByZ2JhKDUwLCA1MCwgOTMsIDAuMjUpIDBweCAycHggNXB4IC0xcHgsXFxuICAgIHJnYmEoMCwgMCwgMCwgMC4zKSAwcHggMXB4IDNweCAtMXB4O1xcbn1cXG5cXG5pbnB1dDpob3ZlciB7XFxuICBib3gtc2hhZG93OiByZ2IoMjQ3LCAyNDcsIDI0NykgMHB4IDJweCA2cHggLTFweCxcXG4gICAgcmdiYSgwLCAwLCAwLCAwLjMpIDBweCAxcHggM3B4IC0xcHg7XFxufVxcblxcbmlucHV0OmZvY3VzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZGZmZjQ7XFxuICBvdXRsaW5lOiAxcHggc29saWQgcmdiKDI0NywgMjQ3LCAyNDcpO1xcbiAgb3V0bGluZS1vZmZzZXQ6IDFweDtcXG59XFxuXFxubWFpbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5tYWluQ29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBmbGV4LWdyb3c6IDE7XFxufVxcblxcbi5jdXJyZW50V2VhdGhlckNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGZsZXgtZ3JvdzogMTtcXG59XFxuXFxuLmJhc2ljLWRhdGEge1xcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgcGFkZGluZzogMyU7XFxuICAvKiBGcm9tIGh0dHBzOi8vY3NzLmdsYXNzICovXFxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjMpO1xcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcXG4gIGJveC1zaGFkb3c6IDAgNHB4IDMwcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDcuNnB4KTtcXG4gIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDcuNnB4KTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSk7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcblxcbi5hZGRpdGlvbmFsLWRhdGEge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICBtYXJnaW4tcmlnaHQ6IDElO1xcbiAgbWF4LXdpZHRoOiA0MDBweDtcXG59XFxuXFxuLmFkZGl0aW9uYWwtZGF0YSA+IGRpdiB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB3aWR0aDogMTA1cHg7XFxuICBoZWlnaHQ6IDEwNXB4O1xcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgcGFkZGluZzogMjBweDtcXG4gIC8qIEZyb20gaHR0cHM6Ly9jc3MuZ2xhc3MgKi9cXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wODIpO1xcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcXG4gIGJveC1zaGFkb3c6IDAgNHB4IDMwcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDcuNnB4KTtcXG4gIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDcuNnB4KTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNDgpO1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4uaWNvbkFuZERhdGEge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiBzbWFsbDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbi50b3BSb3cge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuI2N1cnJlbnRUZW1wdGVyYXR1cmUge1xcbiAgZm9udC1zaXplOiA0NHB4O1xcbn1cXG5cXG4jY3VycmVudERlc2NyaXB0aW9uIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1hcmdpbi10b3A6IC0xMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG59XFxuXFxuI2NpdHksXFxuI2NvdW50cnkge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiBzbWFsbGVyO1xcbn1cXG5cXG4uZm9yZWNhc3RDb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBtYXJnaW4tdG9wOiAzMCU7XFxuICBmbGV4LWdyb3c6IDE7XFxufVxcblxcbi5mb3JlY2FzdCB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5mb3JlY2FzdENhcmRzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG59XFxuXFxuLmZvcmVjYXN0Q2FyZHMgPiBkaXYge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWluLXdpZHRoOiAxMDBweDtcXG4gIG1heC13aWR0aDogMTIwcHg7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgcGFkZGluZy1ib3R0b206IDE1cHg7XFxuICBtYXJnaW46IDVweDtcXG4gIC8qIEZyb20gaHR0cHM6Ly9jc3MuZ2xhc3MgKi9cXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wODIpO1xcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcXG4gIGJveC1zaGFkb3c6IDAgNHB4IDMwcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDcuNnB4KTtcXG4gIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDcuNnB4KTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNDgpO1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4udGVtcHMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIG1heC13aWR0aDogODAlO1xcbn1cXG5cXG4udGVtcGVyYXR1cmUsXFxuLmRlc2NyaXB0aW9uLFxcbi50ZW1wZXJhdHVyZUxvdyB7XFxuICBtYXJnaW46IDElO1xcbiAgZm9udC1zaXplOiBzbWFsbDtcXG59XFxuXFxuLmRlc2NyaXB0aW9uIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgbWF4LXdpZHRoOiBtYXgtY29udGVudDtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgcGFkZGluZzogMjBweDtcXG4gIGZvbnQtc2l6ZTogc21hbGxlcjtcXG59XFxuXFxuYTpsaW5rIHtcXG4gIGNvbG9yOiAjZmZjM2E1O1xcbn1cXG5cXG5hOnZpc2l0ZWQge1xcbiAgY29sb3I6IHJnYigxNTUsIDY3LCAxMDUpO1xcbn1cXG5cXG5hOmhvdmVyIHtcXG4gIGNvbG9yOiByZ2IoMjI2LCA4OSwgMTQ4KTtcXG59XFxuXFxuYTphY3RpdmUge1xcbiAgY29sb3I6IHJnYmEoMTQ4LCAxODcsIDIzMywgMSk7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAuYmFzaWMtZGF0YSB7XFxuICAgIHdpZHRoOiA4NSU7XFxuICB9XFxuICAuY3VycmVudFdlYXRoZXJDb250YWluZXIsXFxuICAuYWRkaXRpb25hbC1kYXRhIHtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIG1hcmdpbi1yaWdodDogMHB4O1xcbiAgfVxcbiAgLmFkZGl0aW9uYWwtZGF0YSA+IGRpdixcXG4gIC5mb3JlY2FzdENhcmRzID4gZGl2IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbiAgfVxcbiAgLmFkZGl0aW9uYWwtZGF0YSA+IGRpdiB7XFxuICAgIG1heC13aWR0aDogMTAwcHg7XFxuICB9XFxuICAuZm9yZWNhc3RDb250YWluZXIge1xcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgfVxcbiAgcCB7XFxuICAgIG1hcmdpbi10b3A6IDVweDtcXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbiAgfVxcbiAgZm9vdGVyIHtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgfVxcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsYUFB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O0FBQ3hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiw2QkFBNkI7RUFDN0IsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0Usd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0Usd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsNkJBQTZCO0FBQy9COztBQUVBO0VBQ0U7SUFDRSxVQUFVO0VBQ1o7RUFDQTs7SUFFRSx1QkFBdUI7SUFDdkIsaUJBQWlCO0VBQ25CO0VBQ0E7O0lBRUUsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtFQUNwQjtFQUNBO0lBQ0UsZ0JBQWdCO0VBQ2xCO0VBQ0E7SUFDRSxnQkFBZ0I7RUFDbEI7RUFDQTtJQUNFLGVBQWU7SUFDZixrQkFBa0I7RUFDcEI7RUFDQTtJQUNFLGVBQWU7RUFDakI7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJoZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nLXRvcDogNDBweDtcXG4gIHBhZGRpbmctYm90dG9tOiA4MHB4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbn1cXG5cXG5ib2R5IHtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBtYXJnaW46IGF1dG87XFxuICBtYXgtd2lkdGg6IDEwOTBweDtcXG4gIGNvbG9yOiAjNDY0MTM2O1xcbiAgZm9udC1mYW1pbHk6IHJvYm90bywgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnT3BlbiBTYW5zJyxcXG4gICAgJ0hlbHZldGljYSBOZXVlJywgc2Fucy1zZXJpZjtcXG4gIGJhY2tncm91bmQ6IHJnYigyMzgsIDE3NCwgMjAyKTtcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcXG4gICAgOTBkZWcsXFxuICAgIHJnYmEoMjM4LCAxNzQsIDIwMiwgMSkgMCUsXFxuICAgIHJnYmEoMTQ4LCAxODcsIDIzMywgMSkgMTAwJVxcbiAgKTtcXG59XFxuXFxuLm1haW5IZWFkaW5nIHtcXG4gIG1hcmdpbi1sZWZ0OiAtMiU7XFxufVxcblxcbi5oZWFkZXJSaWdodFNpZGUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uc2NhbGVDaGFuZ2VyIHtcXG4gIHBhZGRpbmctcmlnaHQ6IDEwcHg7XFxufVxcblxcbmJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZjM2E1O1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxuICBib3gtc2hhZG93OiByZ2JhKDUwLCA1MCwgOTMsIDAuMjUpIDBweCAycHggNXB4IC0xcHgsXFxuICAgIHJnYmEoMCwgMCwgMCwgMC4zKSAwcHggMXB4IDNweCAtMXB4O1xcbn1cXG5cXG4uY2l0eXNlYXJjaCB7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xcblxcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMjVweDtcXG4gIG1hcmdpbi1yaWdodDogMTVweDtcXG4gIGJveC1zaGFkb3c6IHJnYmEoNTAsIDUwLCA5MywgMC4yNSkgMHB4IDJweCA1cHggLTFweCxcXG4gICAgcmdiYSgwLCAwLCAwLCAwLjMpIDBweCAxcHggM3B4IC0xcHg7XFxufVxcblxcbmlucHV0OmhvdmVyIHtcXG4gIGJveC1zaGFkb3c6IHJnYigyNDcsIDI0NywgMjQ3KSAwcHggMnB4IDZweCAtMXB4LFxcbiAgICByZ2JhKDAsIDAsIDAsIDAuMykgMHB4IDFweCAzcHggLTFweDtcXG59XFxuXFxuaW5wdXQ6Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZkZmZmNDtcXG4gIG91dGxpbmU6IDFweCBzb2xpZCByZ2IoMjQ3LCAyNDcsIDI0Nyk7XFxuICBvdXRsaW5lLW9mZnNldDogMXB4O1xcbn1cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLm1haW5Db250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGZsZXgtZ3JvdzogMTtcXG59XFxuXFxuLmN1cnJlbnRXZWF0aGVyQ29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgZmxleC1ncm93OiAxO1xcbn1cXG5cXG4uYmFzaWMtZGF0YSB7XFxuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBwYWRkaW5nOiAzJTtcXG4gIC8qIEZyb20gaHR0cHM6Ly9jc3MuZ2xhc3MgKi9cXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMyk7XFxuICBib3JkZXItcmFkaXVzOiAxNnB4O1xcbiAgYm94LXNoYWRvdzogMCA0cHggMzBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNy42cHgpO1xcbiAgLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXI6IGJsdXIoNy42cHgpO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KTtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuLmFkZGl0aW9uYWwtZGF0YSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG4gIG1hcmdpbi1yaWdodDogMSU7XFxuICBtYXgtd2lkdGg6IDQwMHB4O1xcbn1cXG5cXG4uYWRkaXRpb25hbC1kYXRhID4gZGl2IHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHdpZHRoOiAxMDVweDtcXG4gIGhlaWdodDogMTA1cHg7XFxuICBtYXJnaW4tbGVmdDogMjBweDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgLyogRnJvbSBodHRwczovL2Nzcy5nbGFzcyAqL1xcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA4Mik7XFxuICBib3JkZXItcmFkaXVzOiAxNnB4O1xcbiAgYm94LXNoYWRvdzogMCA0cHggMzBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNy42cHgpO1xcbiAgLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXI6IGJsdXIoNy42cHgpO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA0OCk7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcblxcbi5pY29uQW5kRGF0YSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IHNtYWxsO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuLnRvcFJvdyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jY3VycmVudFRlbXB0ZXJhdHVyZSB7XFxuICBmb250LXNpemU6IDQ0cHg7XFxufVxcblxcbiNjdXJyZW50RGVzY3JpcHRpb24ge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWFyZ2luLXRvcDogLTEwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbn1cXG5cXG4jY2l0eSxcXG4jY291bnRyeSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IHNtYWxsZXI7XFxufVxcblxcbi5mb3JlY2FzdENvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIG1hcmdpbi10b3A6IDMwJTtcXG4gIGZsZXgtZ3JvdzogMTtcXG59XFxuXFxuLmZvcmVjYXN0IHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmZvcmVjYXN0Q2FyZHMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbn1cXG5cXG4uZm9yZWNhc3RDYXJkcyA+IGRpdiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBtaW4td2lkdGg6IDEwMHB4O1xcbiAgbWF4LXdpZHRoOiAxMjBweDtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICBwYWRkaW5nLWJvdHRvbTogMTVweDtcXG4gIG1hcmdpbjogNXB4O1xcbiAgLyogRnJvbSBodHRwczovL2Nzcy5nbGFzcyAqL1xcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA4Mik7XFxuICBib3JkZXItcmFkaXVzOiAxNnB4O1xcbiAgYm94LXNoYWRvdzogMCA0cHggMzBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNy42cHgpO1xcbiAgLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXI6IGJsdXIoNy42cHgpO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA0OCk7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcblxcbi50ZW1wcyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgbWF4LXdpZHRoOiA4MCU7XFxufVxcblxcbi50ZW1wZXJhdHVyZSxcXG4uZGVzY3JpcHRpb24sXFxuLnRlbXBlcmF0dXJlTG93IHtcXG4gIG1hcmdpbjogMSU7XFxuICBmb250LXNpemU6IHNtYWxsO1xcbn1cXG5cXG4uZGVzY3JpcHRpb24ge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBtYXgtd2lkdGg6IG1heC1jb250ZW50O1xcbn1cXG5cXG5mb290ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIG1hcmdpbi10b3A6IGF1dG87XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgZm9udC1zaXplOiBzbWFsbGVyO1xcbn1cXG5cXG5hOmxpbmsge1xcbiAgY29sb3I6ICNmZmMzYTU7XFxufVxcblxcbmE6dmlzaXRlZCB7XFxuICBjb2xvcjogcmdiKDE1NSwgNjcsIDEwNSk7XFxufVxcblxcbmE6aG92ZXIge1xcbiAgY29sb3I6IHJnYigyMjYsIDg5LCAxNDgpO1xcbn1cXG5cXG5hOmFjdGl2ZSB7XFxuICBjb2xvcjogcmdiYSgxNDgsIDE4NywgMjMzLCAxKTtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gIC5iYXNpYy1kYXRhIHtcXG4gICAgd2lkdGg6IDg1JTtcXG4gIH1cXG4gIC5jdXJyZW50V2VhdGhlckNvbnRhaW5lcixcXG4gIC5hZGRpdGlvbmFsLWRhdGEge1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwcHg7XFxuICB9XFxuICAuYWRkaXRpb25hbC1kYXRhID4gZGl2LFxcbiAgLmZvcmVjYXN0Q2FyZHMgPiBkaXYge1xcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XFxuICB9XFxuICAuYWRkaXRpb25hbC1kYXRhID4gZGl2IHtcXG4gICAgbWF4LXdpZHRoOiAxMDBweDtcXG4gIH1cXG4gIC5mb3JlY2FzdENvbnRhaW5lciB7XFxuICAgIG1hcmdpbi10b3A6IGF1dG87XFxuICB9XFxuICBwIHtcXG4gICAgbWFyZ2luLXRvcDogNXB4O1xcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XFxuICB9XFxuICBmb290ZXIge1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYmFyb21ldGVyLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9iYXJvbWV0ZXIuc3ZnXCIsXG5cdFwiLi9jZWxzaXVzLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9jZWxzaXVzLnN2Z1wiLFxuXHRcIi4vY2xlYXItZGF5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9jbGVhci1kYXkuc3ZnXCIsXG5cdFwiLi9jbGVhci1uaWdodC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvY2xlYXItbmlnaHQuc3ZnXCIsXG5cdFwiLi9jbG91ZHkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2Nsb3VkeS5zdmdcIixcblx0XCIuL2NvbXBhc3Muc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2NvbXBhc3Muc3ZnXCIsXG5cdFwiLi9kcml6emxlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9kcml6emxlLnN2Z1wiLFxuXHRcIi4vZHVzdC1kYXkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2R1c3QtZGF5LnN2Z1wiLFxuXHRcIi4vZHVzdC1uaWdodC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvZHVzdC1uaWdodC5zdmdcIixcblx0XCIuL2R1c3Qtd2luZC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvZHVzdC13aW5kLnN2Z1wiLFxuXHRcIi4vZHVzdC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvZHVzdC5zdmdcIixcblx0XCIuL2ZhaHJlbmhlaXQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2ZhaHJlbmhlaXQuc3ZnXCIsXG5cdFwiLi9mYWxsaW5nLXN0YXJzLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9mYWxsaW5nLXN0YXJzLnN2Z1wiLFxuXHRcIi4vZm9nLWRheS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvZm9nLWRheS5zdmdcIixcblx0XCIuL2ZvZy1uaWdodC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvZm9nLW5pZ2h0LnN2Z1wiLFxuXHRcIi4vZm9nLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9mb2cuc3ZnXCIsXG5cdFwiLi9oYWlsLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9oYWlsLnN2Z1wiLFxuXHRcIi4vaGF6ZS1kYXkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2hhemUtZGF5LnN2Z1wiLFxuXHRcIi4vaGF6ZS1uaWdodC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvaGF6ZS1uaWdodC5zdmdcIixcblx0XCIuL2hhemUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2hhemUuc3ZnXCIsXG5cdFwiLi9ob3Jpem9uLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9ob3Jpem9uLnN2Z1wiLFxuXHRcIi4vaHVtaWRpdHkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2h1bWlkaXR5LnN2Z1wiLFxuXHRcIi4vaHVycmljYW5lLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9odXJyaWNhbmUuc3ZnXCIsXG5cdFwiLi9saWdodG5pbmctYm9sdC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvbGlnaHRuaW5nLWJvbHQuc3ZnXCIsXG5cdFwiLi9taXN0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9taXN0LnN2Z1wiLFxuXHRcIi4vbW9vbi1maXJzdC1xdWFydGVyLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9tb29uLWZpcnN0LXF1YXJ0ZXIuc3ZnXCIsXG5cdFwiLi9tb29uLWZ1bGwuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL21vb24tZnVsbC5zdmdcIixcblx0XCIuL21vb24tbGFzdC1xdWFydGVyLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9tb29uLWxhc3QtcXVhcnRlci5zdmdcIixcblx0XCIuL21vb24tbmV3LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9tb29uLW5ldy5zdmdcIixcblx0XCIuL21vb24td2FuaW5nLWNyZXNjZW50LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9tb29uLXdhbmluZy1jcmVzY2VudC5zdmdcIixcblx0XCIuL21vb24td2FuaW5nLWdpYmJvdXMuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL21vb24td2FuaW5nLWdpYmJvdXMuc3ZnXCIsXG5cdFwiLi9tb29uLXdheGluZy1jcmVzY2VudC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvbW9vbi13YXhpbmctY3Jlc2NlbnQuc3ZnXCIsXG5cdFwiLi9tb29uLXdheGluZy1naWJib3VzLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9tb29uLXdheGluZy1naWJib3VzLnN2Z1wiLFxuXHRcIi4vbW9vbnJpc2Uuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL21vb25yaXNlLnN2Z1wiLFxuXHRcIi4vbW9vbnNldC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvbW9vbnNldC5zdmdcIixcblx0XCIuL25vdC1hdmFpbGFibGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL25vdC1hdmFpbGFibGUuc3ZnXCIsXG5cdFwiLi9vdmVyY2FzdC1kYXkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL292ZXJjYXN0LWRheS5zdmdcIixcblx0XCIuL292ZXJjYXN0LW5pZ2h0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9vdmVyY2FzdC1uaWdodC5zdmdcIixcblx0XCIuL292ZXJjYXN0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9vdmVyY2FzdC5zdmdcIixcblx0XCIuL3BhcnRseS1jbG91ZHktZGF5LWRyaXp6bGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3BhcnRseS1jbG91ZHktZGF5LWRyaXp6bGUuc3ZnXCIsXG5cdFwiLi9wYXJ0bHktY2xvdWR5LWRheS1mb2cuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3BhcnRseS1jbG91ZHktZGF5LWZvZy5zdmdcIixcblx0XCIuL3BhcnRseS1jbG91ZHktZGF5LWhhaWwuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3BhcnRseS1jbG91ZHktZGF5LWhhaWwuc3ZnXCIsXG5cdFwiLi9wYXJ0bHktY2xvdWR5LWRheS1oYXplLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wYXJ0bHktY2xvdWR5LWRheS1oYXplLnN2Z1wiLFxuXHRcIi4vcGFydGx5LWNsb3VkeS1kYXktcmFpbi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcGFydGx5LWNsb3VkeS1kYXktcmFpbi5zdmdcIixcblx0XCIuL3BhcnRseS1jbG91ZHktZGF5LXNsZWV0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wYXJ0bHktY2xvdWR5LWRheS1zbGVldC5zdmdcIixcblx0XCIuL3BhcnRseS1jbG91ZHktZGF5LXNtb2tlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wYXJ0bHktY2xvdWR5LWRheS1zbW9rZS5zdmdcIixcblx0XCIuL3BhcnRseS1jbG91ZHktZGF5LXNub3cuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3BhcnRseS1jbG91ZHktZGF5LXNub3cuc3ZnXCIsXG5cdFwiLi9wYXJ0bHktY2xvdWR5LWRheS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcGFydGx5LWNsb3VkeS1kYXkuc3ZnXCIsXG5cdFwiLi9wYXJ0bHktY2xvdWR5LW5pZ2h0LWRyaXp6bGUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3BhcnRseS1jbG91ZHktbmlnaHQtZHJpenpsZS5zdmdcIixcblx0XCIuL3BhcnRseS1jbG91ZHktbmlnaHQtZm9nLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wYXJ0bHktY2xvdWR5LW5pZ2h0LWZvZy5zdmdcIixcblx0XCIuL3BhcnRseS1jbG91ZHktbmlnaHQtaGFpbC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcGFydGx5LWNsb3VkeS1uaWdodC1oYWlsLnN2Z1wiLFxuXHRcIi4vcGFydGx5LWNsb3VkeS1uaWdodC1oYXplLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wYXJ0bHktY2xvdWR5LW5pZ2h0LWhhemUuc3ZnXCIsXG5cdFwiLi9wYXJ0bHktY2xvdWR5LW5pZ2h0LXJhaW4uc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3BhcnRseS1jbG91ZHktbmlnaHQtcmFpbi5zdmdcIixcblx0XCIuL3BhcnRseS1jbG91ZHktbmlnaHQtc2xlZXQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3BhcnRseS1jbG91ZHktbmlnaHQtc2xlZXQuc3ZnXCIsXG5cdFwiLi9wYXJ0bHktY2xvdWR5LW5pZ2h0LXNtb2tlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wYXJ0bHktY2xvdWR5LW5pZ2h0LXNtb2tlLnN2Z1wiLFxuXHRcIi4vcGFydGx5LWNsb3VkeS1uaWdodC1zbm93LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wYXJ0bHktY2xvdWR5LW5pZ2h0LXNub3cuc3ZnXCIsXG5cdFwiLi9wYXJ0bHktY2xvdWR5LW5pZ2h0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wYXJ0bHktY2xvdWR5LW5pZ2h0LnN2Z1wiLFxuXHRcIi4vcHJlc3N1cmUtaGlnaC1hbHQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3ByZXNzdXJlLWhpZ2gtYWx0LnN2Z1wiLFxuXHRcIi4vcHJlc3N1cmUtaGlnaC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcHJlc3N1cmUtaGlnaC5zdmdcIixcblx0XCIuL3ByZXNzdXJlLWxvdy1hbHQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3ByZXNzdXJlLWxvdy1hbHQuc3ZnXCIsXG5cdFwiLi9wcmVzc3VyZS1sb3cuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3ByZXNzdXJlLWxvdy5zdmdcIixcblx0XCIuL3JhaW4uc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3JhaW4uc3ZnXCIsXG5cdFwiLi9yYWluZHJvcC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcmFpbmRyb3Auc3ZnXCIsXG5cdFwiLi9yYWluZHJvcHMuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3JhaW5kcm9wcy5zdmdcIixcblx0XCIuL3NsZWV0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9zbGVldC5zdmdcIixcblx0XCIuL3Ntb2tlLXBhcnRpY2xlcy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvc21va2UtcGFydGljbGVzLnN2Z1wiLFxuXHRcIi4vc21va2Uuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3Ntb2tlLnN2Z1wiLFxuXHRcIi4vc25vdy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvc25vdy5zdmdcIixcblx0XCIuL3Nub3dmbGFrZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvc25vd2ZsYWtlLnN2Z1wiLFxuXHRcIi4vc29sYXItZWNsaXBzZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvc29sYXItZWNsaXBzZS5zdmdcIixcblx0XCIuL3N0YXIuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3N0YXIuc3ZnXCIsXG5cdFwiLi9zdGFycnktbmlnaHQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3N0YXJyeS1uaWdodC5zdmdcIixcblx0XCIuL3N1bnJpc2Uuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3N1bnJpc2Uuc3ZnXCIsXG5cdFwiLi9zdW5zZXQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3N1bnNldC5zdmdcIixcblx0XCIuL3RoZXJtb21ldGVyLWNlbHNpdXMuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3RoZXJtb21ldGVyLWNlbHNpdXMuc3ZnXCIsXG5cdFwiLi90aGVybW9tZXRlci1jb2xkZXIuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3RoZXJtb21ldGVyLWNvbGRlci5zdmdcIixcblx0XCIuL3RoZXJtb21ldGVyLWZhaHJlbmhlaXQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3RoZXJtb21ldGVyLWZhaHJlbmhlaXQuc3ZnXCIsXG5cdFwiLi90aGVybW9tZXRlci1nbGFzcy1jZWxzaXVzLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC90aGVybW9tZXRlci1nbGFzcy1jZWxzaXVzLnN2Z1wiLFxuXHRcIi4vdGhlcm1vbWV0ZXItZ2xhc3MtZmFocmVuaGVpdC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdGhlcm1vbWV0ZXItZ2xhc3MtZmFocmVuaGVpdC5zdmdcIixcblx0XCIuL3RoZXJtb21ldGVyLWdsYXNzLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC90aGVybW9tZXRlci1nbGFzcy5zdmdcIixcblx0XCIuL3RoZXJtb21ldGVyLW1lcmN1cnktY29sZC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdGhlcm1vbWV0ZXItbWVyY3VyeS1jb2xkLnN2Z1wiLFxuXHRcIi4vdGhlcm1vbWV0ZXItbWVyY3VyeS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdGhlcm1vbWV0ZXItbWVyY3VyeS5zdmdcIixcblx0XCIuL3RoZXJtb21ldGVyLXdhcm1lci5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdGhlcm1vbWV0ZXItd2FybWVyLnN2Z1wiLFxuXHRcIi4vdGhlcm1vbWV0ZXIuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3RoZXJtb21ldGVyLnN2Z1wiLFxuXHRcIi4vdGh1bmRlcnN0b3Jtcy1kYXktcmFpbi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdGh1bmRlcnN0b3Jtcy1kYXktcmFpbi5zdmdcIixcblx0XCIuL3RodW5kZXJzdG9ybXMtZGF5LXNub3cuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3RodW5kZXJzdG9ybXMtZGF5LXNub3cuc3ZnXCIsXG5cdFwiLi90aHVuZGVyc3Rvcm1zLWRheS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdGh1bmRlcnN0b3Jtcy1kYXkuc3ZnXCIsXG5cdFwiLi90aHVuZGVyc3Rvcm1zLW5pZ2h0LXJhaW4uc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3RodW5kZXJzdG9ybXMtbmlnaHQtcmFpbi5zdmdcIixcblx0XCIuL3RodW5kZXJzdG9ybXMtbmlnaHQtc25vdy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdGh1bmRlcnN0b3Jtcy1uaWdodC1zbm93LnN2Z1wiLFxuXHRcIi4vdGh1bmRlcnN0b3Jtcy1uaWdodC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdGh1bmRlcnN0b3Jtcy1uaWdodC5zdmdcIixcblx0XCIuL3RodW5kZXJzdG9ybXMtcmFpbi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdGh1bmRlcnN0b3Jtcy1yYWluLnN2Z1wiLFxuXHRcIi4vdGh1bmRlcnN0b3Jtcy1zbm93LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC90aHVuZGVyc3Rvcm1zLXNub3cuc3ZnXCIsXG5cdFwiLi90aHVuZGVyc3Rvcm1zLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC90aHVuZGVyc3Rvcm1zLnN2Z1wiLFxuXHRcIi4vdG9ybmFkby5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdG9ybmFkby5zdmdcIixcblx0XCIuL3VtYnJlbGxhLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC91bWJyZWxsYS5zdmdcIixcblx0XCIuL3V2LWluZGV4LTEuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3V2LWluZGV4LTEuc3ZnXCIsXG5cdFwiLi91di1pbmRleC0xMC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdXYtaW5kZXgtMTAuc3ZnXCIsXG5cdFwiLi91di1pbmRleC0xMS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdXYtaW5kZXgtMTEuc3ZnXCIsXG5cdFwiLi91di1pbmRleC0yLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC91di1pbmRleC0yLnN2Z1wiLFxuXHRcIi4vdXYtaW5kZXgtMy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdXYtaW5kZXgtMy5zdmdcIixcblx0XCIuL3V2LWluZGV4LTQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3V2LWluZGV4LTQuc3ZnXCIsXG5cdFwiLi91di1pbmRleC01LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC91di1pbmRleC01LnN2Z1wiLFxuXHRcIi4vdXYtaW5kZXgtNi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdXYtaW5kZXgtNi5zdmdcIixcblx0XCIuL3V2LWluZGV4LTcuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3V2LWluZGV4LTcuc3ZnXCIsXG5cdFwiLi91di1pbmRleC04LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC91di1pbmRleC04LnN2Z1wiLFxuXHRcIi4vdXYtaW5kZXgtOS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdXYtaW5kZXgtOS5zdmdcIixcblx0XCIuL3V2LWluZGV4LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC91di1pbmRleC5zdmdcIixcblx0XCIuL3dpbmQtYmVhdWZvcnQtMC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvd2luZC1iZWF1Zm9ydC0wLnN2Z1wiLFxuXHRcIi4vd2luZC1iZWF1Zm9ydC0xLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC93aW5kLWJlYXVmb3J0LTEuc3ZnXCIsXG5cdFwiLi93aW5kLWJlYXVmb3J0LTEwLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC93aW5kLWJlYXVmb3J0LTEwLnN2Z1wiLFxuXHRcIi4vd2luZC1iZWF1Zm9ydC0xMS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvd2luZC1iZWF1Zm9ydC0xMS5zdmdcIixcblx0XCIuL3dpbmQtYmVhdWZvcnQtMTIuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3dpbmQtYmVhdWZvcnQtMTIuc3ZnXCIsXG5cdFwiLi93aW5kLWJlYXVmb3J0LTIuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3dpbmQtYmVhdWZvcnQtMi5zdmdcIixcblx0XCIuL3dpbmQtYmVhdWZvcnQtMy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvd2luZC1iZWF1Zm9ydC0zLnN2Z1wiLFxuXHRcIi4vd2luZC1iZWF1Zm9ydC00LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC93aW5kLWJlYXVmb3J0LTQuc3ZnXCIsXG5cdFwiLi93aW5kLWJlYXVmb3J0LTUuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3dpbmQtYmVhdWZvcnQtNS5zdmdcIixcblx0XCIuL3dpbmQtYmVhdWZvcnQtNi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvd2luZC1iZWF1Zm9ydC02LnN2Z1wiLFxuXHRcIi4vd2luZC1iZWF1Zm9ydC03LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC93aW5kLWJlYXVmb3J0LTcuc3ZnXCIsXG5cdFwiLi93aW5kLWJlYXVmb3J0LTguc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3dpbmQtYmVhdWZvcnQtOC5zdmdcIixcblx0XCIuL3dpbmQtYmVhdWZvcnQtOS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvd2luZC1iZWF1Zm9ydC05LnN2Z1wiLFxuXHRcIi4vd2luZC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvd2luZC5zdmdcIixcblx0XCIuL3dpbmRzb2NrLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC93aW5kc29jay5zdmdcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsIHN5bmMgXFxcXC4ocG5nJTdDanBlP2clN0NzdmcpJFwiOyJdLCJuYW1lcyI6WyJpbmplY3REYXRhIiwidXNlckxvY2F0b3IiLCJ1cGRhdGVEaXNwbGF5Iiwid2VhdGhlclN0b3JhZ2UiLCJmZXRjaFdlYXRoZXIiLCJsb2NhdGlvbiIsInNlYXJjaFdpdGhDaXR5IiwidW5kZWZpbmVkIiwicmVzcG9uc2UiLCJmZXRjaCIsInJlc3BvbnNlRGF0YSIsImpzb24iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJjaXR5VG9TZWFyY2giLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZWFyY2hCdG4iLCJmaXhTcGVjaWFsQ2hhcnMiLCJjaXR5VmFsdWUiLCJ2YWx1ZSIsInRvTG93ZXJDYXNlIiwic3BsaXQiLCJpdGVyYXRlZENpdHkiLCJmb3JFYWNoIiwiZWxlbWVudCIsInB1c2giLCJwYXJzZWRDaXR5Iiwiam9pbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJydW5TZWFyY2giLCJzZWFyY1BhcmFtZXRlciIsImV2ZW50Iiwia2V5Iiwid2VhdGhlckpTT04iLCJyZXF1aXJlIiwiaW1wb3J0SWNvbnMiLCJyIiwiaWNvbnMiLCJrZXlzIiwibWFwIiwiaXRlbSIsInJlcGxhY2UiLCJjb250ZXh0Iiwid2VhdGhlckRhdGEiLCJ0ZW1wdGVyYXR1cmUiLCJkZXNjcmlwdGlvbiIsImNpdHkiLCJjb3VudHJ5IiwiY3VycmVudEljb24iLCJodW1pZGl0eSIsImFpclByZXNzdXJlVmFsdWUiLCJjaGFuY2VPZlJhaW5WYWx1ZSIsIndpbmRTcGVlZFZhbHVlIiwibG9hZFN0YXRpY0ljb25zIiwiaHVtaWRpdHlJY29uIiwiYWlyUHJlc3N1cmVJY29uIiwiY2hhbmNlT2ZSYWluSWNvbiIsIndpbmRTcGVlZEljb24iLCJjZWxjaXVzSWNvbiIsInNyYyIsInVwZGF0ZU5vdyIsInRleHRDb250ZW50IiwiTWF0aCIsInJvdW5kIiwiY3VycmVudCIsInRlbXBfYyIsIm5hbWUiLCJyZWdpb24iLCJjb25kaXRpb24iLCJ0ZXh0IiwicHJlc3N1cmVfbWIiLCJmb3JlY2FzdCIsImZvcmVjYXN0ZGF5IiwiZGF5IiwiZGFpbHlfY2hhbmNlX29mX3JhaW4iLCJ3aW5kX2twaCIsInVwZGF0ZUljb25zIiwid2VhdGhlckljb25zIiwicXVlcnlTZWxlY3RvckFsbCIsImkiLCJsZW5ndGgiLCJpY29uIiwiZmluZCIsImNvZGUiLCJpc19kYXkiLCJuaWdodCIsInVwZGF0ZUZvcmVjYXN0IiwiZm9yZWNhc3RUZW1wcyIsImZvcmVjYXN0VGVtcHNMb3ciLCJmb3JlY2FzdERlc2NyaXB0aW9uIiwiaW5uZXJUZXh0IiwibWF4dGVtcF9jIiwibWludGVtcF9jIiwic3VjY2VzcyIsInBvcyIsInVzZXJMb2NhdGlvbiIsImNvb3JkcyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwib3B0aW9ucyIsImVuYWJsZUhpZ2hBY2N1cmFjeSIsInRpbWVvdXQiLCJtYXhpbXVtQWdlIiwiZXJyIiwid2FybiIsIm1lc3NhZ2UiLCJuYXZpZ2F0b3IiLCJnZW9sb2NhdGlvbiIsImdldEN1cnJlbnRQb3NpdGlvbiIsIm5ld0RhdGEiLCJsYXRlc3RXZWF0aGVyRGF0YSJdLCJzb3VyY2VSb290IjoiIn0=