/**
 * Weather interface defines an interface used to map the data
 * from a OpenWeatherAPI query
 */
class Weather {
    public main: {
        temp: number,
        temp_max: number,
        temp_min: number
    };
    public weather: {
        description: string,
        main: string
    }[];

    public sys: {
        country: string
    };

    public name: string;

    /**
     * Return the current temperature rounded to the nearest number
     */
    public Current = (): number => Math.round(this.main.temp);

    public Location = (): string => `${this.name}, ${this.sys.country}` as string;

    public Condition = (): string => this.weather[0].main;

    public ConditionIcon = (): string => WEATHER_ICONS[this.Condition()];


}

/**
 * WeatherFuture is used for get future weather forecasts for an area
 */
class WeatherForecast extends Weather {
    public dt_txt: Date;
}