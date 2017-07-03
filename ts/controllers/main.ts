/**
 * Main/Home Page Controller
 */
app.controller("mainCtrl", ($scope, $http) => {
    $scope.pageTitle = "Home";
    $scope.weatherMessage = "Loading...";
    $scope.mainWeatherObj = {};
    $scope.pinnedWeatherList = [];
    $scope.newPin = {};
    $scope.isPinning = true;
    $scope.isEditingPins = false;
    $scope.firstTime = true;
    $scope.promptAddPin = () => {
        $scope.newPin = {};
        $scope.isPinning = !$scope.isPinning
        $scope.addPinButtonMessage = $scope.isPinning ? "Close" : "Add Pinned";
    };
    $scope.addPinned = () => {
        if ($scope.newPin !== undefined && ($scope.newPin as Pinned).Location !== '' && ($scope.newPin as Pinned).Location !== undefined
            && ($scope.newPin as Pinned).Name !== '' && ($scope.newPin as Pinned).Name !== undefined) {
            let tempPinned = getPinned();
            let newPinned = $scope.newPin as Pinned;
            newPinned.Home = false;
            tempPinned.push(newPinned);
            setPinned(tempPinned);
            $scope.initPinned();
            $scope.loadWeatherMain();
            $scope.promptAddPin();
        }
    };
    $scope.removePin = ($index) => {
        $scope.pinnedWeatherList.splice($index, 1);
        setPinned($scope.pinnedWeatherList);
        $scope.isEditingPins = ($scope.pinnedWeatherList as Array<Pinned>).length > 0;
        $scope.initPinned();
        $scope.loadWeatherMain();
    }
    $scope.changePinEditStatus = () => $scope.isEditingPins = !$scope.isEditingPins;

    $scope.loadWeatherMain = (home = getHome()) => {
        $scope.currentPinned = home;
        $scope.firstTime = $scope.currentPinned === undefined;
        if (!$scope.firstTime) {
            $http.get(generateQueryStringWeather($scope.currentPinned.Location)).then((response) => {
                $scope.weatherObj = formatWeatherData(response.data) as Weather;
                console.log($scope.weatherObj);
                $scope.mainWeatherObj.Current = Math.round($scope.weatherObj.main.temp) as number;
                $scope.mainWeatherObj.Location = `${$scope.weatherObj.name}, ${$scope.weatherObj.sys.country}` as string;
                $scope.mainWeatherObj.Condition = $scope.weatherObj.weather[0].main as string;
                $scope.mainWeatherObj.ConditionIcon = WEATHER_ICONS[$scope.mainWeatherObj.Condition] != undefined ? WEATHER_ICONS[$scope.mainWeatherObj.Condition] : WEATHER_ICONS["fa-sun-o"];
                $scope.weatherMessage = `${$scope.mainWeatherObj.Current}°C`;
                applyTheme($scope.mainWeatherObj.Condition);
            });
            $http.get(generateQueryStringForecast($scope.currentPinned.Location)).then((response) => {
                let res = response.data.list as WeatherForecast[];
                for (let f of res) {
                    f = formatWeatherData(f);
                }
                $scope.homeForecastAll = res;
                $scope.homeForecastIndex = 0;
                $scope.increaseHomeRange();
            });
            $scope.initPinned($scope, $http);
        }
        else {
            $scope.weatherMessage = "You have no pinned locations 😢";
        }
    };
    $scope.pinLocalWeather = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                let coords = pos.coords;
                $http.get(generateQueryStringCoords(coords)).then(data => {
                    let newPinned: Pinned = {
                        Home: true,
                        Name: "Home",
                        Location: `${data.data.sys, name}, ${data.data.sys.country}`
                    };
                    let tempPinned = getPinned();
                    tempPinned.push(newPinned);
                    setPinned(tempPinned);
                    $scope.loadWeatherMain();
                });
            });
        }
    };
    $scope.increaseHomeRange = () => {
        $scope.homeForecastAvailable = $scope.homeForecastIndex * 6 <= ($scope.homeForecastAll as WeatherForecast[]).length;
        if ($scope.homeForecastAvailable)
            $scope.homeForecast = ($scope.homeForecastAll as WeatherForecast[]).slice(0, ++$scope.homeForecastIndex * 6);
    };
    $scope.initPinned = () => {
        let pinnedValues: Array<WeatherPinned> = [];
        for (let p of getPinned()) {
            $http.get(generateQueryStringWeather(p.Location)).then((res) => {
                pinnedValues.push({
                    Data: formatWeatherData(res.data),
                    Home: p.Home,
                    Location: p.Location,
                    Name: p.Name
                });
            });
        }
        $scope.pinnedWeatherList = pinnedValues;
    }
    $scope.selectHome = (name: string) => {
        $scope.loadWeatherMain(setHome(name));
    };
    $scope.loadWeatherMain();
    $scope.promptAddPin();
    setInterval(() => $scope.loadWeatherMain(), REFRESH_RATE);
});