(function() {
  'use strict';

  angular
    .module('travelplusManager')
    .controller('OfertasController', OfertasController);

  /** @ngInject */
  function OfertasController($location, $window, $scope) {
    if (!$window.localStorage.getItem('logged')) {
      $location.path('/');
    }

    var vm=this;
    vm.ativas     = 0;
    vm.rascunhos  = 0;
    vm.expiradas  = 0;

    var starCountRef = firebase.database().ref('ofertas').once('value', function(snap) {
      var array = $.map(snap.val(), function(value, index) {
          return [value];
      });

      angular.forEach(array, function(index, value) {
          var date = new Date(index.data_expiracao);
          var today = new Date();
          today.setHours(0,0,0,0);

          if (index.rascunho) {
            vm.rascunhos++;
          } else if (date < today) {
            vm.expiradas++
          } else {
            vm.ativas++;
          }
          $scope.$apply();
      });
    });
  }
})();
