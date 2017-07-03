//////////////////////////
// YAWA Major Functions //
//////////////////////////


/**
 * Weather Condition to Font Awesome Icon Mappings
 */
const WEATHER_ICONS =
    {
        "Clear": "fa-sun-o",
        "Rain": "fa-tint",
        "Clouds": "fa-cloud"
    };

/**
 * A sample pinned location for debug purposes
 */
const DEBUG_ELTHAM: Pinned = {
    Home: true,
    Location: "Eltham,au",
    Name: "Eltham"
};

const REFRESH_RATE: Number = 30000;
/**
 * Safely load the pinned locations array for the current user
 */
const getPinned = (): Array<Pinned> => localStorage["yawa_pinned"] !== undefined ? (JSON.parse(localStorage["yawa_pinned"]) as Pinned[]).sort((a, b) => a.Home === true && b.Home === false ? 0 : 1) : [] as Array<Pinned>;

/**
 * Safely save the pinned locations array for the current user
 * @param val the array to replace the currently saved YAWA pinned locations
 */
const setPinned = (val: Array<Pinned>) => localStorage["yawa_pinned"] = JSON.stringify(val);

/**
 * Get Home Pinned or return the first pinned and set that first element as home in the process
 */
const getHome = (): Pinned => {
    let pinned: Pinned[] = getPinned();
    if (pinned.length > 0) {
        let pinnedFiltered: Pinned = pinned.filter((p) => p.Home)[0];
        return pinnedFiltered != undefined && pinnedFiltered != null ? pinnedFiltered : setHome(pinned[0].Name);
    }
    else
        return undefined;
};

/**
 * Set Home Pinned based on name
 */
const setHome = (name: String): Pinned => {
    let pinned: Pinned[] = getPinned();
    let res: Pinned;
    for (let r of pinned) {
        if (r.Name === name) {
            r.Home = true;
            res = r;
        }
        else
            r.Home = false;
    }
    setPinned(pinned);
    console.log(pinned);
    return res;
};

/**
 * Download an OpenWeatherMap Weather Result and seriazize it as a Weather class
 * @param scope Angular App's scope 
 * @param http Angular App's http
 * @param location The location string to call
 */
const retrieveWeather = ($scope, $http, location: string): Weather => {
    let result: Weather = new Weather();
    $http.get(generateQueryStringWeather(location)).then((res) => {
        result.main = res.data.main;
        result.weather = res.data.weather;
        result.sys = res.data.sys;
        result.name = res.data.name;
    });
    return result;
};

/**
 * Download an OpenWeatherMap Forecast Result and serialize it as a weather class
 * @param scope Angular App's scope 
 * @param http Angular App's http
 * @param location The location string to call
 */
const retrieveForecast = ($scope, $http, location: string): Array<WeatherForecast> => {
    let result: WeatherForecast[];
    $http.get(generateQueryStringForecast(location)).then((res) => {
        result = res.data.list as WeatherForecast[];
        for (let f of res.data.list)
            f = formatWeatherData(f);
    });
    return result;
}
/**
 * Format weather data fields to be more readable
 * @param data weather payload
 */
const formatWeatherData = (data: any): any => {
    // Round temperature values
    data.main.temp = Math.round(data.main.temp);
    data.main.temp_min = Math.round(data.main.temp_min);
    data.main.temp_max = Math.round(data.main.temp_max);
    let conditionString = data.weather[0].main;
    data.ConditionIcon = WEATHER_ICONS[conditionString] != undefined ? WEATHER_ICONS[conditionString] : WEATHER_ICONS["fa-sun-o"];
    if (data.dt_txt !== undefined)
        data.dt_txt = formatForecastDate(data.dt_txt);
    return data;
};
/**
 * Format the forecast date of a WeatherForecast into a readable string
 */
const formatForecastDate = (dt_txt: string): string => {
    let result = dt_txt;
    let resultDate = new Date(dt_txt);
    if (resultDate.getDate() == new Date().getDate())
        result = `Today, ${resultDate.getHours()}:00`;
    else
        result = `${resultDate.toLocaleDateString()}, ${resultDate.getHours()}:00`;
    return result;
};
/**
 * A simple Key-value store containing the the yawa themes based off the weather conditions.
 * The index for APP_THEMES can be a keyword such as 'SUNNY' but there is support for using
 * weather conditions as well
 */
const APP_THEMES = {
    "sunny" : "theme-sunny",
    "cloudy" : "theme-cloudy",
    "clouds" : "theme-cloudy",
    "clear sky": "theme-clear",
    "clear": "theme-clear",
    "rain": "theme-rain",
    "thunderstorm" : "theme-rain"
};
/**
 * Apply a new theme to application depending on the current weather
 * @param themeId the ID of the theme in reference to APP_THEMES
 */
const applyTheme = (themeId: string = "theme-default") => {
    console.log(themeId.toLowerCase());
    let currentTheme = APP_THEMES[themeId.toLowerCase()] !== undefined ? APP_THEMES[themeId.toLowerCase()] : "theme-default";
    console.log(`Theme is ${currentTheme}`);
    document.body.className = currentTheme;
};