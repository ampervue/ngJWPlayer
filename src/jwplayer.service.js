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

})();