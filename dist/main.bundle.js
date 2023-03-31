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
  const humidity = document.querySelector('#humidity');
  const airPressure = document.querySelector('#airPressure');
  const chanceOfRain = document.querySelector('#chanceOfRain');
  const windSpeed = document.querySelector('#windSpeed');
  function updateNow() {
    tempterature.textContent = `${weatherData.current.temp_c}C`;
    city.textContent = `${weatherData.location.name}, ${weatherData.location.region}`;
    country.textContent = `${weatherData.location.country}`;
    description.textContent = `${weatherData.current.condition.text}`;
    humidity.textContent = `Humidity: ${weatherData.current.humidity}`;
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
___CSS_LOADER_EXPORT___.push([module.id, "header {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  align-items: center;\n}\n\nbody {\n  color: #27241c;\n  font-family: roboto, -apple-system, BlinkMacSystemFont, 'Open Sans',\n    'Helvetica Neue', sans-serif;\n  background: rgb(238, 174, 202);\n  background: linear-gradient(\n    90deg,\n    rgba(238, 174, 202, 1) 0%,\n    rgba(148, 187, 233, 1) 100%\n  );\n}\n\nheader {\n  padding-bottom: 25px;\n}\n\nbutton {\n  background-color: #ffc3a5;\n  font-size: 14px;\n  padding: 15px;\n  border: none;\n  border-radius: 25px;\n  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,\n    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;\n}\n\n.citysearch {\n  font-size: 14px;\n  padding: 15px;\n  padding-left: 15px;\n  padding-right: 15px;\n  border: none;\n  border-radius: 25px;\n  margin-right: 15px;\n  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,\n    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;\n}\n\nmain {\n  display: flex;\n  justify-content: center;\n}\n\n.mainContainer {\n  display: flex;\n  justify-content: center;\n  width: 100%;\n}\n\n.currentWeatherContainer {\n  width: 90%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.weather-data {\n  padding: 3%;\n  /* From https://css.glass */\n  background: rgba(255, 255, 255, 0.23);\n  border-radius: 16px;\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n  backdrop-filter: blur(7.6px);\n  -webkit-backdrop-filter: blur(7.6px);\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  cursor: default;\n}\n\n.topRow {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n}\n\n#tempterature {\n  font-size: 44px;\n}\n\n#description {\n  text-align: center;\n  margin-top: -10px;\n  margin-bottom: 15px;\n  font-size: 20px;\n}\n\n#city,\n#country {\n  text-align: center;\n  font-size: smaller;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,mBAAmB;EACnB,6BAA6B;EAC7B,mBAAmB;AACrB;;AAEA;EACE,cAAc;EACd;gCAC8B;EAC9B,8BAA8B;EAC9B;;;;GAIC;AACH;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,yBAAyB;EACzB,eAAe;EACf,aAAa;EACb,YAAY;EACZ,mBAAmB;EACnB;uCACqC;AACvC;;AAEA;EACE,eAAe;EACf,aAAa;EACb,kBAAkB;EAClB,mBAAmB;EACnB,YAAY;EACZ,mBAAmB;EACnB,kBAAkB;EAClB;uCACqC;AACvC;;AAEA;EACE,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,WAAW;AACb;;AAEA;EACE,UAAU;EACV,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,2BAA2B;EAC3B,qCAAqC;EACrC,mBAAmB;EACnB,yCAAyC;EACzC,4BAA4B;EAC5B,oCAAoC;EACpC,2CAA2C;EAC3C,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,6BAA6B;EAC7B,mBAAmB;AACrB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,eAAe;AACjB;;AAEA;;EAEE,kBAAkB;EAClB,kBAAkB;AACpB","sourcesContent":["header {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  align-items: center;\n}\n\nbody {\n  color: #27241c;\n  font-family: roboto, -apple-system, BlinkMacSystemFont, 'Open Sans',\n    'Helvetica Neue', sans-serif;\n  background: rgb(238, 174, 202);\n  background: linear-gradient(\n    90deg,\n    rgba(238, 174, 202, 1) 0%,\n    rgba(148, 187, 233, 1) 100%\n  );\n}\n\nheader {\n  padding-bottom: 25px;\n}\n\nbutton {\n  background-color: #ffc3a5;\n  font-size: 14px;\n  padding: 15px;\n  border: none;\n  border-radius: 25px;\n  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,\n    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;\n}\n\n.citysearch {\n  font-size: 14px;\n  padding: 15px;\n  padding-left: 15px;\n  padding-right: 15px;\n  border: none;\n  border-radius: 25px;\n  margin-right: 15px;\n  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,\n    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;\n}\n\nmain {\n  display: flex;\n  justify-content: center;\n}\n\n.mainContainer {\n  display: flex;\n  justify-content: center;\n  width: 100%;\n}\n\n.currentWeatherContainer {\n  width: 90%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.weather-data {\n  padding: 3%;\n  /* From https://css.glass */\n  background: rgba(255, 255, 255, 0.23);\n  border-radius: 16px;\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n  backdrop-filter: blur(7.6px);\n  -webkit-backdrop-filter: blur(7.6px);\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  cursor: default;\n}\n\n.topRow {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n}\n\n#tempterature {\n  font-size: 44px;\n}\n\n#description {\n  text-align: center;\n  margin-top: -10px;\n  margin-bottom: 15px;\n  font-size: 20px;\n}\n\n#city,\n#country {\n  text-align: center;\n  font-size: smaller;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNuRmE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDakNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL3NyYy9tb2R1bGVzL2FwaS5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9zcmMvbW9kdWxlcy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9zcmMvbW9kdWxlcy9sb2NhdG9yLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL3NyYy9tb2R1bGVzL3dlYXRoZXJPYmplY3QuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IGluamVjdERhdGEgZnJvbSAnLi9tb2R1bGVzL2NvbnRyb2xsZXInO1xuaW1wb3J0IHVzZXJMb2NhdG9yIGZyb20gJy4vbW9kdWxlcy9sb2NhdG9yJztcblxuaW5qZWN0RGF0YSgpO1xudXNlckxvY2F0b3IoKTtcbiIsImltcG9ydCB1cGRhdGVEaXNwbGF5IGZyb20gJy4vZG9tJztcbmltcG9ydCB3ZWF0aGVyU3RvcmFnZSBmcm9tICcuL3dlYXRoZXJPYmplY3QnO1xuXG5jb25zdCBmZXRjaFdlYXRoZXIgPSBhc3luYyAobG9jYXRpb24pID0+IHtcbiAgYXN5bmMgZnVuY3Rpb24gc2VhcmNoV2l0aENpdHkoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT00N2RiODY5MGVhM2U0NDMzODAzMTIzNzA2MjMyMjAzJnE9JHtsb2NhdGlvbn0mZGF5cz01YFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGNvbnNvbGUubG9nKCdTZWFyY2hpbmcgd2l0aCBzZWFyY2ggaW5wdXQnKTtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlRGF0YSk7XG4gICAgICB1cGRhdGVEaXNwbGF5KHJlc3BvbnNlRGF0YSk7XG4gICAgICB3ZWF0aGVyU3RvcmFnZShyZXNwb25zZURhdGEpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgc2VhcmNoV2l0aENpdHkoKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZldGNoV2VhdGhlcjtcbiIsImltcG9ydCBmZXRjaFdlYXRoZXIgZnJvbSAnLi9hcGknO1xuXG5jb25zdCBpbmplY3REYXRhID0gKCkgPT4ge1xuICBjb25zdCBjaXR5VG9TZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2l0eXNlYXJjaCcpO1xuICBjb25zdCBzZWFyY2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcnVuc2VhcmNoJyk7XG5cbiAgZnVuY3Rpb24gZml4U3BlY2lhbENoYXJzKCkge1xuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgbmVlZGVkLCBhcyB3ZWF0aGVyQVBJIHBhcnNlcyBjaGFyYWN0ZXJzIGxpa2Ugw7bDpMOlIGJhZGx5XG4gICAgbGV0IGNpdHlWYWx1ZSA9IGNpdHlUb1NlYXJjaC52YWx1ZS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcnKTtcbiAgICBsZXQgaXRlcmF0ZWRDaXR5ID0gW107XG4gICAgY2l0eVZhbHVlLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGlmIChlbGVtZW50ID09PSAnw7YnKSB7XG4gICAgICAgIGl0ZXJhdGVkQ2l0eS5wdXNoKCdvJyk7XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgPT09ICfDpCcpIHtcbiAgICAgICAgaXRlcmF0ZWRDaXR5LnB1c2goJ2EnKTtcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCA9PT0gJ8OlJykge1xuICAgICAgICBpdGVyYXRlZENpdHkucHVzaCgnYScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlcmF0ZWRDaXR5LnB1c2goZWxlbWVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgcGFyc2VkQ2l0eSA9IGl0ZXJhdGVkQ2l0eS5qb2luKCcnKTtcbiAgICByZXR1cm4gcGFyc2VkQ2l0eTtcbiAgfVxuXG4gIHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIHJ1blNlYXJjaCgpIHtcbiAgICBjb25zdCBzZWFyY1BhcmFtZXRlciA9IGZpeFNwZWNpYWxDaGFycygpO1xuICAgIGZldGNoV2VhdGhlcihzZWFyY1BhcmFtZXRlcik7XG4gIH0pO1xuXG4gIGNpdHlUb1NlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGZ1bmN0aW9uIHJ1blNlYXJjaChldmVudCkge1xuICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgIGNvbnN0IHNlYXJjUGFyYW1ldGVyID0gZml4U3BlY2lhbENoYXJzKCk7XG4gICAgICBmZXRjaFdlYXRoZXIoc2VhcmNQYXJhbWV0ZXIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBpbmplY3REYXRhO1xuIiwiY29uc3Qgd2VhdGhlckpTT04gPSByZXF1aXJlKCcuLi9hc3NldHMvd2VhdGhlcl9jb25kaXRpb25zLmpzb24nKTtcblxuY29uc3QgdXBkYXRlRGlzcGxheSA9ICh3ZWF0aGVyRGF0YSkgPT4ge1xuICBjb25zdCB0ZW1wdGVyYXR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGVtcHRlcmF0dXJlJyk7XG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJyk7XG4gIGNvbnN0IGNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2l0eScpO1xuICBjb25zdCBjb3VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvdW50cnknKTtcbiAgY29uc3QgY3VycmVudEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3VycmVudEljb24nKTtcblxuICBjb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNodW1pZGl0eScpO1xuICBjb25zdCBhaXJQcmVzc3VyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhaXJQcmVzc3VyZScpO1xuICBjb25zdCBjaGFuY2VPZlJhaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmNlT2ZSYWluJyk7XG4gIGNvbnN0IHdpbmRTcGVlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3aW5kU3BlZWQnKTtcblxuICBmdW5jdGlvbiB1cGRhdGVOb3coKSB7XG4gICAgdGVtcHRlcmF0dXJlLnRleHRDb250ZW50ID0gYCR7d2VhdGhlckRhdGEuY3VycmVudC50ZW1wX2N9Q2A7XG4gICAgY2l0eS50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJEYXRhLmxvY2F0aW9uLm5hbWV9LCAke3dlYXRoZXJEYXRhLmxvY2F0aW9uLnJlZ2lvbn1gO1xuICAgIGNvdW50cnkudGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyRGF0YS5sb2NhdGlvbi5jb3VudHJ5fWA7XG4gICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyRGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0fWA7XG5cbiAgICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGBIdW1pZGl0eTogJHt3ZWF0aGVyRGF0YS5jdXJyZW50Lmh1bWlkaXR5fWA7XG4gICAgYWlyUHJlc3N1cmUudGV4dENvbnRlbnQgPSBgQWlyIHByZXNzdXJlOiAke3dlYXRoZXJEYXRhLmN1cnJlbnQucHJlc3N1cmVfbWJ9YDtcbiAgICBjaGFuY2VPZlJhaW4udGV4dENvbnRlbnQgPSBgQ2hhbmNlIG9mIHJhaW46ICR7d2VhdGhlckRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSVgO1xuICAgIHdpbmRTcGVlZC50ZXh0Q29udGVudCA9IGBXaW5kIHNwZWVkOiAke3dlYXRoZXJEYXRhLmN1cnJlbnQud2luZF9rcGh9L2twaGA7XG4gIH1cbiAgZnVuY3Rpb24gdXBkYXRlQ3VycmVudEljb24oKSB7XG4gICAgY29uc3QgaWNvbiA9IHdlYXRoZXJKU09OLmZpbmQoXG4gICAgICAoaXRlbSkgPT4gaXRlbS5jb2RlID09PSB3ZWF0aGVyRGF0YS5jdXJyZW50LmNvbmRpdGlvbi5jb2RlXG4gICAgKTtcbiAgICBpZiAod2VhdGhlckRhdGEuY3VycmVudC5pc19kYXkgPT09IDApIHtcbiAgICAgIGN1cnJlbnRJY29uLnNyYyA9IGAuLi9zcmMvYXNzZXRzL2ljb25zL2xpbmUvYWxsLyR7aWNvbi5uaWdodH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50SWNvbi5zcmMgPSBgLi4vc3JjL2Fzc2V0cy9pY29ucy9saW5lL2FsbC8ke2ljb24uZGF5fWA7XG4gICAgfVxuXG4gICAgY3VycmVudEljb24uYWx0ID0gYCR7d2VhdGhlckRhdGEuY3VycmVudC5jb25kaXRpb24udGV4dH1gO1xuICB9XG4gIHVwZGF0ZU5vdygpO1xuICB1cGRhdGVDdXJyZW50SWNvbigpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlRGlzcGxheTtcbiIsImltcG9ydCBmZXRjaFdlYXRoZXIgZnJvbSAnLi9hcGknO1xuXG5jb25zdCB1c2VyTG9jYXRvciA9IGFzeW5jICgpID0+IHtcbiAgZnVuY3Rpb24gc3VjY2Vzcyhwb3MpIHtcbiAgICBjb25zdCB1c2VyTG9jYXRpb24gPSBwb3MuY29vcmRzO1xuICAgIGZldGNoV2VhdGhlcihgJHt1c2VyTG9jYXRpb24ubGF0aXR1ZGV9LCR7dXNlckxvY2F0aW9uLmxvbmdpdHVkZX1gKTtcbiAgfVxuICBjb25zdCBvcHRpb25zID0ge1xuICAgIGVuYWJsZUhpZ2hBY2N1cmFjeTogdHJ1ZSxcbiAgICB0aW1lb3V0OiA1MDAwLFxuICAgIG1heGltdW1BZ2U6IDAsXG4gIH07XG5cbiAgZnVuY3Rpb24gZXJyb3IoZXJyKSB7XG4gICAgY29uc29sZS53YXJuKGBFUlJPUigke2Vyci5jb2RlfSk6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gIH1cbiAgdHJ5IHtcbiAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHN1Y2Nlc3MsIGVycm9yLCBvcHRpb25zKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZXJMb2NhdG9yO1xuIiwiY29uc3Qgd2VhdGhlclN0b3JhZ2UgPSAobmV3RGF0YSkgPT4ge1xuICBjb25zdCBsYXRlc3RXZWF0aGVyRGF0YSA9IFtdO1xuICBsYXRlc3RXZWF0aGVyRGF0YS5wdXNoKG5ld0RhdGEpO1xuXG4gIGNvbnNvbGUubG9nKGxhdGVzdFdlYXRoZXJEYXRhKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdlYXRoZXJTdG9yYWdlO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJoZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmJvZHkge1xcbiAgY29sb3I6ICMyNzI0MWM7XFxuICBmb250LWZhbWlseTogcm9ib3RvLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdPcGVuIFNhbnMnLFxcbiAgICAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmO1xcbiAgYmFja2dyb3VuZDogcmdiKDIzOCwgMTc0LCAyMDIpO1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxcbiAgICA5MGRlZyxcXG4gICAgcmdiYSgyMzgsIDE3NCwgMjAyLCAxKSAwJSxcXG4gICAgcmdiYSgxNDgsIDE4NywgMjMzLCAxKSAxMDAlXFxuICApO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgcGFkZGluZy1ib3R0b206IDI1cHg7XFxufVxcblxcbmJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZjM2E1O1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxuICBib3gtc2hhZG93OiByZ2JhKDUwLCA1MCwgOTMsIDAuMjUpIDBweCAycHggNXB4IC0xcHgsXFxuICAgIHJnYmEoMCwgMCwgMCwgMC4zKSAwcHggMXB4IDNweCAtMXB4O1xcbn1cXG5cXG4uY2l0eXNlYXJjaCB7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xcbiAgcGFkZGluZy1yaWdodDogMTVweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XFxuICBib3gtc2hhZG93OiByZ2JhKDUwLCA1MCwgOTMsIDAuMjUpIDBweCAycHggNXB4IC0xcHgsXFxuICAgIHJnYmEoMCwgMCwgMCwgMC4zKSAwcHggMXB4IDNweCAtMXB4O1xcbn1cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLm1haW5Db250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcblxcbi5jdXJyZW50V2VhdGhlckNvbnRhaW5lciB7XFxuICB3aWR0aDogOTAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi53ZWF0aGVyLWRhdGEge1xcbiAgcGFkZGluZzogMyU7XFxuICAvKiBGcm9tIGh0dHBzOi8vY3NzLmdsYXNzICovXFxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjMpO1xcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcXG4gIGJveC1zaGFkb3c6IDAgNHB4IDMwcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDcuNnB4KTtcXG4gIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDcuNnB4KTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSk7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcblxcbi50b3BSb3cge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuI3RlbXB0ZXJhdHVyZSB7XFxuICBmb250LXNpemU6IDQ0cHg7XFxufVxcblxcbiNkZXNjcmlwdGlvbiB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW4tdG9wOiAtMTBweDtcXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XFxuICBmb250LXNpemU6IDIwcHg7XFxufVxcblxcbiNjaXR5LFxcbiNjb3VudHJ5IHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogc21hbGxlcjtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsNkJBQTZCO0VBQzdCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGNBQWM7RUFDZDtnQ0FDOEI7RUFDOUIsOEJBQThCO0VBQzlCOzs7O0dBSUM7QUFDSDs7QUFFQTtFQUNFLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixlQUFlO0VBQ2YsYUFBYTtFQUNiLFlBQVk7RUFDWixtQkFBbUI7RUFDbkI7dUNBQ3FDO0FBQ3ZDOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCO3VDQUNxQztBQUN2Qzs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFVBQVU7RUFDVixhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCwyQkFBMkI7RUFDM0IscUNBQXFDO0VBQ3JDLG1CQUFtQjtFQUNuQix5Q0FBeUM7RUFDekMsNEJBQTRCO0VBQzVCLG9DQUFvQztFQUNwQywyQ0FBMkM7RUFDM0MsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7RUFDYiw2QkFBNkI7RUFDN0IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLGVBQWU7QUFDakI7O0FBRUE7O0VBRUUsa0JBQWtCO0VBQ2xCLGtCQUFrQjtBQUNwQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJoZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmJvZHkge1xcbiAgY29sb3I6ICMyNzI0MWM7XFxuICBmb250LWZhbWlseTogcm9ib3RvLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdPcGVuIFNhbnMnLFxcbiAgICAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmO1xcbiAgYmFja2dyb3VuZDogcmdiKDIzOCwgMTc0LCAyMDIpO1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxcbiAgICA5MGRlZyxcXG4gICAgcmdiYSgyMzgsIDE3NCwgMjAyLCAxKSAwJSxcXG4gICAgcmdiYSgxNDgsIDE4NywgMjMzLCAxKSAxMDAlXFxuICApO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgcGFkZGluZy1ib3R0b206IDI1cHg7XFxufVxcblxcbmJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZjM2E1O1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxuICBib3gtc2hhZG93OiByZ2JhKDUwLCA1MCwgOTMsIDAuMjUpIDBweCAycHggNXB4IC0xcHgsXFxuICAgIHJnYmEoMCwgMCwgMCwgMC4zKSAwcHggMXB4IDNweCAtMXB4O1xcbn1cXG5cXG4uY2l0eXNlYXJjaCB7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xcbiAgcGFkZGluZy1yaWdodDogMTVweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XFxuICBib3gtc2hhZG93OiByZ2JhKDUwLCA1MCwgOTMsIDAuMjUpIDBweCAycHggNXB4IC0xcHgsXFxuICAgIHJnYmEoMCwgMCwgMCwgMC4zKSAwcHggMXB4IDNweCAtMXB4O1xcbn1cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLm1haW5Db250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcblxcbi5jdXJyZW50V2VhdGhlckNvbnRhaW5lciB7XFxuICB3aWR0aDogOTAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi53ZWF0aGVyLWRhdGEge1xcbiAgcGFkZGluZzogMyU7XFxuICAvKiBGcm9tIGh0dHBzOi8vY3NzLmdsYXNzICovXFxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjMpO1xcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcXG4gIGJveC1zaGFkb3c6IDAgNHB4IDMwcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDcuNnB4KTtcXG4gIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDcuNnB4KTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSk7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcblxcbi50b3BSb3cge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuI3RlbXB0ZXJhdHVyZSB7XFxuICBmb250LXNpemU6IDQ0cHg7XFxufVxcblxcbiNkZXNjcmlwdGlvbiB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW4tdG9wOiAtMTBweDtcXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XFxuICBmb250LXNpemU6IDIwcHg7XFxufVxcblxcbiNjaXR5LFxcbiNjb3VudHJ5IHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogc21hbGxlcjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJpbmplY3REYXRhIiwidXNlckxvY2F0b3IiLCJ1cGRhdGVEaXNwbGF5Iiwid2VhdGhlclN0b3JhZ2UiLCJmZXRjaFdlYXRoZXIiLCJsb2NhdGlvbiIsInNlYXJjaFdpdGhDaXR5IiwicmVzcG9uc2UiLCJmZXRjaCIsInJlc3BvbnNlRGF0YSIsImpzb24iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJjaXR5VG9TZWFyY2giLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZWFyY2hCdG4iLCJmaXhTcGVjaWFsQ2hhcnMiLCJjaXR5VmFsdWUiLCJ2YWx1ZSIsInRvTG93ZXJDYXNlIiwic3BsaXQiLCJpdGVyYXRlZENpdHkiLCJmb3JFYWNoIiwiZWxlbWVudCIsInB1c2giLCJwYXJzZWRDaXR5Iiwiam9pbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJydW5TZWFyY2giLCJzZWFyY1BhcmFtZXRlciIsImV2ZW50Iiwia2V5Iiwid2VhdGhlckpTT04iLCJyZXF1aXJlIiwid2VhdGhlckRhdGEiLCJ0ZW1wdGVyYXR1cmUiLCJkZXNjcmlwdGlvbiIsImNpdHkiLCJjb3VudHJ5IiwiY3VycmVudEljb24iLCJodW1pZGl0eSIsImFpclByZXNzdXJlIiwiY2hhbmNlT2ZSYWluIiwid2luZFNwZWVkIiwidXBkYXRlTm93IiwidGV4dENvbnRlbnQiLCJjdXJyZW50IiwidGVtcF9jIiwibmFtZSIsInJlZ2lvbiIsImNvbmRpdGlvbiIsInRleHQiLCJwcmVzc3VyZV9tYiIsImZvcmVjYXN0IiwiZm9yZWNhc3RkYXkiLCJkYXkiLCJkYWlseV9jaGFuY2Vfb2ZfcmFpbiIsIndpbmRfa3BoIiwidXBkYXRlQ3VycmVudEljb24iLCJpY29uIiwiZmluZCIsIml0ZW0iLCJjb2RlIiwiaXNfZGF5Iiwic3JjIiwibmlnaHQiLCJhbHQiLCJzdWNjZXNzIiwicG9zIiwidXNlckxvY2F0aW9uIiwiY29vcmRzIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJvcHRpb25zIiwiZW5hYmxlSGlnaEFjY3VyYWN5IiwidGltZW91dCIsIm1heGltdW1BZ2UiLCJlcnIiLCJ3YXJuIiwibWVzc2FnZSIsIm5hdmlnYXRvciIsImdlb2xvY2F0aW9uIiwiZ2V0Q3VycmVudFBvc2l0aW9uIiwibmV3RGF0YSIsImxhdGVzdFdlYXRoZXJEYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==