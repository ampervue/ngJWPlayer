/**
 * Created by David Karchmer on 9/11/15.
 */
(function() {
    'use strict';

    angular
        .module('ng-jwplayer', [
        ]);
})();
/* global jwplayer */

(function () {
    'use strict';

    angular
        .module('ng-jwplayer')
        .service('jwplayerService', JWPlayerService);

    /* @ngInject */
    function JWPlayerService($log) {

        this.existJWPlayer = function() {
            return (angular.isDefined(this.myPlayer) && this.myPlayer !== null);
        };

        this.initJWPlayer = function(id) {

            if (this.existJWPlayer()) {

                $log.debug('Instance of JWPlayer exists. Removing first');
                this.myPlayer.remove();
                this.myPlayer = null;
            }

            this.myPlayer = jwplayer(id);

            return this.myPlayer;
        };

        this.cleanUp = function() {
            if (this.existJWPlayer()) {

                $log.debug('Removing existing JWPlayer');
                this.myPlayer.remove();
                this.myPlayer = null;
            }
        };
    }
    JWPlayerService.$inject = ["$log"];

})();

(function() {
    'use strict';

    angular
        .module('ng-jwplayer')
        .directive('jwplayer', JWPlayer);

    /* @ngInject */
    function JWPlayer($compile, $log, jwplayerService) {

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
    JWPlayer.$inject = ["$compile", "$log", "jwplayerService"];
})();
