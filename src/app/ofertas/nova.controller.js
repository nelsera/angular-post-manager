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
    
    this.datepicker = function (date){
      if (date) {
        $('[type=date]').removeClass('mdl-js-textfield--dateNull');
      } else {
        $('[type=date]').addClass('mdl-js-textfield--dateNull');
      }
    };
  }
})();
