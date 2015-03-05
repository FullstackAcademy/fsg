app.factory('SecretStash', function ($http) {
   return {
       getStash: function () {
           return $http.get('/api/members/secret-stash').then(function (response) {
               return response.data;
           });
       }
   };
});

app.config(function ($stateProvider) {

    $stateProvider.state('membersOnly', {
        url: '/members-area',
        template: '<img ng-repeat="item in stash" width="300" ng-src="{{ item }}" />',
        controller: function ($scope, SecretStash) {
            SecretStash.getStash().then(function (stash) {
                $scope.stash = stash;
            });
        },
        data: {
            authenticate: true
        }
    });

});