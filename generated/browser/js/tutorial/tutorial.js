'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('tutorial', {
        url: '/tutorial',
        templateUrl: 'js/tutorial/tutorial.html',
        controller: 'TutorialCtrl'
    });

});

app.controller('TutorialCtrl', function ($scope) {
    $scope.test = 'cool.';
});