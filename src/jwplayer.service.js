/* global jwplayer */

(function () {
    'use strict';

    angular
        .module('ng-jwplayer')
        .service('jwplayerService', JWPlayerService);

    /* @ngInject */
    function JWPlayerService(jwplayer) {

        this.existJWPlayer = function() {
            return (angular.isDefined(this.myPlayer) && this.myPlayer !== null);
        };

        this.initJWPlayer = function(id) {

            id = id || 'myPlayer1';
            if (this.existJWPlayer()) {

                this.myPlayer.remove();
                this.myPlayer = null;
            }

            this.myPlayer = jwplayer(id);

            return this.myPlayer;
        };

        this.cleanUp = function() {
            if (this.existJWPlayer()) {

                this.myPlayer.remove();
                this.myPlayer = null;
            }
        };
    }

})();