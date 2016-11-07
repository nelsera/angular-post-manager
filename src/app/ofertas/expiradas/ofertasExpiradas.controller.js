(function() {
  'use strict';

  angular
    .module('travelplusManager')
    .controller('OfertasExpiradasController', OfertasExpiradasController);

  /** @ngInject */
  function OfertasExpiradasController($scope) {
    
    var vm = this;
    var ids = [];
    var todas = [];
    var expiradas = [];

    var starCountRef = firebase.database().ref('ofertas').once('value', function(snap) {
        ids = Object.keys(snap.val());
        todas = $.map(snap.val(), function(value, index) {
            return [value];
        });

        angular.forEach(todas, function(value, index) {
            value.id= ids[index];
        });

        angular.forEach(todas, function(value, index) {
          var date = new Date(value.data_expiracao);
          var today = new Date();
          today.setHours(0,0,0,0);

          if ( date < today && !value.rascunho ) {
            expiradas.push(value);
          }
        });

        vm.expiradas = expiradas.reverse();
        $scope.$apply();
        componentHandler.upgradeAllRegistered();
    });

  }
})();
