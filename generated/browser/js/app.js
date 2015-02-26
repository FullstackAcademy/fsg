'use strict';

// TODO: This seems like something that can "generated".
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt']);

app.controller('MainController', function ($scope) {

    $scope.menuItems = [
        { label: 'Home', state: 'home' },
        { label: 'About', state: 'about' },
        { label: 'Tutorial', state: 'tutorial' }
    ];

});

app.config(function ($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
});