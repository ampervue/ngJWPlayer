
(function() {
    'use strict';

    angular
        .module('ng-jwplayer')
        .directive('jwplayer', JWPlayer);

    /* @ngInject */
    function JWPlayer($compile, $log, $rootScope, jwplayerService) {

        var player;

        var _renderJWPlayerElement = function(scope, element) {
            var id = scope.playerId,
                getTemplate = function (playerId) {
                    return '<div id="' + playerId + '"></div>';
                };

            element.html(getTemplate(id));
            $compile(element.contents())(scope);
            player = jwplayerService.initJWPlayer(id);
            player.setup(scope.playerOptions);

            player.on('ready', function() {
                $rootScope.$broadcast('av-player-ready');
            });


        };

        return {
            restrict: 'EC',
            scope: {
                playerId: '@',
                playerOptions: '='
            },
            link: function (scope, element, attrs) {

                scope.$on('$destroy', function () {
                    $log.debug('jwplayer onDestroy');
                    jwplayerService.cleanUp();
                });

                scope.$watch(function () {
                    return attrs.ngSrc;
                }, function (value) {
                    $log.debug('ng-src has changed: ' + value);
                    if (angular.isDefined(scope.playerOptions)) {
                        scope.playerOptions.file = value;
                        _renderJWPlayerElement(scope, element);
                    }
                });

                if (angular.isDefined(attrs.ngSrc) && angular.isDefined(scope.playerOptions)) {
                    scope.playerOptions.file = attrs.ngSrc;
                    _renderJWPlayerElement(scope, element);
                }
            }
        };
    }
})();
