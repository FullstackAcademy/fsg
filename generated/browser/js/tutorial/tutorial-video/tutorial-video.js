'use strict';
app.directive('tutorialVideo', function ($sce) {

    var formYoutubeURL = function (id) {
        return 'https://www.youtube.com/embed/' + id;
    };

    return {
        restrict: 'E',
        templateUrl: 'js/tutorial/tutorial-video/tutorial-video.html',
        scope: {
            video: '='
        },
        link: function (scope) {
            scope.trustedYoutubeURL = $sce.trustAsResourceUrl(formYoutubeURL(scope.video.youtubeID));
        }
    };

});