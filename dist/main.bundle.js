(self["webpackChunkodin_weather"] = self["webpackChunkodin_weather"] || []).push([["main"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_domController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/domController */ "./src/modules/domController.js");
/* harmony import */ var _modules_locator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/locator */ "./src/modules/locator.js");



(0,_modules_domController__WEBPACK_IMPORTED_MODULE_1__["default"])();
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
    } catch (error) {
      console.log(error);
    }
  }
  searchWithCity();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fetchWeather);

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

/***/ "./src/modules/domController.js":
/*!**************************************!*\
  !*** ./src/modules/domController.js ***!
  \**************************************/
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
    cityToSearch.value = '';
  });
  cityToSearch.addEventListener('keypress', function runSearch(event) {
    if (event.key === 'Enter') {
      const searcParameter = fixSpecialChars();
      (0,_api__WEBPACK_IMPORTED_MODULE_0__["default"])(searcParameter);
      cityToSearch.value = '';
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (injectData);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vc3JjL21vZHVsZXMvYXBpLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9zcmMvbW9kdWxlcy9kb21Db250cm9sbGVyLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL3NyYy9tb2R1bGVzL2xvY2F0b3IuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvIHN5bmMgbm9ucmVjdXJzaXZlIFxcLihwbmclN0NqcGUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgaW5qZWN0RGF0YSBmcm9tICcuL21vZHVsZXMvZG9tQ29udHJvbGxlcic7XG5pbXBvcnQgdXNlckxvY2F0b3IgZnJvbSAnLi9tb2R1bGVzL2xvY2F0b3InO1xuXG5pbmplY3REYXRhKCk7XG51c2VyTG9jYXRvcigpO1xuIiwiaW1wb3J0IHVwZGF0ZURpc3BsYXkgZnJvbSAnLi9kb20nO1xuXG5jb25zdCBmZXRjaFdlYXRoZXIgPSBhc3luYyAobG9jYXRpb24pID0+IHtcbiAgYXN5bmMgZnVuY3Rpb24gc2VhcmNoV2l0aENpdHkoKSB7XG4gICAgaWYgKGxvY2F0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGxvY2F0aW9uID0gJ0xvbmRvbic7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9MTVlNDJlMDYyMGI2NDlhOGFlOTYxNzQyMjMwNjA0JnE9JHtsb2NhdGlvbn0mZGF5cz02YFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlRGF0YSk7XG4gICAgICB1cGRhdGVEaXNwbGF5KHJlc3BvbnNlRGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBzZWFyY2hXaXRoQ2l0eSgpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZmV0Y2hXZWF0aGVyO1xuIiwiY29uc3Qgd2VhdGhlckpTT04gPSByZXF1aXJlKCcuLi9hc3NldHMvd2VhdGhlcl9jb25kaXRpb25zLmpzb24nKTtcblxuLy8gSW1wb3J0IGljb24gYXNzZXRzXG5mdW5jdGlvbiBpbXBvcnRJY29ucyhyKSB7XG4gIGxldCBpY29ucyA9IHt9O1xuICByLmtleXMoKS5tYXAoKGl0ZW0pID0+IHtcbiAgICBpY29uc1tpdGVtLnJlcGxhY2UoJy4vJywgJycpXSA9IHIoaXRlbSk7XG4gIH0pO1xuICByZXR1cm4gaWNvbnM7XG59XG5jb25zdCBpY29ucyA9IGltcG9ydEljb25zKFxuICByZXF1aXJlLmNvbnRleHQoJy4uL2Fzc2V0cy9pY29ucy9saW5lL2FsbCcsIGZhbHNlLCAvXFwuKHBuZ3xqcGU/Z3xzdmcpJC8pXG4pO1xuXG4vKiBET00gTUFOSVBVTEFUSU9OICovXG5cbmNvbnN0IHVwZGF0ZURpc3BsYXkgPSAod2VhdGhlckRhdGEpID0+IHtcbiAgY29uc3QgdGVtcHRlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2N1cnJlbnRUZW1wdGVyYXR1cmUnKTtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3VycmVudERlc2NyaXB0aW9uJyk7XG4gIGNvbnN0IGNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2l0eScpO1xuICBjb25zdCBjb3VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvdW50cnknKTtcbiAgY29uc3QgY3VycmVudEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3VycmVudEljb24nKTtcblxuICBjb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNodW1pZGl0eVZhbHVlJyk7XG4gIGNvbnN0IGFpclByZXNzdXJlVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWlyUHJlc3N1cmVWYWx1ZScpO1xuICBjb25zdCBjaGFuY2VPZlJhaW5WYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGFuY2VPZlJhaW5WYWx1ZScpO1xuICBjb25zdCB3aW5kU3BlZWRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3aW5kU3BlZWRWYWx1ZScpO1xuXG4gIGZ1bmN0aW9uIGxvYWRTdGF0aWNJY29ucygpIHtcbiAgICBjb25zdCBodW1pZGl0eUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaHVtaWRpdHlJY29uJyk7XG4gICAgY29uc3QgYWlyUHJlc3N1cmVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FpclByZXNzdXJlSWNvbicpO1xuICAgIGNvbnN0IGNoYW5jZU9mUmFpbkljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmNlT2ZSYWluSWNvbicpO1xuICAgIGNvbnN0IHdpbmRTcGVlZEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2luZFNwZWVkSWNvbicpO1xuXG4gICAgY29uc3QgY2VsY2l1c0ljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2VsY2l1c0ljb24nKTtcblxuICAgIGh1bWlkaXR5SWNvbi5zcmMgPSBpY29uc1snaHVtaWRpdHkuc3ZnJ107XG4gICAgYWlyUHJlc3N1cmVJY29uLnNyYyA9IGljb25zWydiYXJvbWV0ZXIuc3ZnJ107XG4gICAgY2hhbmNlT2ZSYWluSWNvbi5zcmMgPSBpY29uc1sndW1icmVsbGEuc3ZnJ107XG4gICAgd2luZFNwZWVkSWNvbi5zcmMgPSBpY29uc1snd2luZHNvY2suc3ZnJ107XG4gICAgY2VsY2l1c0ljb24uc3JjID0gaWNvbnNbJ3RoZXJtb21ldGVyLWNlbHNpdXMuc3ZnJ107XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVOb3coKSB7XG4gICAgdGVtcHRlcmF0dXJlLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZCh3ZWF0aGVyRGF0YS5jdXJyZW50LnRlbXBfYyl9Q2A7XG4gICAgY2l0eS50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJEYXRhLmxvY2F0aW9uLm5hbWV9LCAke3dlYXRoZXJEYXRhLmxvY2F0aW9uLnJlZ2lvbn1gO1xuICAgIGNvdW50cnkudGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyRGF0YS5sb2NhdGlvbi5jb3VudHJ5fWA7XG4gICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyRGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0fWA7XG5cbiAgICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJEYXRhLmN1cnJlbnQuaHVtaWRpdHl9ICVgO1xuICAgIGFpclByZXNzdXJlVmFsdWUudGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyRGF0YS5jdXJyZW50LnByZXNzdXJlX21ifSBoUGFgO1xuICAgIGNoYW5jZU9mUmFpblZhbHVlLnRleHRDb250ZW50ID0gYCR7d2VhdGhlckRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSVgO1xuICAgIHdpbmRTcGVlZFZhbHVlLnRleHRDb250ZW50ID0gYCR7d2VhdGhlckRhdGEuY3VycmVudC53aW5kX2twaH0gLyBrcGhgO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlSWNvbnMoKSB7XG4gICAgY29uc3Qgd2VhdGhlckljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndlYXRoZXJJY29uJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWF0aGVySWNvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGljb24gPSB3ZWF0aGVySlNPTi5maW5kKFxuICAgICAgICAoaXRlbSkgPT5cbiAgICAgICAgICBpdGVtLmNvZGUgPT09IHdlYXRoZXJEYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5jb25kaXRpb24uY29kZVxuICAgICAgKTtcbiAgICAgIHdlYXRoZXJJY29uc1tpXS5zcmMgPSBpY29uc1tpY29uLmRheV07XG4gICAgfVxuICAgIGNvbnN0IGljb24gPSB3ZWF0aGVySlNPTi5maW5kKFxuICAgICAgKGl0ZW0pID0+IGl0ZW0uY29kZSA9PT0gd2VhdGhlckRhdGEuY3VycmVudC5jb25kaXRpb24uY29kZVxuICAgICk7XG5cbiAgICBpZiAod2VhdGhlckRhdGEuY3VycmVudC5pc19kYXkgPT09IDApIHtcbiAgICAgIGN1cnJlbnRJY29uLnNyYyA9IGljb25zW2ljb24ubmlnaHRdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50SWNvbi5zcmMgPSBpY29uc1tpY29uLmRheV07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlRm9yZWNhc3QoKSB7XG4gICAgY29uc3QgZm9yZWNhc3RUZW1wcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZW1wZXJhdHVyZScpO1xuICAgIGNvbnN0IGZvcmVjYXN0VGVtcHNMb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVtcGVyYXR1cmVMb3cnKTtcbiAgICBjb25zdCBmb3JlY2FzdERlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlc2NyaXB0aW9uJyk7XG5cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGZvcmVjYXN0VGVtcHMubGVuZ3RoICsgMTsgaSsrKSB7XG4gICAgICBmb3JlY2FzdERlc2NyaXB0aW9uW2kgLSAxXS5pbm5lclRleHQgPVxuICAgICAgICB3ZWF0aGVyRGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkuY29uZGl0aW9uLnRleHQ7XG4gICAgICBmb3JlY2FzdFRlbXBzW2kgLSAxXS5pbm5lclRleHQgPSBgSGlnaDogJHtNYXRoLnJvdW5kKFxuICAgICAgICB3ZWF0aGVyRGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkubWF4dGVtcF9jXG4gICAgICApfUNgO1xuICAgICAgZm9yZWNhc3RUZW1wc0xvd1tpIC0gMV0uaW5uZXJUZXh0ID0gYExvdzogJHtNYXRoLnJvdW5kKFxuICAgICAgICB3ZWF0aGVyRGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkubWludGVtcF9jXG4gICAgICApfUNgO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZU5vdygpO1xuICBsb2FkU3RhdGljSWNvbnMoKTtcbiAgdXBkYXRlSWNvbnMoKTtcbiAgdXBkYXRlRm9yZWNhc3QoKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVwZGF0ZURpc3BsYXk7XG4iLCJpbXBvcnQgZmV0Y2hXZWF0aGVyIGZyb20gJy4vYXBpJztcblxuY29uc3QgaW5qZWN0RGF0YSA9ICgpID0+IHtcbiAgY29uc3QgY2l0eVRvU2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNpdHlzZWFyY2gnKTtcbiAgY29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3J1bnNlYXJjaCcpO1xuXG4gIGZ1bmN0aW9uIGZpeFNwZWNpYWxDaGFycygpIHtcbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIG5lZWRlZCwgYXMgd2VhdGhlckFQSSBwYXJzZXMgY2hhcmFjdGVycyBsaWtlIMO2w6TDpSBiYWRseVxuICAgIGxldCBjaXR5VmFsdWUgPSBjaXR5VG9TZWFyY2gudmFsdWUudG9Mb3dlckNhc2UoKS5zcGxpdCgnJyk7XG4gICAgbGV0IGl0ZXJhdGVkQ2l0eSA9IFtdO1xuICAgIGNpdHlWYWx1ZS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBpZiAoZWxlbWVudCA9PT0gJ8O2Jykge1xuICAgICAgICBpdGVyYXRlZENpdHkucHVzaCgnbycpO1xuICAgICAgfSBlbHNlIGlmIChlbGVtZW50ID09PSAnw6QnKSB7XG4gICAgICAgIGl0ZXJhdGVkQ2l0eS5wdXNoKCdhJyk7XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgPT09ICfDpScpIHtcbiAgICAgICAgaXRlcmF0ZWRDaXR5LnB1c2goJ2EnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZXJhdGVkQ2l0eS5wdXNoKGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHBhcnNlZENpdHkgPSBpdGVyYXRlZENpdHkuam9pbignJyk7XG4gICAgcmV0dXJuIHBhcnNlZENpdHk7XG4gIH1cblxuICBzZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiBydW5TZWFyY2goKSB7XG4gICAgY29uc3Qgc2VhcmNQYXJhbWV0ZXIgPSBmaXhTcGVjaWFsQ2hhcnMoKTtcbiAgICBmZXRjaFdlYXRoZXIoc2VhcmNQYXJhbWV0ZXIpO1xuICAgIGNpdHlUb1NlYXJjaC52YWx1ZSA9ICcnO1xuICB9KTtcblxuICBjaXR5VG9TZWFyY2guYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBmdW5jdGlvbiBydW5TZWFyY2goZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICBjb25zdCBzZWFyY1BhcmFtZXRlciA9IGZpeFNwZWNpYWxDaGFycygpO1xuICAgICAgZmV0Y2hXZWF0aGVyKHNlYXJjUGFyYW1ldGVyKTtcbiAgICAgIGNpdHlUb1NlYXJjaC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBpbmplY3REYXRhO1xuIiwiaW1wb3J0IGZldGNoV2VhdGhlciBmcm9tICcuL2FwaSc7XG5cbmNvbnN0IHVzZXJMb2NhdG9yID0gYXN5bmMgKCkgPT4ge1xuICBmdW5jdGlvbiBzdWNjZXNzKHBvcykge1xuICAgIGNvbnN0IHVzZXJMb2NhdGlvbiA9IHBvcy5jb29yZHM7XG4gICAgZmV0Y2hXZWF0aGVyKGAke3VzZXJMb2NhdGlvbi5sYXRpdHVkZX0sJHt1c2VyTG9jYXRpb24ubG9uZ2l0dWRlfWApO1xuICB9XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgZW5hYmxlSGlnaEFjY3VyYWN5OiB0cnVlLFxuICAgIHRpbWVvdXQ6IDUwMDAsXG4gICAgbWF4aW11bUFnZTogMCxcbiAgfTtcblxuICBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICBjb25zb2xlLndhcm4oYEVSUk9SKCR7ZXJyLmNvZGV9KTogJHtlcnIubWVzc2FnZX1gKTtcbiAgfVxuICB0cnkge1xuICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oc3VjY2VzcywgZXJyb3IsIG9wdGlvbnMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlckxvY2F0b3I7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmctdG9wOiA0MHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDgwcHg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxufVxcblxcbmJvZHkge1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIG1hcmdpbjogYXV0bztcXG4gIG1heC13aWR0aDogMTA5MHB4O1xcbiAgY29sb3I6ICM0NjQxMzY7XFxuICBmb250LWZhbWlseTogcm9ib3RvLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdPcGVuIFNhbnMnLFxcbiAgICAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmO1xcbiAgYmFja2dyb3VuZDogcmdiKDIzOCwgMTc0LCAyMDIpO1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxcbiAgICA5MGRlZyxcXG4gICAgcmdiYSgyMzgsIDE3NCwgMjAyLCAxKSAwJSxcXG4gICAgcmdiYSgxNDgsIDE4NywgMjMzLCAxKSAxMDAlXFxuICApO1xcbn1cXG5cXG4ubWFpbkhlYWRpbmcge1xcbiAgbWFyZ2luLWxlZnQ6IC0yJTtcXG59XFxuXFxuLmhlYWRlclJpZ2h0U2lkZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zY2FsZUNoYW5nZXIge1xcbiAgcGFkZGluZy1yaWdodDogMTBweDtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmMzYTU7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMjVweDtcXG4gIGJveC1zaGFkb3c6IHJnYmEoNTAsIDUwLCA5MywgMC4yNSkgMHB4IDJweCA1cHggLTFweCxcXG4gICAgcmdiYSgwLCAwLCAwLCAwLjMpIDBweCAxcHggM3B4IC0xcHg7XFxufVxcblxcbi5jaXR5c2VhcmNoIHtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICBwYWRkaW5nLWxlZnQ6IDE1cHg7XFxuXFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAyNXB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xcbiAgYm94LXNoYWRvdzogcmdiYSg1MCwgNTAsIDkzLCAwLjI1KSAwcHggMnB4IDVweCAtMXB4LFxcbiAgICByZ2JhKDAsIDAsIDAsIDAuMykgMHB4IDFweCAzcHggLTFweDtcXG59XFxuXFxuaW5wdXQ6aG92ZXIge1xcbiAgYm94LXNoYWRvdzogcmdiKDI0NywgMjQ3LCAyNDcpIDBweCAycHggNnB4IC0xcHgsXFxuICAgIHJnYmEoMCwgMCwgMCwgMC4zKSAwcHggMXB4IDNweCAtMXB4O1xcbn1cXG5cXG5pbnB1dDpmb2N1cyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmRmZmY0O1xcbiAgb3V0bGluZTogMXB4IHNvbGlkIHJnYigyNDcsIDI0NywgMjQ3KTtcXG4gIG91dGxpbmUtb2Zmc2V0OiAxcHg7XFxufVxcblxcbm1haW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4ubWFpbkNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZmxleC1ncm93OiAxO1xcbn1cXG5cXG4uY3VycmVudFdlYXRoZXJDb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBmbGV4LWdyb3c6IDE7XFxufVxcblxcbi5iYXNpYy1kYXRhIHtcXG4gIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIHBhZGRpbmc6IDMlO1xcbiAgLyogRnJvbSBodHRwczovL2Nzcy5nbGFzcyAqL1xcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIzKTtcXG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XFxuICBib3gtc2hhZG93OiAwIDRweCAzMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig3LjZweCk7XFxuICAtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cig3LjZweCk7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpO1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4uYWRkaXRpb25hbC1kYXRhIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgbWFyZ2luLXJpZ2h0OiAxJTtcXG4gIG1heC13aWR0aDogNDAwcHg7XFxufVxcblxcbi5hZGRpdGlvbmFsLWRhdGEgPiBkaXYge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgd2lkdGg6IDEwNXB4O1xcbiAgaGVpZ2h0OiAxMDVweDtcXG4gIG1hcmdpbi1sZWZ0OiAyMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICAvKiBGcm9tIGh0dHBzOi8vY3NzLmdsYXNzICovXFxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDgyKTtcXG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XFxuICBib3gtc2hhZG93OiAwIDRweCAzMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig3LjZweCk7XFxuICAtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cig3LjZweCk7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDQ4KTtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuLmljb25BbmREYXRhIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogc21hbGw7XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbn1cXG5cXG4udG9wUm93IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbiNjdXJyZW50VGVtcHRlcmF0dXJlIHtcXG4gIGZvbnQtc2l6ZTogNDRweDtcXG59XFxuXFxuI2N1cnJlbnREZXNjcmlwdGlvbiB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW4tdG9wOiAtMTBweDtcXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XFxuICBmb250LXNpemU6IDIwcHg7XFxufVxcblxcbiNjaXR5LFxcbiNjb3VudHJ5IHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogc21hbGxlcjtcXG59XFxuXFxuLmZvcmVjYXN0Q29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgbWFyZ2luLXRvcDogMzAlO1xcbiAgZmxleC1ncm93OiAxO1xcbn1cXG5cXG4uZm9yZWNhc3Qge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4uZm9yZWNhc3RDYXJkcyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxufVxcblxcbi5mb3JlY2FzdENhcmRzID4gZGl2IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1pbi13aWR0aDogMTAwcHg7XFxuICBtYXgtd2lkdGg6IDEyMHB4O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIHBhZGRpbmctYm90dG9tOiAxNXB4O1xcbiAgbWFyZ2luOiA1cHg7XFxuICAvKiBGcm9tIGh0dHBzOi8vY3NzLmdsYXNzICovXFxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDgyKTtcXG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XFxuICBib3gtc2hhZG93OiAwIDRweCAzMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig3LjZweCk7XFxuICAtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cig3LjZweCk7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDQ4KTtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuLnRlbXBzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBtYXgtd2lkdGg6IDgwJTtcXG59XFxuXFxuLnRlbXBlcmF0dXJlLFxcbi5kZXNjcmlwdGlvbixcXG4udGVtcGVyYXR1cmVMb3cge1xcbiAgbWFyZ2luOiAxJTtcXG4gIGZvbnQtc2l6ZTogc21hbGw7XFxufVxcblxcbi5kZXNjcmlwdGlvbiB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIG1heC13aWR0aDogbWF4LWNvbnRlbnQ7XFxufVxcblxcbmZvb3RlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgbWFyZ2luLXRvcDogYXV0bztcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBmb250LXNpemU6IHNtYWxsZXI7XFxufVxcblxcbmE6bGluayB7XFxuICBjb2xvcjogI2ZmYzNhNTtcXG59XFxuXFxuYTp2aXNpdGVkIHtcXG4gIGNvbG9yOiByZ2IoMTU1LCA2NywgMTA1KTtcXG59XFxuXFxuYTpob3ZlciB7XFxuICBjb2xvcjogcmdiKDIyNiwgODksIDE0OCk7XFxufVxcblxcbmE6YWN0aXZlIHtcXG4gIGNvbG9yOiByZ2JhKDE0OCwgMTg3LCAyMzMsIDEpO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgLmJhc2ljLWRhdGEge1xcbiAgICB3aWR0aDogODUlO1xcbiAgfVxcbiAgLmN1cnJlbnRXZWF0aGVyQ29udGFpbmVyLFxcbiAgLmFkZGl0aW9uYWwtZGF0YSB7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBtYXJnaW4tcmlnaHQ6IDBweDtcXG4gIH1cXG4gIC5hZGRpdGlvbmFsLWRhdGEgPiBkaXYsXFxuICAuZm9yZWNhc3RDYXJkcyA+IGRpdiB7XFxuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXG4gIH1cXG4gIC5hZGRpdGlvbmFsLWRhdGEgPiBkaXYge1xcbiAgICBtYXgtd2lkdGg6IDEwMHB4O1xcbiAgfVxcbiAgLmZvcmVjYXN0Q29udGFpbmVyIHtcXG4gICAgbWFyZ2luLXRvcDogYXV0bztcXG4gIH1cXG4gIHAge1xcbiAgICBtYXJnaW4tdG9wOiA1cHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXG4gIH1cXG4gIGZvb3RlciB7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gIH1cXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsNkJBQTZCO0VBQzdCLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsb0JBQW9CO0VBQ3BCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZDtnQ0FDOEI7RUFDOUIsOEJBQThCO0VBQzlCOzs7O0dBSUM7QUFDSDs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGVBQWU7RUFDZixhQUFhO0VBQ2IsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQjt1Q0FDcUM7QUFDdkM7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsYUFBYTtFQUNiLGtCQUFrQjs7RUFFbEIsWUFBWTtFQUNaLG1CQUFtQjtFQUNu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ICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcGFkZGluZy10b3A6IDQwcHg7XFxuICBwYWRkaW5nLWJvdHRvbTogODBweDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG59XFxuXFxuYm9keSB7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgbWF4LXdpZHRoOiAxMDkwcHg7XFxuICBjb2xvcjogIzQ2NDEzNjtcXG4gIGZvbnQtZmFtaWx5OiByb2JvdG8sIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ09wZW4gU2FucycsXFxuICAgICdIZWx2ZXRpY2EgTmV1ZScsIHNhbnMtc2VyaWY7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjM4LCAxNzQsIDIwMik7XFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgIDkwZGVnLFxcbiAgICByZ2JhKDIzOCwgMTc0LCAyMDIsIDEpIDAlLFxcbiAgICByZ2JhKDE0OCwgMTg3LCAyMzMsIDEpIDEwMCVcXG4gICk7XFxufVxcblxcbi5tYWluSGVhZGluZyB7XFxuICBtYXJnaW4tbGVmdDogLTIlO1xcbn1cXG5cXG4uaGVhZGVyUmlnaHRTaWRlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnNjYWxlQ2hhbmdlciB7XFxuICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xcbn1cXG5cXG5idXR0b24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYzNhNTtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAyNXB4O1xcbiAgYm94LXNoYWRvdzogcmdiYSg1MCwgNTAsIDkzLCAwLjI1KSAwcHggMnB4IDVweCAtMXB4LFxcbiAgICByZ2JhKDAsIDAsIDAsIDAuMykgMHB4IDFweCAzcHggLTFweDtcXG59XFxuXFxuLmNpdHlzZWFyY2gge1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIHBhZGRpbmctbGVmdDogMTVweDtcXG5cXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XFxuICBib3gtc2hhZG93OiByZ2JhKDUwLCA1MCwgOTMsIDAuMjUpIDBweCAycHggNXB4IC0xcHgsXFxuICAgIHJnYmEoMCwgMCwgMCwgMC4zKSAwcHggMXB4IDNweCAtMXB4O1xcbn1cXG5cXG5pbnB1dDpob3ZlciB7XFxuICBib3gtc2hhZG93OiByZ2IoMjQ3LCAyNDcsIDI0NykgMHB4IDJweCA2cHggLTFweCxcXG4gICAgcmdiYSgwLCAwLCAwLCAwLjMpIDBweCAxcHggM3B4IC0xcHg7XFxufVxcblxcbmlucHV0OmZvY3VzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZGZmZjQ7XFxuICBvdXRsaW5lOiAxcHggc29saWQgcmdiKDI0NywgMjQ3LCAyNDcpO1xcbiAgb3V0bGluZS1vZmZzZXQ6IDFweDtcXG59XFxuXFxubWFpbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5tYWluQ29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBmbGV4LWdyb3c6IDE7XFxufVxcblxcbi5jdXJyZW50V2VhdGhlckNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGZsZXgtZ3JvdzogMTtcXG59XFxuXFxuLmJhc2ljLWRhdGEge1xcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgcGFkZGluZzogMyU7XFxuICAvKiBGcm9tIGh0dHBzOi8vY3NzLmdsYXNzICovXFxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjMpO1xcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcXG4gIGJveC1zaGFkb3c6IDAgNHB4IDMwcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDcuNnB4KTtcXG4gIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDcuNnB4KTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSk7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcblxcbi5hZGRpdGlvbmFsLWRhdGEge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICBtYXJnaW4tcmlnaHQ6IDElO1xcbiAgbWF4LXdpZHRoOiA0MDBweDtcXG59XFxuXFxuLmFkZGl0aW9uYWwtZGF0YSA+IGRpdiB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB3aWR0aDogMTA1cHg7XFxuICBoZWlnaHQ6IDEwNXB4O1xcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgcGFkZGluZzogMjBweDtcXG4gIC8qIEZyb20gaHR0cHM6Ly9jc3MuZ2xhc3MgKi9cXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wODIpO1xcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcXG4gIGJveC1zaGFkb3c6IDAgNHB4IDMwcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDcuNnB4KTtcXG4gIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDcuNnB4KTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNDgpO1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4uaWNvbkFuZERhdGEge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiBzbWFsbDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbi50b3BSb3cge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuI2N1cnJlbnRUZW1wdGVyYXR1cmUge1xcbiAgZm9udC1zaXplOiA0NHB4O1xcbn1cXG5cXG4jY3VycmVudERlc2NyaXB0aW9uIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1hcmdpbi10b3A6IC0xMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG59XFxuXFxuI2NpdHksXFxuI2NvdW50cnkge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiBzbWFsbGVyO1xcbn1cXG5cXG4uZm9yZWNhc3RDb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBtYXJnaW4tdG9wOiAzMCU7XFxuICBmbGV4LWdyb3c6IDE7XFxufVxcblxcbi5mb3JlY2FzdCB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5mb3JlY2FzdENhcmRzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG59XFxuXFxuLmZvcmVjYXN0Q2FyZHMgPiBkaXYge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWluLXdpZHRoOiAxMDBweDtcXG4gIG1heC13aWR0aDogMTIwcHg7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgcGFkZGluZy1ib3R0b206IDE1cHg7XFxuICBtYXJnaW46IDVweDtcXG4gIC8qIEZyb20gaHR0cHM6Ly9jc3MuZ2xhc3MgKi9cXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wODIpO1xcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcXG4gIGJveC1zaGFkb3c6IDAgNHB4IDMwcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDcuNnB4KTtcXG4gIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDcuNnB4KTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNDgpO1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4udGVtcHMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIG1heC13aWR0aDogODAlO1xcbn1cXG5cXG4udGVtcGVyYXR1cmUsXFxuLmRlc2NyaXB0aW9uLFxcbi50ZW1wZXJhdHVyZUxvdyB7XFxuICBtYXJnaW46IDElO1xcbiAgZm9udC1zaXplOiBzbWFsbDtcXG59XFxuXFxuLmRlc2NyaXB0aW9uIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgbWF4LXdpZHRoOiBtYXgtY29udGVudDtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgcGFkZGluZzogMjBweDtcXG4gIGZvbnQtc2l6ZTogc21hbGxlcjtcXG59XFxuXFxuYTpsaW5rIHtcXG4gIGNvbG9yOiAjZmZjM2E1O1xcbn1cXG5cXG5hOnZpc2l0ZWQge1xcbiAgY29sb3I6IHJnYigxNTUsIDY3LCAxMDUpO1xcbn1cXG5cXG5hOmhvdmVyIHtcXG4gIGNvbG9yOiByZ2IoMjI2LCA4OSwgMTQ4KTtcXG59XFxuXFxuYTphY3RpdmUge1xcbiAgY29sb3I6IHJnYmEoMTQ4LCAxODcsIDIzMywgMSk7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAuYmFzaWMtZGF0YSB7XFxuICAgIHdpZHRoOiA4NSU7XFxuICB9XFxuICAuY3VycmVudFdlYXRoZXJDb250YWluZXIsXFxuICAuYWRkaXRpb25hbC1kYXRhIHtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIG1hcmdpbi1yaWdodDogMHB4O1xcbiAgfVxcbiAgLmFkZGl0aW9uYWwtZGF0YSA+IGRpdixcXG4gIC5mb3JlY2FzdENhcmRzID4gZGl2IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbiAgfVxcbiAgLmFkZGl0aW9uYWwtZGF0YSA+IGRpdiB7XFxuICAgIG1heC13aWR0aDogMTAwcHg7XFxuICB9XFxuICAuZm9yZWNhc3RDb250YWluZXIge1xcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgfVxcbiAgcCB7XFxuICAgIG1hcmdpbi10b3A6IDVweDtcXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbiAgfVxcbiAgZm9vdGVyIHtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwidmFyIG1hcCA9IHtcblx0XCIuL2Jhcm9tZXRlci5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvYmFyb21ldGVyLnN2Z1wiLFxuXHRcIi4vY2Vsc2l1cy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvY2Vsc2l1cy5zdmdcIixcblx0XCIuL2NsZWFyLWRheS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvY2xlYXItZGF5LnN2Z1wiLFxuXHRcIi4vY2xlYXItbmlnaHQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2NsZWFyLW5pZ2h0LnN2Z1wiLFxuXHRcIi4vY2xvdWR5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9jbG91ZHkuc3ZnXCIsXG5cdFwiLi9jb21wYXNzLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9jb21wYXNzLnN2Z1wiLFxuXHRcIi4vZHJpenpsZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvZHJpenpsZS5zdmdcIixcblx0XCIuL2R1c3QtZGF5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9kdXN0LWRheS5zdmdcIixcblx0XCIuL2R1c3QtbmlnaHQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2R1c3QtbmlnaHQuc3ZnXCIsXG5cdFwiLi9kdXN0LXdpbmQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2R1c3Qtd2luZC5zdmdcIixcblx0XCIuL2R1c3Quc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2R1c3Quc3ZnXCIsXG5cdFwiLi9mYWhyZW5oZWl0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9mYWhyZW5oZWl0LnN2Z1wiLFxuXHRcIi4vZmFsbGluZy1zdGFycy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvZmFsbGluZy1zdGFycy5zdmdcIixcblx0XCIuL2ZvZy1kYXkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2ZvZy1kYXkuc3ZnXCIsXG5cdFwiLi9mb2ctbmlnaHQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2ZvZy1uaWdodC5zdmdcIixcblx0XCIuL2ZvZy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvZm9nLnN2Z1wiLFxuXHRcIi4vaGFpbC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvaGFpbC5zdmdcIixcblx0XCIuL2hhemUtZGF5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9oYXplLWRheS5zdmdcIixcblx0XCIuL2hhemUtbmlnaHQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2hhemUtbmlnaHQuc3ZnXCIsXG5cdFwiLi9oYXplLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9oYXplLnN2Z1wiLFxuXHRcIi4vaG9yaXpvbi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvaG9yaXpvbi5zdmdcIixcblx0XCIuL2h1bWlkaXR5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9odW1pZGl0eS5zdmdcIixcblx0XCIuL2h1cnJpY2FuZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvaHVycmljYW5lLnN2Z1wiLFxuXHRcIi4vbGlnaHRuaW5nLWJvbHQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL2xpZ2h0bmluZy1ib2x0LnN2Z1wiLFxuXHRcIi4vbWlzdC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvbWlzdC5zdmdcIixcblx0XCIuL21vb24tZmlyc3QtcXVhcnRlci5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvbW9vbi1maXJzdC1xdWFydGVyLnN2Z1wiLFxuXHRcIi4vbW9vbi1mdWxsLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9tb29uLWZ1bGwuc3ZnXCIsXG5cdFwiLi9tb29uLWxhc3QtcXVhcnRlci5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvbW9vbi1sYXN0LXF1YXJ0ZXIuc3ZnXCIsXG5cdFwiLi9tb29uLW5ldy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvbW9vbi1uZXcuc3ZnXCIsXG5cdFwiLi9tb29uLXdhbmluZy1jcmVzY2VudC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvbW9vbi13YW5pbmctY3Jlc2NlbnQuc3ZnXCIsXG5cdFwiLi9tb29uLXdhbmluZy1naWJib3VzLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9tb29uLXdhbmluZy1naWJib3VzLnN2Z1wiLFxuXHRcIi4vbW9vbi13YXhpbmctY3Jlc2NlbnQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL21vb24td2F4aW5nLWNyZXNjZW50LnN2Z1wiLFxuXHRcIi4vbW9vbi13YXhpbmctZ2liYm91cy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvbW9vbi13YXhpbmctZ2liYm91cy5zdmdcIixcblx0XCIuL21vb25yaXNlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9tb29ucmlzZS5zdmdcIixcblx0XCIuL21vb25zZXQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL21vb25zZXQuc3ZnXCIsXG5cdFwiLi9ub3QtYXZhaWxhYmxlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9ub3QtYXZhaWxhYmxlLnN2Z1wiLFxuXHRcIi4vb3ZlcmNhc3QtZGF5LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9vdmVyY2FzdC1kYXkuc3ZnXCIsXG5cdFwiLi9vdmVyY2FzdC1uaWdodC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvb3ZlcmNhc3QtbmlnaHQuc3ZnXCIsXG5cdFwiLi9vdmVyY2FzdC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvb3ZlcmNhc3Quc3ZnXCIsXG5cdFwiLi9wYXJ0bHktY2xvdWR5LWRheS1kcml6emxlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wYXJ0bHktY2xvdWR5LWRheS1kcml6emxlLnN2Z1wiLFxuXHRcIi4vcGFydGx5LWNsb3VkeS1kYXktZm9nLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wYXJ0bHktY2xvdWR5LWRheS1mb2cuc3ZnXCIsXG5cdFwiLi9wYXJ0bHktY2xvdWR5LWRheS1oYWlsLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wYXJ0bHktY2xvdWR5LWRheS1oYWlsLnN2Z1wiLFxuXHRcIi4vcGFydGx5LWNsb3VkeS1kYXktaGF6ZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcGFydGx5LWNsb3VkeS1kYXktaGF6ZS5zdmdcIixcblx0XCIuL3BhcnRseS1jbG91ZHktZGF5LXJhaW4uc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3BhcnRseS1jbG91ZHktZGF5LXJhaW4uc3ZnXCIsXG5cdFwiLi9wYXJ0bHktY2xvdWR5LWRheS1zbGVldC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcGFydGx5LWNsb3VkeS1kYXktc2xlZXQuc3ZnXCIsXG5cdFwiLi9wYXJ0bHktY2xvdWR5LWRheS1zbW9rZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcGFydGx5LWNsb3VkeS1kYXktc21va2Uuc3ZnXCIsXG5cdFwiLi9wYXJ0bHktY2xvdWR5LWRheS1zbm93LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wYXJ0bHktY2xvdWR5LWRheS1zbm93LnN2Z1wiLFxuXHRcIi4vcGFydGx5LWNsb3VkeS1kYXkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3BhcnRseS1jbG91ZHktZGF5LnN2Z1wiLFxuXHRcIi4vcGFydGx5LWNsb3VkeS1uaWdodC1kcml6emxlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wYXJ0bHktY2xvdWR5LW5pZ2h0LWRyaXp6bGUuc3ZnXCIsXG5cdFwiLi9wYXJ0bHktY2xvdWR5LW5pZ2h0LWZvZy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcGFydGx5LWNsb3VkeS1uaWdodC1mb2cuc3ZnXCIsXG5cdFwiLi9wYXJ0bHktY2xvdWR5LW5pZ2h0LWhhaWwuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3BhcnRseS1jbG91ZHktbmlnaHQtaGFpbC5zdmdcIixcblx0XCIuL3BhcnRseS1jbG91ZHktbmlnaHQtaGF6ZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcGFydGx5LWNsb3VkeS1uaWdodC1oYXplLnN2Z1wiLFxuXHRcIi4vcGFydGx5LWNsb3VkeS1uaWdodC1yYWluLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wYXJ0bHktY2xvdWR5LW5pZ2h0LXJhaW4uc3ZnXCIsXG5cdFwiLi9wYXJ0bHktY2xvdWR5LW5pZ2h0LXNsZWV0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wYXJ0bHktY2xvdWR5LW5pZ2h0LXNsZWV0LnN2Z1wiLFxuXHRcIi4vcGFydGx5LWNsb3VkeS1uaWdodC1zbW9rZS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcGFydGx5LWNsb3VkeS1uaWdodC1zbW9rZS5zdmdcIixcblx0XCIuL3BhcnRseS1jbG91ZHktbmlnaHQtc25vdy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcGFydGx5LWNsb3VkeS1uaWdodC1zbm93LnN2Z1wiLFxuXHRcIi4vcGFydGx5LWNsb3VkeS1uaWdodC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvcGFydGx5LWNsb3VkeS1uaWdodC5zdmdcIixcblx0XCIuL3ByZXNzdXJlLWhpZ2gtYWx0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wcmVzc3VyZS1oaWdoLWFsdC5zdmdcIixcblx0XCIuL3ByZXNzdXJlLWhpZ2guc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3ByZXNzdXJlLWhpZ2guc3ZnXCIsXG5cdFwiLi9wcmVzc3VyZS1sb3ctYWx0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wcmVzc3VyZS1sb3ctYWx0LnN2Z1wiLFxuXHRcIi4vcHJlc3N1cmUtbG93LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9wcmVzc3VyZS1sb3cuc3ZnXCIsXG5cdFwiLi9yYWluLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9yYWluLnN2Z1wiLFxuXHRcIi4vcmFpbmRyb3Auc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3JhaW5kcm9wLnN2Z1wiLFxuXHRcIi4vcmFpbmRyb3BzLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9yYWluZHJvcHMuc3ZnXCIsXG5cdFwiLi9zbGVldC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvc2xlZXQuc3ZnXCIsXG5cdFwiLi9zbW9rZS1wYXJ0aWNsZXMuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3Ntb2tlLXBhcnRpY2xlcy5zdmdcIixcblx0XCIuL3Ntb2tlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9zbW9rZS5zdmdcIixcblx0XCIuL3Nub3cuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3Nub3cuc3ZnXCIsXG5cdFwiLi9zbm93Zmxha2Uuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3Nub3dmbGFrZS5zdmdcIixcblx0XCIuL3NvbGFyLWVjbGlwc2Uuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3NvbGFyLWVjbGlwc2Uuc3ZnXCIsXG5cdFwiLi9zdGFyLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9zdGFyLnN2Z1wiLFxuXHRcIi4vc3RhcnJ5LW5pZ2h0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9zdGFycnktbmlnaHQuc3ZnXCIsXG5cdFwiLi9zdW5yaXNlLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9zdW5yaXNlLnN2Z1wiLFxuXHRcIi4vc3Vuc2V0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC9zdW5zZXQuc3ZnXCIsXG5cdFwiLi90aGVybW9tZXRlci1jZWxzaXVzLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC90aGVybW9tZXRlci1jZWxzaXVzLnN2Z1wiLFxuXHRcIi4vdGhlcm1vbWV0ZXItY29sZGVyLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC90aGVybW9tZXRlci1jb2xkZXIuc3ZnXCIsXG5cdFwiLi90aGVybW9tZXRlci1mYWhyZW5oZWl0LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC90aGVybW9tZXRlci1mYWhyZW5oZWl0LnN2Z1wiLFxuXHRcIi4vdGhlcm1vbWV0ZXItZ2xhc3MtY2Vsc2l1cy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdGhlcm1vbWV0ZXItZ2xhc3MtY2Vsc2l1cy5zdmdcIixcblx0XCIuL3RoZXJtb21ldGVyLWdsYXNzLWZhaHJlbmhlaXQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3RoZXJtb21ldGVyLWdsYXNzLWZhaHJlbmhlaXQuc3ZnXCIsXG5cdFwiLi90aGVybW9tZXRlci1nbGFzcy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdGhlcm1vbWV0ZXItZ2xhc3Muc3ZnXCIsXG5cdFwiLi90aGVybW9tZXRlci1tZXJjdXJ5LWNvbGQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3RoZXJtb21ldGVyLW1lcmN1cnktY29sZC5zdmdcIixcblx0XCIuL3RoZXJtb21ldGVyLW1lcmN1cnkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3RoZXJtb21ldGVyLW1lcmN1cnkuc3ZnXCIsXG5cdFwiLi90aGVybW9tZXRlci13YXJtZXIuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3RoZXJtb21ldGVyLXdhcm1lci5zdmdcIixcblx0XCIuL3RoZXJtb21ldGVyLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC90aGVybW9tZXRlci5zdmdcIixcblx0XCIuL3RodW5kZXJzdG9ybXMtZGF5LXJhaW4uc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3RodW5kZXJzdG9ybXMtZGF5LXJhaW4uc3ZnXCIsXG5cdFwiLi90aHVuZGVyc3Rvcm1zLWRheS1zbm93LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC90aHVuZGVyc3Rvcm1zLWRheS1zbm93LnN2Z1wiLFxuXHRcIi4vdGh1bmRlcnN0b3Jtcy1kYXkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3RodW5kZXJzdG9ybXMtZGF5LnN2Z1wiLFxuXHRcIi4vdGh1bmRlcnN0b3Jtcy1uaWdodC1yYWluLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC90aHVuZGVyc3Rvcm1zLW5pZ2h0LXJhaW4uc3ZnXCIsXG5cdFwiLi90aHVuZGVyc3Rvcm1zLW5pZ2h0LXNub3cuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3RodW5kZXJzdG9ybXMtbmlnaHQtc25vdy5zdmdcIixcblx0XCIuL3RodW5kZXJzdG9ybXMtbmlnaHQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3RodW5kZXJzdG9ybXMtbmlnaHQuc3ZnXCIsXG5cdFwiLi90aHVuZGVyc3Rvcm1zLXJhaW4uc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3RodW5kZXJzdG9ybXMtcmFpbi5zdmdcIixcblx0XCIuL3RodW5kZXJzdG9ybXMtc25vdy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdGh1bmRlcnN0b3Jtcy1zbm93LnN2Z1wiLFxuXHRcIi4vdGh1bmRlcnN0b3Jtcy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdGh1bmRlcnN0b3Jtcy5zdmdcIixcblx0XCIuL3Rvcm5hZG8uc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3Rvcm5hZG8uc3ZnXCIsXG5cdFwiLi91bWJyZWxsYS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdW1icmVsbGEuc3ZnXCIsXG5cdFwiLi91di1pbmRleC0xLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC91di1pbmRleC0xLnN2Z1wiLFxuXHRcIi4vdXYtaW5kZXgtMTAuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3V2LWluZGV4LTEwLnN2Z1wiLFxuXHRcIi4vdXYtaW5kZXgtMTEuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3V2LWluZGV4LTExLnN2Z1wiLFxuXHRcIi4vdXYtaW5kZXgtMi5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdXYtaW5kZXgtMi5zdmdcIixcblx0XCIuL3V2LWluZGV4LTMuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3V2LWluZGV4LTMuc3ZnXCIsXG5cdFwiLi91di1pbmRleC00LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC91di1pbmRleC00LnN2Z1wiLFxuXHRcIi4vdXYtaW5kZXgtNS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdXYtaW5kZXgtNS5zdmdcIixcblx0XCIuL3V2LWluZGV4LTYuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3V2LWluZGV4LTYuc3ZnXCIsXG5cdFwiLi91di1pbmRleC03LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC91di1pbmRleC03LnN2Z1wiLFxuXHRcIi4vdXYtaW5kZXgtOC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdXYtaW5kZXgtOC5zdmdcIixcblx0XCIuL3V2LWluZGV4LTkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3V2LWluZGV4LTkuc3ZnXCIsXG5cdFwiLi91di1pbmRleC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvdXYtaW5kZXguc3ZnXCIsXG5cdFwiLi93aW5kLWJlYXVmb3J0LTAuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3dpbmQtYmVhdWZvcnQtMC5zdmdcIixcblx0XCIuL3dpbmQtYmVhdWZvcnQtMS5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvd2luZC1iZWF1Zm9ydC0xLnN2Z1wiLFxuXHRcIi4vd2luZC1iZWF1Zm9ydC0xMC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvd2luZC1iZWF1Zm9ydC0xMC5zdmdcIixcblx0XCIuL3dpbmQtYmVhdWZvcnQtMTEuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3dpbmQtYmVhdWZvcnQtMTEuc3ZnXCIsXG5cdFwiLi93aW5kLWJlYXVmb3J0LTEyLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC93aW5kLWJlYXVmb3J0LTEyLnN2Z1wiLFxuXHRcIi4vd2luZC1iZWF1Zm9ydC0yLnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC93aW5kLWJlYXVmb3J0LTIuc3ZnXCIsXG5cdFwiLi93aW5kLWJlYXVmb3J0LTMuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3dpbmQtYmVhdWZvcnQtMy5zdmdcIixcblx0XCIuL3dpbmQtYmVhdWZvcnQtNC5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvd2luZC1iZWF1Zm9ydC00LnN2Z1wiLFxuXHRcIi4vd2luZC1iZWF1Zm9ydC01LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC93aW5kLWJlYXVmb3J0LTUuc3ZnXCIsXG5cdFwiLi93aW5kLWJlYXVmb3J0LTYuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3dpbmQtYmVhdWZvcnQtNi5zdmdcIixcblx0XCIuL3dpbmQtYmVhdWZvcnQtNy5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvd2luZC1iZWF1Zm9ydC03LnN2Z1wiLFxuXHRcIi4vd2luZC1iZWF1Zm9ydC04LnN2Z1wiOiBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC93aW5kLWJlYXVmb3J0LTguc3ZnXCIsXG5cdFwiLi93aW5kLWJlYXVmb3J0LTkuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3dpbmQtYmVhdWZvcnQtOS5zdmdcIixcblx0XCIuL3dpbmQuc3ZnXCI6IFwiLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsL3dpbmQuc3ZnXCIsXG5cdFwiLi93aW5kc29jay5zdmdcIjogXCIuL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvd2luZHNvY2suc3ZnXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbCBzeW5jIFxcXFwuKHBuZyU3Q2pwZT9nJTdDc3ZnKSRcIjsiXSwibmFtZXMiOlsiaW5qZWN0RGF0YSIsInVzZXJMb2NhdG9yIiwidXBkYXRlRGlzcGxheSIsImZldGNoV2VhdGhlciIsImxvY2F0aW9uIiwic2VhcmNoV2l0aENpdHkiLCJ1bmRlZmluZWQiLCJyZXNwb25zZSIsImZldGNoIiwicmVzcG9uc2VEYXRhIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsIndlYXRoZXJKU09OIiwicmVxdWlyZSIsImltcG9ydEljb25zIiwiciIsImljb25zIiwia2V5cyIsIm1hcCIsIml0ZW0iLCJyZXBsYWNlIiwiY29udGV4dCIsIndlYXRoZXJEYXRhIiwidGVtcHRlcmF0dXJlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZGVzY3JpcHRpb24iLCJjaXR5IiwiY291bnRyeSIsImN1cnJlbnRJY29uIiwiaHVtaWRpdHkiLCJhaXJQcmVzc3VyZVZhbHVlIiwiY2hhbmNlT2ZSYWluVmFsdWUiLCJ3aW5kU3BlZWRWYWx1ZSIsImxvYWRTdGF0aWNJY29ucyIsImh1bWlkaXR5SWNvbiIsImFpclByZXNzdXJlSWNvbiIsImNoYW5jZU9mUmFpbkljb24iLCJ3aW5kU3BlZWRJY29uIiwiY2VsY2l1c0ljb24iLCJzcmMiLCJ1cGRhdGVOb3ciLCJ0ZXh0Q29udGVudCIsIk1hdGgiLCJyb3VuZCIsImN1cnJlbnQiLCJ0ZW1wX2MiLCJuYW1lIiwicmVnaW9uIiwiY29uZGl0aW9uIiwidGV4dCIsInByZXNzdXJlX21iIiwiZm9yZWNhc3QiLCJmb3JlY2FzdGRheSIsImRheSIsImRhaWx5X2NoYW5jZV9vZl9yYWluIiwid2luZF9rcGgiLCJ1cGRhdGVJY29ucyIsIndlYXRoZXJJY29ucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpIiwibGVuZ3RoIiwiaWNvbiIsImZpbmQiLCJjb2RlIiwiaXNfZGF5IiwibmlnaHQiLCJ1cGRhdGVGb3JlY2FzdCIsImZvcmVjYXN0VGVtcHMiLCJmb3JlY2FzdFRlbXBzTG93IiwiZm9yZWNhc3REZXNjcmlwdGlvbiIsImlubmVyVGV4dCIsIm1heHRlbXBfYyIsIm1pbnRlbXBfYyIsImNpdHlUb1NlYXJjaCIsInNlYXJjaEJ0biIsImZpeFNwZWNpYWxDaGFycyIsImNpdHlWYWx1ZSIsInZhbHVlIiwidG9Mb3dlckNhc2UiLCJzcGxpdCIsIml0ZXJhdGVkQ2l0eSIsImZvckVhY2giLCJlbGVtZW50IiwicHVzaCIsInBhcnNlZENpdHkiLCJqb2luIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJ1blNlYXJjaCIsInNlYXJjUGFyYW1ldGVyIiwiZXZlbnQiLCJrZXkiLCJzdWNjZXNzIiwicG9zIiwidXNlckxvY2F0aW9uIiwiY29vcmRzIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJvcHRpb25zIiwiZW5hYmxlSGlnaEFjY3VyYWN5IiwidGltZW91dCIsIm1heGltdW1BZ2UiLCJlcnIiLCJ3YXJuIiwibWVzc2FnZSIsIm5hdmlnYXRvciIsImdlb2xvY2F0aW9uIiwiZ2V0Q3VycmVudFBvc2l0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==