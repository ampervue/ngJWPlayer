/* global jwplayer */

(function () {
    'use strict';

    angular
        .module('ng-jwplayer')
        .service('jwplayerService', JWPlayerService);

    /* @ngInject */
    function JWPlayerService(jwplayer, $log) {
        
        this.myPlayer = {};

        this.existJWPlayer = function(id) {
            return (angular.isDefined(this.myPlayer) && 
                    angular.isDefined(this.myPlayer[id]) && 
                    this.myPlayer[id] !== null);
        };

        this.initJWPlayer = function(id) {

            if (!this.existJWPlayer(id)) {
                $log.log('Initializing jwplayer for ' + id);
                this.myPlayer[id] = jwplayer(id);
            }

            return this.myPlayer[id];
        };

        this.cleanUp = function(id) {
            if (this.existJWPlayer(id)) {
                this.myPlayer[id].remove();
                this.myPlayer[id] = null;
            }
        };
    }

})();