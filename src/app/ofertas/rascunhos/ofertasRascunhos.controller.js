(function() {
  'use strict';

  angular
    .module('travelplusManager')
    .controller('OfertasRascunhosController', OfertasRascunhosController);

  /** @ngInject */
  function OfertasRascunhosController($scope, $window) {
    
    var vm = this,
        ids = [],
        todas = [],
        rascunhos = [];
    
    $window.firebase.database().ref('ofertas').once('value', function(snap) {
        ids = Object.keys(snap.val());
        todas = $.map(snap.val(), function(value) {
            return [value];
        });

        angular.forEach(todas, function(value, index) {
            value.id= ids[index];
        });

        angular.forEach(todas, function(value) {
          if ( value.rascunho ) {
            rascunhos.push(value);
          }
        });

        vm.rascunhos = rascunhos.reverse();
        $scope.$apply();
        $window.componentHandler.upgradeAllRegistered();
    });

  }
})();
