/* global jwplayer */
/**
 * Created by David Karchmer on 9/11/15.
 */
(function() {
    'use strict';

    angular
        .module('ng-jwplayer', [])
        .constant('jwplayer', jwplayer);

})();
/* global jwplayer */

(function () {
    'use strict';

    angular
        .module('ng-jwplayer')
        .service('jwplayerService', JWPlayerService);

    /* @ngInject */
    function JWPlayerService(jwplayer) {
        
        this.myPlayer = {};

        this.existJWPlayer = function(id) {
            return (angular.isDefined(this.myPlayer) && 
                    angular.isDefined(this.myPlayer[id]) && 
                    this.myPlayer[id] !== null);
        };

        this.initJWPlayer = function(id) {

            // Always delete the player, if it exists
            this.cleanUp(id);

            this.myPlayer[id] = jwplayer(id);

            return this.myPlayer[id];
        };

        this.cleanUp = function(id) {
            if (this.existJWPlayer(id)) {
                this.myPlayer[id].remove();
                this.myPlayer[id] = null;
            }
        };
    }
    JWPlayerService.$inject = ["jwplayer"];

})();

(function() {
    'use strict';

    angular
        .module('ng-jwplayer')
        .directive('jwplayer', JWPlayer);

    /* @ngInject */
    function JWPlayer($compile, $log, $rootScope, jwplayerService) {

        var player;

        var _renderJWPlayerElement = function(scope, element) {
            var playerId = scope.playerId || 'myPlayer1';
            var getTemplate = function (playerId) {
                    return '<div id="' + playerId + '"></div>';
                };

            element.html(getTemplate(playerId));
            $compile(element.contents())(scope);
            player = jwplayerService.initJWPlayer(playerId);
            player.setup(scope.playerOptions);

            player.on('ready', function() {
                $rootScope.$broadcast('ng-jwplayer-ready', { 
                    playerId: playerId 
                 });
            });

        };

        return {
            restrict: 'EC',
            scope: {
                playerId: '@',
                playerOptions: '='
            },
            link: function (scope, element, attrs) {
                
                var playerId = scope.playerId || 'myPlayer1';

                scope.$on('$destroy', function () {
                    $log.debug('jwplayer onDestroy: ' + playerId);
                    jwplayerService.cleanUp(playerId);
                });

                scope.$watch(function () {
                    return attrs.ngSrc;
                }, function (value) {
                    $log.debug('ng-src(' + playerId + ') has changed: ' + value);
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
    JWPlayer.$inject = ["$compile", "$log", "$rootScope", "jwplayerService"];
})();
