app.controller("searchCtrl", ($scope, $http) => {
    $scope.search = "";
    $scope.weatherResult = {} as Weather;
    $scope.options = {
        "city":
        {
            "message": "",
            "visible": false
        } as SearchOption,
        "postcode":
        {
            "message": "",
            "visible": false
        } as SearchOption
        // "coords":
        // {
        //     "message": "",
        //     "visible": false
        // } as SearchOption
    };
    // Reset theme
    applyTheme();
    $scope.updateOptions = () => {
        $scope.weatherResult = {} as Weather;
        $scope.weatherFound = false;
        let validLength = ($scope.search as string).length > 0;
        $scope.options.city.visible = validLength;
        $scope.options.city.message = `Weather in ${$scope.search}`;
        $scope.options.postcode.visible = validLength && ($scope.search as string).length === 4 && /^\d+$/.test($scope.search as string);
        $scope.options.postcode.message = `Weather in area of AUS Post Code ${$scope.search}`;
    };
    $scope.applySearch = (searchParameter: string) => {
        let result: Weather;
        switch (searchParameter.toLowerCase()) {
            case "city":
                $http.get(generateQueryStringWeather($scope.search)).then((data) => {
                    result = data.data as Weather;
                    $scope.updateWeather(result);
                });
                break;
            case "postcode":
                $http.get(generateQueryStringPostCode($scope.search)).then(data => {
                    result = data.data as Weather;
                    $scope.updateWeather(result);
                });
                break;
            default:
                break;
        }
    }
    $scope.updateWeather = (weather: Weather) => {
        $scope.weatherFound = weather != undefined;
        if ($scope.weatherFound) {
            $scope.weatherResult = formatWeatherData(weather);
            applyTheme($scope.weatherResult.weather[0].main);
            console.log($scope.weatherResult);
        }
    };
    $scope.submitWeather = (e: Event) => {
        e.preventDefault();
        let searchParameter = undefined;
        if ($scope.options.city.visible)
            searchParameter = "city";
        else if ($scope.options.postcode.visible)
            searchParameter = "postcode";
        $scope.applySearch(searchParameter);

    };
    $scope.updateOptions();
});