# ng-jwplayer

Angular Directive to instantiate a JWPlayer. Requires a license and JS package from http://www.jwplayer.com/

### Installation

Assumes you have npm and bower installed

~~~~
bower install ng-jwplayer --save
~~~~

### Usage

* Use the jwplayer.js that you downloaded from jwplayer.com, and then include in your html:

~~~~
<script type="text/javascript" src="bower_components/angular/angular.js"></script>
<!-- Remplace xxxxxxxxx with your license code given by JWPLayer -->
<script src="https://content.jwplatform.com/libraries/xxxxxxxxxxxx.js"></script>    
<script type="text/javascript" src="bower_components/ng-jwplayer/jwplayer.min.js"></script>
~~~~

* Create all JWPLayer setup options as a object (see http://support.jwplayer.com/customer/portal/articles/1413113-configuration-options-reference). Add th video file as an ng-src

~~~~
$scope.options = {
   height: 360,
   width: 640,
   advertising: {
   	client: "vast",
	tag: "http://adserver.com/vastTag.xml"
   }
}

$scope.file: "http://example.com/myVideo.mp4",

~~~~

* A sample script will look like this

~~~~
var myApp = angular.module('myApp', ['ng-jwplayer']);
myApp.controller('mainController', ['$scope', '$log', '$sce', function($scope, $log, $sce) {

   $scope.name = 'JWPlayer Example';
            
   $scope.options = {
        type: 'mp4',
        image: 'http://example.com/myVideoPoster.jpg'
   };
            
   $scope.file = $sce.trustAsResourceUrl('http://example.com/myVideo.mp4');

   // Optional: Catch ng-jwplayer event for when JWPlayer is ready
   $scope.$on('ng-jwplayer-ready', function(event, args) {

        $log.info('Player' + args.playerId + 'Ready.');
        // Get player from service
        var player = jwplayerService.myPlayer[args.playerId];
   });
]);

~~~~

* On your HTML, use the jwplayer directive:

~~~~
<jwplayer ng-src="{{ file }}"
          player-options="options"
          player-id="myPlayer1">
</jwplayer>
~~~~

* You can instanciate multiple players

~~~~
<jwplayer ng-src="{{ file1 }}"
          player-options="options1"
          player-id="myPlayer1">
</jwplayer>
<jwplayer ng-src="{{ file2 }}"
          player-options="options2"
          player-id="myPlayer2">
</jwplayer>
~~~~

### Samples

* index1.html shows the most basic example for a single player
* index2.html shows how to instanciate two players on the same view

### Version Changes

* 0.2.0 adds support for multiple players on same view. jwplayerService.myPlayer is now an object and requires the playerID as key

### Contribute

To build, use

~~~~
npm install
bower install
gulp
~~~~

Inspired by ds62987/angular-jwplayer

