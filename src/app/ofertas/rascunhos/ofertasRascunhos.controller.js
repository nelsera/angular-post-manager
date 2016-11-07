(function() {
  'use strict';

  angular
    .module('travelplusManager')
    .controller('OfertasRascunhosController', OfertasRascunhosController);

  /** @ngInject */
  function OfertasRascunhosController($scope) {
    
    var vm = this;
    var ids = [];
    var todas = [];
    var rascunhos = [];
    
    var starCountRef = firebase.database().ref('ofertas').once('value', function(snap) {
        ids = Object.keys(snap.val());
        todas = $.map(snap.val(), function(value, index) {
            return [value];
        });

        angular.forEach(todas, function(value, index) {
            value.id= ids[index];
        });

        angular.forEach(todas, function(value, index) {
          if ( value.rascunho ) {
            rascunhos.push(value);
          }
        });

        vm.rascunhos = rascunhos.reverse();
        $scope.$apply();
        componentHandler.upgradeAllRegistered();
    });

  }
})();
