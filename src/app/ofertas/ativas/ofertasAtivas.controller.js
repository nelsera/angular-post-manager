(function() {
  'use strict';

  angular
    .module('travelplusManager')
    .controller('OfertasAtivasController', OfertasAtivasController);

  /** @ngInject */
  function OfertasAtivasController($scope, $window) {
    var vm = this,
        ids = [],
        todas = [],
        ativas = [];

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

          if ( !(date < today) && !value.rascunho ) {
            ativas.push(value);
          }
        });

        vm.ativas = ativas.reverse();
        $scope.$apply();
        $window.componentHandler.upgradeAllRegistered();
    });

  }
})();
