'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt']);

app.controller('MainController', function ($scope) {

    // Given to the <navbar> directive to show the menu.
    $scope.menuItems = [
        { label: 'Home', state: 'home' },
        { label: 'About', state: 'about' },
        { label: 'Tutorial', state: 'tutorial' }
    ];

});


app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});