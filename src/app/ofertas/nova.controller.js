(function() {
  'use strict';

  angular
    .module('travelplusManager')
    .controller('NovaController', NovaController);

  /** @ngInject */
  function NovaController($location, $window) {
    if (!$window.localStorage.getItem('logged')) {
      $location.path('/');
    }

  }
})();
