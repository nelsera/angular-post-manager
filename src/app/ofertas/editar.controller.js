(function() {
  'use strict';

  angular
    .module('travelplusManager')
    .controller('EditarController', EditarController);

  /** @ngInject */
  function EditarController($location, $window, $rootScope, $stateParams, $scope) {
    if (!$window.localStorage.getItem('logged')) {
      $location.path('/');
    }

    var vm = this;
    this.form = {
      hoteis: []
    };
    var hotel=0;

    firebase.database().ref('ofertas/'+$stateParams.id).once('value', function(snap) {
      console.log(snap.val());
      vm.form = snap.val();
      vm.form.data_expiracao= new Date(snap.val().data_expiracao);
      $('.mdl-textfield--floating-label').removeClass('is-invalid').addClass('is-dirty');
      $scope.$apply();
    });

    this.sendRascunho=function(data){
      var data = angular.copy(data);
      data.rascunho=true;
      if (data.data_expiracao) {
        data.data_expiracao= data.data_expiracao.toString();
      } else {
        var today = new Date();
        today.setHours(0,0,0,0);
        data.data_expiracao=today.toString();
      }  
      
      if (Object.keys(data).length > 1) {
        firebase.database().ref('ofertas/'+$stateParams.id).push(data, function (err) {
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

    this.sendData = function(data) {
      var data = angular.copy(data);
      data.data_expiracao=data.data_expiracao.toString();
      firebase.database().ref('ofertas/'+$stateParams.id).update(data, function (err) {
        if (err) {
          $rootScope.mdlDialog({
            status: 'error',
            message: '<b>Erro!</b> Sua oferta não foi cadastrada.'
          });
        } else {
          $rootScope.mdlDialog({
            status: 'success',
            message: '<b>Parabéns!</b> Sua nova oferta já está disponível no site.', 
            redirect: '/ofertas/ativas'
          });
        }
      });
    };

    this.datepicker = function (date){
      if (date) {
        $('[type=date]').removeClass('mdl-js-textfield--dateNull');
      } else {
        $('[type=date]').addClass('mdl-js-textfield--dateNull');
      }
    };

    this.addHotel=function(){
      $($('.hotelBox')[++hotel]).removeClass('ng-hide');
      if(hotel===5){
        $('.beforeHotel').hide(0);
      }
    };

    setTimeout(function() {
      $('.hotelBox:not(:first)').addClass('ng-hide');
    },1);
  }
})();
