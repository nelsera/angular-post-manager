(function() {
  'use strict';

  angular
    .module('travelplusManager')
    .controller('EditarController', EditarController);

  /** @ngInject */
  function EditarController($location, $window, $rootScope, $stateParams, $scope, $timeout) {
    if (!$window.localStorage.getItem('logged')) {
      $location.path('/');
    }

    var vm = this;
    vm.form = {
      hoteis: []
    };
    var hotel=0;

    $window.firebase.database().ref('ofertas/'+$stateParams.id).once('value', function(snap) {
      vm.form = snap.val();
      vm.form.data_expiracao= new Date(snap.val().data_expiracao);
      $('.mdl-textfield--floating-label').removeClass('is-invalid').addClass('is-dirty');
      $('[ng-model="editar.form.data_expiracao"]').removeClass('mdl-js-textfield--dateNull');
      if (vm.form.hoteis) hotel = vm.form.hoteis.length-1;
      if(hotel===5){
        $('.beforeHotel').hide(0);
      }
      $scope.$apply();
    });

    vm.sendRascunho=function(data){
      var obj = angular.copy(data);
      obj.rascunho=true;
      if (obj.data_expiracao) {
        obj.data_expiracao= obj.data_expiracao.toString();
      } else {
        var today = new Date();
        today.setHours(0,0,0,0);
        obj.data_expiracao=today.toString();
      }  
      
      if (Object.keys(obj).length > 1) {
        $window.firebase.database().ref('ofertas/'+$stateParams.id).push(obj, function (err) {
          if (err) {
            $rootScope.mdlDialog({
              status: 'error',
              message: '<b>Erro!</b> Seu rascunho não foi salvo.'
            });
          } else {
            $rootScope.mdlDialog({
              status: 'success',
              message: '<b>Rascunho salvo!</b> Retorne ao cadastro quando quiser publicar a oferta.', 
              redirect: '/ofertas/rascunhos'
            });
          }
        });  
      }
    };

    vm.sendData = function(data) {
      var obj = angular.copy(data);
      obj.data_expiracao=obj.data_expiracao.toString();

      angular.forEach(obj.hoteis, function(value, index){
        if(obj.hoteis[index].preco_hotel==0){
          delete obj.hoteis[index].preco_hotel;
        }
      });

      $window.firebase.database().ref('ofertas/'+$stateParams.id).update(obj, function (err) {
        if (err) {
          $rootScope.mdlDialog({
            status: 'error',
            message: '<b>Erro!</b> Sua oferta não foi cadastrada.'
          });
        } else {
          $rootScope.mdlDialog({
            status: 'success',
            message: '<b>Parabéns!</b> Sua oferta foi editada com sucesso.', 
            redirect: '/ofertas/ativas'
          });
        }
      });
    };

    vm.datepicker = function (date){
      if (date) {
        $('[type=date]').removeClass('mdl-js-textfield--dateNull');
      } else {
        $('[type=date]').addClass('mdl-js-textfield--dateNull');
      }
    };

    vm.addHotel=function(){
      $($('.hotelBox')[++hotel]).removeClass('ng-hide');
      if(hotel===5){
        $('.beforeHotel').hide(0);
      }
    };

    $timeout(function() {
      $('.hotelBox:not(:first)').addClass('ng-hide');
    },1);
  }
})();
