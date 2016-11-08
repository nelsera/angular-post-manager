(function() {
  'use strict';

  angular
    .module('travelplusManager')
    .controller('OfertasExpiradasController', OfertasExpiradasController);

  /** @ngInject */
  function OfertasExpiradasController($scope, $window) {
    
    var vm = this,
        ids = [],
        todas = [],
        expiradas = [];

    $window.firebase.database().ref('ofertas').once('value', function(snap) {
        ids = Object.keys(snap.val());
        todas = $.map(snap.val(), function(value) {
            return [value];
        });

        angular.forEach(todas, function(value, index) {
            value.id= ids[index];
        });

        angular.forEach(todas, function(value) {
          var date = new Date(value.data_expiracao),
          today = new Date();
          today.setHours(0,0,0,0);

          if ( date < today && !value.rascunho ) {
            expiradas.push(value);
          }
        });

        vm.expiradas = expiradas.reverse();
        $scope.$apply();
        $window.componentHandler.upgradeAllRegistered();
    });

  }
})();
