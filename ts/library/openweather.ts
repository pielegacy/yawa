/// OpenWeatherAPI Related Functions

//////////////////////////////////
// An OpenWeatherMap API Key is //
// required for this project.   //
// Please assign the key to the //
// constant `API_KEY` for usage.//
//////////////////////////////////

/**
 * Generate a query string for OpenWeatherMap's api weather endpoint
 * @param location the location you wish to query
 */
let generateQueryStringWeather = (location: string): string => `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${API_KEY}`;
/**
 * Generate a query string for OpenWeatherMap's api forecast endpoint
 * @param location the location you wish to query
 */
let generateQueryStringForecast = (location: string): string => `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&APPID=${API_KEY}`;

/**
 * Generate a queury string for OpenWeatherMap's api weather endpoint using coordinates
 */
let generateQueryStringCoords = (coords: Coordinates) => `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&APPID=${API_KEY}`;
/**
 * Generate a queury string for OpenWeatherMap's api weather endpoint using lattitude and longitude
 */
let generateQueryStringCoordsString = (lat: string, lon: string) => `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${API_KEY}`;


/**
 * Generate a query string for OpenWeatherMap's api weather endpoint using an Australian postcode
 */
let generateQueryStringPostCode = (postcode: string) => `http://api.openweathermap.org/data/2.5/weather?zip=${postcode},au&units=metric&APPID=${API_KEY}`;

async function queryWeather($http: any, location: string) {
    return await $http.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${API_KEY}`) as Weather;
}