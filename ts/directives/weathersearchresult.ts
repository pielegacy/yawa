/**
 * Custome directive used for showing a search result from OpenWeatherMap
 */
app.directive('yawaSearchResult', function ($parse) {
    let direc: any = {};
    let pFunction = (scope, element, attributes) => {
        scope.weatherResult = scope.$eval(attributes.source);
        scope.isSharing = false;
        scope.shareFunction = () => {
            scope.isSharing = true;
        };
        // scope.pinWeather = () => {
        //     let currentPinned = getPinned();
        //     currentPinned.push(<Pinned>{
        //         "Name": `${scope.weatherResult}`,
        //         "Location": `${scope.weatherResult.name},${scope.weatherResult.sys.country}`,
        //         "Home": false
        //     });
        //     setPinned(currentPinned);
        //     window.location.pathname = "";
        // };
    };
    direc.restrict = 'A';
    direc.link = pFunction;
    direc.template =
        `<div class="panel panel-default weather-panel">
                <div class="panel-body">
                    <h2> <span id="weather-icon" class="fa {{weatherResult.ConditionIcon}}"
                                                aria-hidden="true"></span> {{weatherResult.main.temp_min}}/{{weatherResult.main.temp_max}}°C</h2>
                    <h3 class="label-location">Weather in <span class="text-capitalize">{{weatherResult.name}}</span></h3>
                    <button data-ng-click="shareFunction()" title="Share this location with a special link" data-ng-show="!isSharing" class="btn btn-info"><i class="fa fa-share-square-o" aria-hidden="true"></i> Share</button>
                    <div class="div-share" data-ng-show="isSharing">
                        <hr/>
                        <textarea readonly class="form-control input-sm textarea-share" rows="1">https://yawa.surge.sh/#/location/{{weatherResult.name}},{{weatherResult.sys.country}}</textarea>
                        <i>Use this link to share the weather for this location with friends</i>
                    </div>
                </div>
            </div>`;
    return direc;
});