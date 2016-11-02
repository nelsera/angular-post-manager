(function() {
  'use strict';

  angular
    .module('travelplusManager')
    .controller('OfertasController', OfertasController);

  /** @ngInject */
  function OfertasController($location, $window) {
    if (!localStorage.getItem('logged')) {
      $location.path('/');
    }


    this.logOff = function () {
      $window.localStorage.removeItem('logged');
      $location.path('/');
    };

  }
})();
