/// <reference path="../../typings/modules/angular/index.d.ts" />

// app can be used application wide to define Angular related code
var app = angular.module("yawa", ['ngRoute']);

// Routing logic
app.config(($routeProvider) => {
    $routeProvider.when('/', {
        templateUrl: '/views/main.html',
        controller: 'mainCtrl'
    });
    $routeProvider.when('/search', {
        templateUrl: '/views/search.html',
        controller: 'searchCtrl'
    });
    $routeProvider.when('/location/:location', {
        templateUrl: '/views/location.html',
        controller: 'locationCtrl'
    });
    $routeProvider.otherwise({
        templateUrl: '/views/error.html'
    });
});
