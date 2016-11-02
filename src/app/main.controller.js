(function (){
    'use strict';

    angular
        .module('travelplusManager')
        .controller('Master', Master);

    function Master ($scope, $window, $location) {
    	$scope.logOff = function () {
	      $window.localStorage.removeItem('logged');
	      $location.path('/');
	    };
    }
}());