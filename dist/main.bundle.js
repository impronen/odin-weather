"use strict";
(self["webpackChunkodin_weather"] = self["webpackChunkodin_weather"] || []).push([["main"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/modules/dom.js");
/* harmony import */ var _weatherObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weatherObject */ "./src/modules/weatherObject.js");


const fetchWeather = async location => {
  async function searchWithCity() {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=47db8690ea3e4433803123706232203&q=${location}&days=5`);
      const responseData = await response.json();
      console.log('Searching with search input');
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const weatherJSON = __webpack_require__(/*! ../assets/weather_conditions.json */ "./src/assets/weather_conditions.json");
const updateDisplay = weatherData => {
  const tempterature = document.querySelector('#tempterature');
  const description = document.querySelector('#description');
  const city = document.querySelector('#city');
  const country = document.querySelector('#country');
  const currentIcon = document.querySelector('#currentIcon');
  const humidity = document.querySelector('#humidityValue');
  const airPressure = document.querySelector('#airPressure');
  const chanceOfRain = document.querySelector('#chanceOfRain');
  const windSpeed = document.querySelector('#windSpeed');
  function updateNow() {
    tempterature.textContent = `${weatherData.current.temp_c}C`;
    city.textContent = `${weatherData.location.name}, ${weatherData.location.region}`;
    country.textContent = `${weatherData.location.country}`;
    description.textContent = `${weatherData.current.condition.text}`;
    humidity.textContent = `${weatherData.current.humidity}`;
    airPressure.textContent = `Air pressure: ${weatherData.current.pressure_mb}`;
    chanceOfRain.textContent = `Chance of rain: ${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%`;
    windSpeed.textContent = `Wind speed: ${weatherData.current.wind_kph}/kph`;
  }
  function updateCurrentIcon() {
    const icon = weatherJSON.find(item => item.code === weatherData.current.condition.code);
    if (weatherData.current.is_day === 0) {
      currentIcon.src = `../src/assets/icons/line/all/${icon.night}`;
    } else {
      currentIcon.src = `../src/assets/icons/line/all/${icon.day}`;
    }
    currentIcon.alt = `${weatherData.current.condition.text}`;
  }
  updateNow();
  updateCurrentIcon();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateDisplay);

/***/ }),

/***/ "./src/modules/locator.js":
/*!********************************!*\
  !*** ./src/modules/locator.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
___CSS_LOADER_EXPORT___.push([module.id, "header {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  align-items: center;\n}\n\nbody {\n  margin: auto;\n  max-width: 1090px;\n  color: #27241c;\n  font-family: roboto, -apple-system, BlinkMacSystemFont, 'Open Sans',\n    'Helvetica Neue', sans-serif;\n  background: rgb(238, 174, 202);\n  background: linear-gradient(\n    90deg,\n    rgba(238, 174, 202, 1) 0%,\n    rgba(148, 187, 233, 1) 100%\n  );\n}\n\nheader {\n  padding-top: 5%;\n  padding-bottom: 5%;\n}\n\n.mainHeading {\n  margin-left: -2%;\n}\n\nbutton {\n  background-color: #ffc3a5;\n  font-size: 14px;\n  padding: 15px;\n  border: none;\n  border-radius: 25px;\n  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,\n    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;\n}\n\n.scaleChanger {\n  margin-left: -10%;\n}\n\n.citysearch {\n  font-size: 14px;\n  padding: 15px;\n  padding-left: 15px;\n  padding-right: 15px;\n  border: none;\n  border-radius: 25px;\n  margin-right: 15px;\n  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,\n    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;\n}\n\nmain {\n  display: flex;\n  justify-content: center;\n}\n\n.mainContainer {\n  display: flex;\n  justify-content: center;\n  width: 100%;\n}\n\n.currentWeatherContainer {\n  width: 95%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.basic-data {\n  align-self: flex-start;\n  margin-top: 3%;\n  padding: 3%;\n  /* From https://css.glass */\n  background: rgba(255, 255, 255, 0.23);\n  border-radius: 16px;\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n  backdrop-filter: blur(7.6px);\n  -webkit-backdrop-filter: blur(7.6px);\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  cursor: default;\n}\n\n.additional-data {\n  display: flex;\n  max-width: 30%;\n  flex-wrap: wrap;\n}\n\n.additional-data > div {\n  width: 120px;\n  margin: 10%;\n  padding: 15%;\n  /* From https://css.glass */\n  background: rgba(255, 255, 255, 0.082);\n  border-radius: 16px;\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n  backdrop-filter: blur(7.6px);\n  -webkit-backdrop-filter: blur(7.6px);\n  border: 1px solid rgba(255, 255, 255, 0.048);\n  cursor: default;\n}\n\n.datapoint {\n  display: flex;\n  flex-direction: row;\n}\n\n.topRow {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n}\n\n#tempterature {\n  font-size: 44px;\n}\n\n#description {\n  text-align: center;\n  margin-top: -10px;\n  margin-bottom: 15px;\n  font-size: 20px;\n}\n\n#city,\n#country {\n  text-align: center;\n  font-size: smaller;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,mBAAmB;EACnB,6BAA6B;EAC7B,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,iBAAiB;EACjB,cAAc;EACd;gCAC8B;EAC9B,8BAA8B;EAC9B;;;;GAIC;AACH;;AAEA;EACE,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,yBAAyB;EACzB,eAAe;EACf,aAAa;EACb,YAAY;EACZ,mBAAmB;EACnB;uCACqC;AACvC;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,eAAe;EACf,aAAa;EACb,kBAAkB;EAClB,mBAAmB;EACnB,YAAY;EACZ,mBAAmB;EACnB,kBAAkB;EAClB;uCACqC;AACvC;;AAEA;EACE,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,WAAW;AACb;;AAEA;EACE,UAAU;EACV,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;EACtB,cAAc;EACd,WAAW;EACX,2BAA2B;EAC3B,qCAAqC;EACrC,mBAAmB;EACnB,yCAAyC;EACzC,4BAA4B;EAC5B,oCAAoC;EACpC,2CAA2C;EAC3C,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,YAAY;EACZ,2BAA2B;EAC3B,sCAAsC;EACtC,mBAAmB;EACnB,yCAAyC;EACzC,4BAA4B;EAC5B,oCAAoC;EACpC,4CAA4C;EAC5C,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,6BAA6B;EAC7B,mBAAmB;AACrB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,eAAe;AACjB;;AAEA;;EAEE,kBAAkB;EAClB,kBAAkB;AACpB","sourcesContent":["header {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  align-items: center;\n}\n\nbody {\n  margin: auto;\n  max-width: 1090px;\n  color: #27241c;\n  font-family: roboto, -apple-system, BlinkMacSystemFont, 'Open Sans',\n    'Helvetica Neue', sans-serif;\n  background: rgb(238, 174, 202);\n  background: linear-gradient(\n    90deg,\n    rgba(238, 174, 202, 1) 0%,\n    rgba(148, 187, 233, 1) 100%\n  );\n}\n\nheader {\n  padding-top: 5%;\n  padding-bottom: 5%;\n}\n\n.mainHeading {\n  margin-left: -2%;\n}\n\nbutton {\n  background-color: #ffc3a5;\n  font-size: 14px;\n  padding: 15px;\n  border: none;\n  border-radius: 25px;\n  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,\n    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;\n}\n\n.scaleChanger {\n  margin-left: -10%;\n}\n\n.citysearch {\n  font-size: 14px;\n  padding: 15px;\n  padding-left: 15px;\n  padding-right: 15px;\n  border: none;\n  border-radius: 25px;\n  margin-right: 15px;\n  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,\n    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;\n}\n\nmain {\n  display: flex;\n  justify-content: center;\n}\n\n.mainContainer {\n  display: flex;\n  justify-content: center;\n  width: 100%;\n}\n\n.currentWeatherContainer {\n  width: 95%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.basic-data {\n  align-self: flex-start;\n  margin-top: 3%;\n  padding: 3%;\n  /* From https://css.glass */\n  background: rgba(255, 255, 255, 0.23);\n  border-radius: 16px;\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n  backdrop-filter: blur(7.6px);\n  -webkit-backdrop-filter: blur(7.6px);\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  cursor: default;\n}\n\n.additional-data {\n  display: flex;\n  max-width: 30%;\n  flex-wrap: wrap;\n}\n\n.additional-data > div {\n  width: 120px;\n  margin: 10%;\n  padding: 15%;\n  /* From https://css.glass */\n  background: rgba(255, 255, 255, 0.082);\n  border-radius: 16px;\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n  backdrop-filter: blur(7.6px);\n  -webkit-backdrop-filter: blur(7.6px);\n  border: 1px solid rgba(255, 255, 255, 0.048);\n  cursor: default;\n}\n\n.datapoint {\n  display: flex;\n  flex-direction: row;\n}\n\n.topRow {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n}\n\n#tempterature {\n  font-size: 44px;\n}\n\n#description {\n  text-align: center;\n  margin-top: -10px;\n  margin-bottom: 15px;\n  font-size: 20px;\n}\n\n#city,\n#country {\n  text-align: center;\n  font-size: smaller;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



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

/***/ "./src/assets/weather_conditions.json":
/*!********************************************!*\
  !*** ./src/assets/weather_conditions.json ***!
  \********************************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"code":1000,"day":"clear-day.svg","night":"starry-night.svg"},{"code":1003,"day":"partly-cloudy-day.svg","night":"partly-cloudy-night.svg"},{"code":1006,"day":"cloudy.svg","night":"partly-cloudy-night.svg"},{"code":1009,"day":"overcast.svg","night":"overcast-night.svg","icon":122},{"code":1030,"day":"mist.svg","night":"mist.svg","icon":143},{"code":1063,"day":"partly-cloudy-day-rain.svg","night":"partly-cloudy-night-rain.svg","icon":176},{"code":1066,"day":"partly-cloudy-day-snow.svg","night":"partly-cloudy-night-snow.svg","icon":179},{"code":1069,"day":"partly-cloudy-day-sleet.svg","night":"partly-cloudy-night-sleet.svg","icon":182},{"code":1072,"day":"partly-cloudy-day-sleet.svg","night":"partly-cloudy-night-sleet.svg","icon":185},{"code":1087,"day":"thunderstorms-day-rain.svg","night":"thunderstorms-night-rain.svg","icon":200},{"code":1114,"day":"wind.svg","night":"wind.svg","icon":227},{"code":1117,"day":"snow.svg","night":"snow.svg","icon":230},{"code":1135,"day":"fog-day.svg","night":"fog-night.svg","icon":248},{"code":1147,"day":"haze-day.svg","night":"haze-night.svg","icon":260},{"code":1150,"day":"partly-cloudy-day-rain.svg","night":"partly-cloudy-night-rain.svg","icon":263},{"code":1153,"day":"partly-cloudy-day-rain.svg","night":"partly-cloudy-night-rain.svg","icon":266},{"code":1168,"day":"partly-cloudy-day-rain.svg","night":"partly-cloudy-night-rain.svg","icon":281},{"code":1171,"day":"partly-cloudy-day-sleet.svg","night":"partly-cloudy-night-sleet.svg","icon":284},{"code":1180,"day":"partly-cloudy-day-drizzle.svg","night":"partly-cloudy-night-drizzle.svg","icon":293},{"code":1183,"day":"partly-cloudy-day-drizzle.svg","night":"partly-cloudy-night-drizzle.svg","icon":296},{"code":1186,"day":"Moderate rain at times","night":"Moderate rain at times","icon":299},{"code":1189,"day":"raindrop.svg","night":"raindrop.svg","icon":302},{"code":1192,"day":"raindrops.svg","night":"raindrops.svg","icon":305},{"code":1195,"day":"raindrops.svg","night":"raindrops.svg","icon":308},{"code":1198,"day":"Light freezing rain","night":"Light freezing rain","icon":311},{"code":1201,"day":"sleet.svg","night":"sleet.svg","icon":314},{"code":1204,"day":"sleet.svg","night":"sleet.svg","icon":317},{"code":1207,"day":"sleet.svg","night":"sleet.svg","icon":320},{"code":1210,"day":"Patchy light snow","night":"Patchy light snow","icon":323},{"code":1213,"day":"snow.svg","night":"snow.svg","icon":326},{"code":1216,"day":"partly-cloudy-day-snow.svg","night":"partly-cloudy-night-snow.svg","icon":329},{"code":1219,"day":"snow.svg","night":"snow.svg","icon":332},{"code":1222,"day":"snow.svg","night":"snow.svg","icon":335},{"code":1225,"day":"snow.svg","night":"snow.svg","icon":338},{"code":1237,"day":"hail.svg","night":"hail.svg","icon":350},{"code":1240,"day":"partly-cloudy-day-rain.svg","night":"partly-cloudy-night-rain.svg","icon":353},{"code":1243,"day":"rain.svg","night":"rain.svg","icon":356},{"code":1246,"day":"raindrops.svg","night":"raindrops.svg","icon":359},{"code":1249,"day":"partly-cloudy-day-sleet.svg","night":"partly-cloudy-night-sleet.svg","icon":362},{"code":1252,"day":"partly-cloudy-day-sleet.svg","night":"partly-cloudy-night-sleet.svg","icon":365},{"code":1255,"day":"partly-cloudy-day-snow.svg","night":"partly-cloudy-night-snow.svg","icon":368},{"code":1258,"day":"snow.svg","night":"snow.svg","icon":371},{"code":1261,"day":"partly-cloudy-day-hail.svg","night":"partly-cloudy-night-hail.svg","icon":374},{"code":1264,"day":"partly-cloudy-day-hail.svg","night":"partly-cloudy-night-hail.svg","icon":377},{"code":1273,"day":"thunderstorms-day-rain.svg","night":"thunderstorms-night-rain.svg","icon":386},{"code":1276,"day":"thunderstorms-rain.svg","night":"thunderstorms-rain.svg","icon":389},{"code":1279,"day":"thunderstorms-day-snow.svg","night":"thunderstorms-night-snow.svg","icon":392},{"code":1282,"day":"thunderstorms-snow.svg","night":"thunderstorms-snow.svg","icon":395}]');

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0FBRyxzQkFBaUIsR0FBRyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4td2VhdGhlci8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9zcmMvbW9kdWxlcy9hcGkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vc3JjL21vZHVsZXMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vc3JjL21vZHVsZXMvbG9jYXRvci5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9zcmMvbW9kdWxlcy93ZWF0aGVyT2JqZWN0LmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCBpbmplY3REYXRhIGZyb20gJy4vbW9kdWxlcy9jb250cm9sbGVyJztcbmltcG9ydCB1c2VyTG9jYXRvciBmcm9tICcuL21vZHVsZXMvbG9jYXRvcic7XG5cbmluamVjdERhdGEoKTtcbnVzZXJMb2NhdG9yKCk7XG4iLCJpbXBvcnQgdXBkYXRlRGlzcGxheSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgd2VhdGhlclN0b3JhZ2UgZnJvbSAnLi93ZWF0aGVyT2JqZWN0JztcblxuY29uc3QgZmV0Y2hXZWF0aGVyID0gYXN5bmMgKGxvY2F0aW9uKSA9PiB7XG4gIGFzeW5jIGZ1bmN0aW9uIHNlYXJjaFdpdGhDaXR5KCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9NDdkYjg2OTBlYTNlNDQzMzgwMzEyMzcwNjIzMjIwMyZxPSR7bG9jYXRpb259JmRheXM9NWBcbiAgICAgICk7XG4gICAgICBjb25zdCByZXNwb25zZURhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBjb25zb2xlLmxvZygnU2VhcmNoaW5nIHdpdGggc2VhcmNoIGlucHV0Jyk7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZURhdGEpO1xuICAgICAgdXBkYXRlRGlzcGxheShyZXNwb25zZURhdGEpO1xuICAgICAgd2VhdGhlclN0b3JhZ2UocmVzcG9uc2VEYXRhKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIHNlYXJjaFdpdGhDaXR5KCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmZXRjaFdlYXRoZXI7XG4iLCJpbXBvcnQgZmV0Y2hXZWF0aGVyIGZyb20gJy4vYXBpJztcblxuY29uc3QgaW5qZWN0RGF0YSA9ICgpID0+IHtcbiAgY29uc3QgY2l0eVRvU2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNpdHlzZWFyY2gnKTtcbiAgY29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3J1bnNlYXJjaCcpO1xuXG4gIGZ1bmN0aW9uIGZpeFNwZWNpYWxDaGFycygpIHtcbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIG5lZWRlZCwgYXMgd2VhdGhlckFQSSBwYXJzZXMgY2hhcmFjdGVycyBsaWtlIMO2w6TDpSBiYWRseVxuICAgIGxldCBjaXR5VmFsdWUgPSBjaXR5VG9TZWFyY2gudmFsdWUudG9Mb3dlckNhc2UoKS5zcGxpdCgnJyk7XG4gICAgbGV0IGl0ZXJhdGVkQ2l0eSA9IFtdO1xuICAgIGNpdHlWYWx1ZS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBpZiAoZWxlbWVudCA9PT0gJ8O2Jykge1xuICAgICAgICBpdGVyYXRlZENpdHkucHVzaCgnbycpO1xuICAgICAgfSBlbHNlIGlmIChlbGVtZW50ID09PSAnw6QnKSB7XG4gICAgICAgIGl0ZXJhdGVkQ2l0eS5wdXNoKCdhJyk7XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgPT09ICfDpScpIHtcbiAgICAgICAgaXRlcmF0ZWRDaXR5LnB1c2goJ2EnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZXJhdGVkQ2l0eS5wdXNoKGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHBhcnNlZENpdHkgPSBpdGVyYXRlZENpdHkuam9pbignJyk7XG4gICAgcmV0dXJuIHBhcnNlZENpdHk7XG4gIH1cblxuICBzZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiBydW5TZWFyY2goKSB7XG4gICAgY29uc3Qgc2VhcmNQYXJhbWV0ZXIgPSBmaXhTcGVjaWFsQ2hhcnMoKTtcbiAgICBmZXRjaFdlYXRoZXIoc2VhcmNQYXJhbWV0ZXIpO1xuICB9KTtcblxuICBjaXR5VG9TZWFyY2guYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBmdW5jdGlvbiBydW5TZWFyY2goZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICBjb25zdCBzZWFyY1BhcmFtZXRlciA9IGZpeFNwZWNpYWxDaGFycygpO1xuICAgICAgZmV0Y2hXZWF0aGVyKHNlYXJjUGFyYW1ldGVyKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaW5qZWN0RGF0YTtcbiIsImNvbnN0IHdlYXRoZXJKU09OID0gcmVxdWlyZSgnLi4vYXNzZXRzL3dlYXRoZXJfY29uZGl0aW9ucy5qc29uJyk7XG5cbmNvbnN0IHVwZGF0ZURpc3BsYXkgPSAod2VhdGhlckRhdGEpID0+IHtcbiAgY29uc3QgdGVtcHRlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RlbXB0ZXJhdHVyZScpO1xuICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpO1xuICBjb25zdCBjaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NpdHknKTtcbiAgY29uc3QgY291bnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb3VudHJ5Jyk7XG4gIGNvbnN0IGN1cnJlbnRJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2N1cnJlbnRJY29uJyk7XG5cbiAgY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaHVtaWRpdHlWYWx1ZScpO1xuICBjb25zdCBhaXJQcmVzc3VyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhaXJQcmVzc3VyZScpO1xuICBjb25zdCBjaGFuY2VPZlJhaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmNlT2ZSYWluJyk7XG4gIGNvbnN0IHdpbmRTcGVlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3aW5kU3BlZWQnKTtcblxuICBmdW5jdGlvbiB1cGRhdGVOb3coKSB7XG4gICAgdGVtcHRlcmF0dXJlLnRleHRDb250ZW50ID0gYCR7d2VhdGhlckRhdGEuY3VycmVudC50ZW1wX2N9Q2A7XG4gICAgY2l0eS50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJEYXRhLmxvY2F0aW9uLm5hbWV9LCAke3dlYXRoZXJEYXRhLmxvY2F0aW9uLnJlZ2lvbn1gO1xuICAgIGNvdW50cnkudGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyRGF0YS5sb2NhdGlvbi5jb3VudHJ5fWA7XG4gICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyRGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0fWA7XG5cbiAgICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJEYXRhLmN1cnJlbnQuaHVtaWRpdHl9YDtcbiAgICBhaXJQcmVzc3VyZS50ZXh0Q29udGVudCA9IGBBaXIgcHJlc3N1cmU6ICR7d2VhdGhlckRhdGEuY3VycmVudC5wcmVzc3VyZV9tYn1gO1xuICAgIGNoYW5jZU9mUmFpbi50ZXh0Q29udGVudCA9IGBDaGFuY2Ugb2YgcmFpbjogJHt3ZWF0aGVyRGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW59JWA7XG4gICAgd2luZFNwZWVkLnRleHRDb250ZW50ID0gYFdpbmQgc3BlZWQ6ICR7d2VhdGhlckRhdGEuY3VycmVudC53aW5kX2twaH0va3BoYDtcbiAgfVxuICBmdW5jdGlvbiB1cGRhdGVDdXJyZW50SWNvbigpIHtcbiAgICBjb25zdCBpY29uID0gd2VhdGhlckpTT04uZmluZChcbiAgICAgIChpdGVtKSA9PiBpdGVtLmNvZGUgPT09IHdlYXRoZXJEYXRhLmN1cnJlbnQuY29uZGl0aW9uLmNvZGVcbiAgICApO1xuICAgIGlmICh3ZWF0aGVyRGF0YS5jdXJyZW50LmlzX2RheSA9PT0gMCkge1xuICAgICAgY3VycmVudEljb24uc3JjID0gYC4uL3NyYy9hc3NldHMvaWNvbnMvbGluZS9hbGwvJHtpY29uLm5pZ2h0fWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnRJY29uLnNyYyA9IGAuLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsLyR7aWNvbi5kYXl9YDtcbiAgICB9XG5cbiAgICBjdXJyZW50SWNvbi5hbHQgPSBgJHt3ZWF0aGVyRGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0fWA7XG4gIH1cbiAgdXBkYXRlTm93KCk7XG4gIHVwZGF0ZUN1cnJlbnRJY29uKCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1cGRhdGVEaXNwbGF5O1xuIiwiaW1wb3J0IGZldGNoV2VhdGhlciBmcm9tICcuL2FwaSc7XG5cbmNvbnN0IHVzZXJMb2NhdG9yID0gYXN5bmMgKCkgPT4ge1xuICBmdW5jdGlvbiBzdWNjZXNzKHBvcykge1xuICAgIGNvbnN0IHVzZXJMb2NhdGlvbiA9IHBvcy5jb29yZHM7XG4gICAgZmV0Y2hXZWF0aGVyKGAke3VzZXJMb2NhdGlvbi5sYXRpdHVkZX0sJHt1c2VyTG9jYXRpb24ubG9uZ2l0dWRlfWApO1xuICB9XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgZW5hYmxlSGlnaEFjY3VyYWN5OiB0cnVlLFxuICAgIHRpbWVvdXQ6IDUwMDAsXG4gICAgbWF4aW11bUFnZTogMCxcbiAgfTtcblxuICBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICBjb25zb2xlLndhcm4oYEVSUk9SKCR7ZXJyLmNvZGV9KTogJHtlcnIubWVzc2FnZX1gKTtcbiAgfVxuICB0cnkge1xuICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oc3VjY2VzcywgZXJyb3IsIG9wdGlvbnMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlckxvY2F0b3I7XG4iLCJjb25zdCB3ZWF0aGVyU3RvcmFnZSA9IChuZXdEYXRhKSA9PiB7XG4gIGNvbnN0IGxhdGVzdFdlYXRoZXJEYXRhID0gW107XG4gIGxhdGVzdFdlYXRoZXJEYXRhLnB1c2gobmV3RGF0YSk7XG5cbiAgY29uc29sZS5sb2cobGF0ZXN0V2VhdGhlckRhdGEpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd2VhdGhlclN0b3JhZ2U7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuYm9keSB7XFxuICBtYXJnaW46IGF1dG87XFxuICBtYXgtd2lkdGg6IDEwOTBweDtcXG4gIGNvbG9yOiAjMjcyNDFjO1xcbiAgZm9udC1mYW1pbHk6IHJvYm90bywgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnT3BlbiBTYW5zJyxcXG4gICAgJ0hlbHZldGljYSBOZXVlJywgc2Fucy1zZXJpZjtcXG4gIGJhY2tncm91bmQ6IHJnYigyMzgsIDE3NCwgMjAyKTtcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcXG4gICAgOTBkZWcsXFxuICAgIHJnYmEoMjM4LCAxNzQsIDIwMiwgMSkgMCUsXFxuICAgIHJnYmEoMTQ4LCAxODcsIDIzMywgMSkgMTAwJVxcbiAgKTtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIHBhZGRpbmctdG9wOiA1JTtcXG4gIHBhZGRpbmctYm90dG9tOiA1JTtcXG59XFxuXFxuLm1haW5IZWFkaW5nIHtcXG4gIG1hcmdpbi1sZWZ0OiAtMiU7XFxufVxcblxcbmJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZjM2E1O1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxuICBib3gtc2hhZG93OiByZ2JhKDUwLCA1MCwgOTMsIDAuMjUpIDBweCAycHggNXB4IC0xcHgsXFxuICAgIHJnYmEoMCwgMCwgMCwgMC4zKSAwcHggMXB4IDNweCAtMXB4O1xcbn1cXG5cXG4uc2NhbGVDaGFuZ2VyIHtcXG4gIG1hcmdpbi1sZWZ0OiAtMTAlO1xcbn1cXG5cXG4uY2l0eXNlYXJjaCB7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xcbiAgcGFkZGluZy1yaWdodDogMTVweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XFxuICBib3gtc2hhZG93OiByZ2JhKDUwLCA1MCwgOTMsIDAuMjUpIDBweCAycHggNXB4IC0xcHgsXFxuICAgIHJnYmEoMCwgMCwgMCwgMC4zKSAwcHggMXB4IDNweCAtMXB4O1xcbn1cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLm1haW5Db250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcblxcbi5jdXJyZW50V2VhdGhlckNvbnRhaW5lciB7XFxuICB3aWR0aDogOTUlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5iYXNpYy1kYXRhIHtcXG4gIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxuICBtYXJnaW4tdG9wOiAzJTtcXG4gIHBhZGRpbmc6IDMlO1xcbiAgLyogRnJvbSBodHRwczovL2Nzcy5nbGFzcyAqL1xcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIzKTtcXG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XFxuICBib3gtc2hhZG93OiAwIDRweCAzMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig3LjZweCk7XFxuICAtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cig3LjZweCk7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpO1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4uYWRkaXRpb25hbC1kYXRhIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBtYXgtd2lkdGg6IDMwJTtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG59XFxuXFxuLmFkZGl0aW9uYWwtZGF0YSA+IGRpdiB7XFxuICB3aWR0aDogMTIwcHg7XFxuICBtYXJnaW46IDEwJTtcXG4gIHBhZGRpbmc6IDE1JTtcXG4gIC8qIEZyb20gaHR0cHM6Ly9jc3MuZ2xhc3MgKi9cXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wODIpO1xcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcXG4gIGJveC1zaGFkb3c6IDAgNHB4IDMwcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDcuNnB4KTtcXG4gIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDcuNnB4KTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNDgpO1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4uZGF0YXBvaW50IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbn1cXG5cXG4udG9wUm93IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbiN0ZW1wdGVyYXR1cmUge1xcbiAgZm9udC1zaXplOiA0NHB4O1xcbn1cXG5cXG4jZGVzY3JpcHRpb24ge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWFyZ2luLXRvcDogLTEwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbn1cXG5cXG4jY2l0eSxcXG4jY291bnRyeSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IHNtYWxsZXI7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDZCQUE2QjtFQUM3QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZDtnQ0FDOEI7RUFDOUIsOEJBQThCO0VBQzlCOzs7O0dBSUM7QUFDSDs7QUFFQTtFQUNFLGVBQWU7RUFDZixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsZUFBZTtFQUNmLGFBQWE7RUFDYixZQUFZO0VBQ1osbUJBQW1CO0VBQ25CO3VDQUNxQztBQUN2Qzs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQjt1Q0FDcUM7QUFDdkM7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsY0FBYztFQUNkLFdBQVc7RUFDWCwyQkFBMkI7RUFDM0IscUNBQXFDO0VBQ3JDLG1CQUFtQjtFQUNuQix5Q0FBeUM7RUFDekMsNEJBQTRCO0VBQzVCLG9DQUFvQztFQUNwQywyQ0FBMkM7RUFDM0MsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixjQUFjO0VBQ2QsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsWUFBWTtFQUNaLDJCQUEyQjtFQUMzQixzQ0FBc0M7RUFDdEMsbUJBQW1CO0VBQ25CLHlDQUF5QztFQUN6Qyw0QkFBNEI7RUFDNUIsb0NBQW9DO0VBQ3BDLDRDQUE0QztFQUM1QyxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYiw2QkFBNkI7RUFDN0IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLGVBQWU7QUFDakI7O0FBRUE7O0VBRUUsa0JBQWtCO0VBQ2xCLGtCQUFrQjtBQUNwQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJoZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmJvZHkge1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgbWF4LXdpZHRoOiAxMDkwcHg7XFxuICBjb2xvcjogIzI3MjQxYztcXG4gIGZvbnQtZmFtaWx5OiByb2JvdG8sIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ09wZW4gU2FucycsXFxuICAgICdIZWx2ZXRpY2EgTmV1ZScsIHNhbnMtc2VyaWY7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjM4LCAxNzQsIDIwMik7XFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgIDkwZGVnLFxcbiAgICByZ2JhKDIzOCwgMTc0LCAyMDIsIDEpIDAlLFxcbiAgICByZ2JhKDE0OCwgMTg3LCAyMzMsIDEpIDEwMCVcXG4gICk7XFxufVxcblxcbmhlYWRlciB7XFxuICBwYWRkaW5nLXRvcDogNSU7XFxuICBwYWRkaW5nLWJvdHRvbTogNSU7XFxufVxcblxcbi5tYWluSGVhZGluZyB7XFxuICBtYXJnaW4tbGVmdDogLTIlO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYzNhNTtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAyNXB4O1xcbiAgYm94LXNoYWRvdzogcmdiYSg1MCwgNTAsIDkzLCAwLjI1KSAwcHggMnB4IDVweCAtMXB4LFxcbiAgICByZ2JhKDAsIDAsIDAsIDAuMykgMHB4IDFweCAzcHggLTFweDtcXG59XFxuXFxuLnNjYWxlQ2hhbmdlciB7XFxuICBtYXJnaW4tbGVmdDogLTEwJTtcXG59XFxuXFxuLmNpdHlzZWFyY2gge1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIHBhZGRpbmctbGVmdDogMTVweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDE1cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAyNXB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xcbiAgYm94LXNoYWRvdzogcmdiYSg1MCwgNTAsIDkzLCAwLjI1KSAwcHggMnB4IDVweCAtMXB4LFxcbiAgICByZ2JhKDAsIDAsIDAsIDAuMykgMHB4IDFweCAzcHggLTFweDtcXG59XFxuXFxubWFpbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5tYWluQ29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4uY3VycmVudFdlYXRoZXJDb250YWluZXIge1xcbiAgd2lkdGg6IDk1JTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uYmFzaWMtZGF0YSB7XFxuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgbWFyZ2luLXRvcDogMyU7XFxuICBwYWRkaW5nOiAzJTtcXG4gIC8qIEZyb20gaHR0cHM6Ly9jc3MuZ2xhc3MgKi9cXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMyk7XFxuICBib3JkZXItcmFkaXVzOiAxNnB4O1xcbiAgYm94LXNoYWRvdzogMCA0cHggMzBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNy42cHgpO1xcbiAgLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXI6IGJsdXIoNy42cHgpO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KTtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuLmFkZGl0aW9uYWwtZGF0YSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgbWF4LXdpZHRoOiAzMCU7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxufVxcblxcbi5hZGRpdGlvbmFsLWRhdGEgPiBkaXYge1xcbiAgd2lkdGg6IDEyMHB4O1xcbiAgbWFyZ2luOiAxMCU7XFxuICBwYWRkaW5nOiAxNSU7XFxuICAvKiBGcm9tIGh0dHBzOi8vY3NzLmdsYXNzICovXFxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDgyKTtcXG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XFxuICBib3gtc2hhZG93OiAwIDRweCAzMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig3LjZweCk7XFxuICAtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cig3LjZweCk7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDQ4KTtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuLmRhdGFwb2ludCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG59XFxuXFxuLnRvcFJvdyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jdGVtcHRlcmF0dXJlIHtcXG4gIGZvbnQtc2l6ZTogNDRweDtcXG59XFxuXFxuI2Rlc2NyaXB0aW9uIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1hcmdpbi10b3A6IC0xMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG59XFxuXFxuI2NpdHksXFxuI2NvdW50cnkge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiBzbWFsbGVyO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbImluamVjdERhdGEiLCJ1c2VyTG9jYXRvciIsInVwZGF0ZURpc3BsYXkiLCJ3ZWF0aGVyU3RvcmFnZSIsImZldGNoV2VhdGhlciIsImxvY2F0aW9uIiwic2VhcmNoV2l0aENpdHkiLCJyZXNwb25zZSIsImZldGNoIiwicmVzcG9uc2VEYXRhIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImNpdHlUb1NlYXJjaCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInNlYXJjaEJ0biIsImZpeFNwZWNpYWxDaGFycyIsImNpdHlWYWx1ZSIsInZhbHVlIiwidG9Mb3dlckNhc2UiLCJzcGxpdCIsIml0ZXJhdGVkQ2l0eSIsImZvckVhY2giLCJlbGVtZW50IiwicHVzaCIsInBhcnNlZENpdHkiLCJqb2luIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJ1blNlYXJjaCIsInNlYXJjUGFyYW1ldGVyIiwiZXZlbnQiLCJrZXkiLCJ3ZWF0aGVySlNPTiIsInJlcXVpcmUiLCJ3ZWF0aGVyRGF0YSIsInRlbXB0ZXJhdHVyZSIsImRlc2NyaXB0aW9uIiwiY2l0eSIsImNvdW50cnkiLCJjdXJyZW50SWNvbiIsImh1bWlkaXR5IiwiYWlyUHJlc3N1cmUiLCJjaGFuY2VPZlJhaW4iLCJ3aW5kU3BlZWQiLCJ1cGRhdGVOb3ciLCJ0ZXh0Q29udGVudCIsImN1cnJlbnQiLCJ0ZW1wX2MiLCJuYW1lIiwicmVnaW9uIiwiY29uZGl0aW9uIiwidGV4dCIsInByZXNzdXJlX21iIiwiZm9yZWNhc3QiLCJmb3JlY2FzdGRheSIsImRheSIsImRhaWx5X2NoYW5jZV9vZl9yYWluIiwid2luZF9rcGgiLCJ1cGRhdGVDdXJyZW50SWNvbiIsImljb24iLCJmaW5kIiwiaXRlbSIsImNvZGUiLCJpc19kYXkiLCJzcmMiLCJuaWdodCIsImFsdCIsInN1Y2Nlc3MiLCJwb3MiLCJ1c2VyTG9jYXRpb24iLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsIm9wdGlvbnMiLCJlbmFibGVIaWdoQWNjdXJhY3kiLCJ0aW1lb3V0IiwibWF4aW11bUFnZSIsImVyciIsIndhcm4iLCJtZXNzYWdlIiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJuZXdEYXRhIiwibGF0ZXN0V2VhdGhlckRhdGEiXSwic291cmNlUm9vdCI6IiJ9