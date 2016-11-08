(function (){
    'use strict';

    angular
        .module('travelplusManager')
        .controller('MainController', MainController);

    function MainController ($scope, $window, $location, $rootScope, $timeout) {
        $scope.logOff = function () {
          $window.localStorage.removeItem('logged');
          $location.path('/');
        };

        $rootScope.mdlDialog=function(obj){
          var dialog = document.querySelector('dialog');
          dialog.showModal();
          $timeout(function (){
            dialog.close();
            $('.mdl-dialog').removeClass().addClass('mdl-dialog');
          },3000);
          $('.mdl-dialog').removeClass().addClass('mdl-dialog '+obj.status);
          dialog.innerHTML=obj.message; 
          if (obj.redirect) $location.path( obj.redirect );

          if (!$rootScope.$$phase) $rootScope.$apply();
        };

        $rootScope.remove=function(id){
            $window.firebase.database().ref('ofertas/'+id).remove();
            $('#'+id).remove();
            $rootScope.mdlDialog({
                status: 'success',
                message: '<b>Parabéns!</b> A oferta foi removida com sucesso.'
              });
        };
    }
}());
