/**
 * The Location controller is used for sharing the weather in a certain location
 */
app.controller('locationCtrl', ($scope, $routeParams, $location, $http) => {
    $scope.searchValid = $routeParams.location !== undefined;
    console.log($scope.searchValid);
    if ($scope.searchValid) {
        console.log($routeParams.location);
        $http.get(generateQueryStringWeather($routeParams.location)).then((data) => {
            $scope.updateWeather(data.data as Weather);
        });
        $scope.updateWeather = (weather: Weather) => {
            $scope.weatherFound = weather != undefined;
            if ($scope.weatherFound) {
                $scope.weatherResult = formatWeatherData(weather);
                applyTheme($scope.weatherResult.weather[0].main);
                console.log($scope.weatherResult);
            }
        };
        setInterval(() => $scope.updateWeather(), REFRESH_RATE);
    }
});