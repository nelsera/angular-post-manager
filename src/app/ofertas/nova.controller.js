(function() {
  'use strict';

  angular
    .module('travelplusManager')
    .controller('NovaController', NovaController);

  /** @ngInject */
  function NovaController($location, $window, $rootScope, $timeout) {
    if (!$window.localStorage.getItem('logged')) {
      $location.path('/');
    }

    var vm=this;

    vm.form = {
      hoteis: []
    };
    var hotel=0;

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
        $window.firebase.database().ref('ofertas').push(obj, function (err) {
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

      $window.firebase.database().ref('ofertas').push(obj, function (err) {
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

    vm.focused = function (date, el){
      if (date) {
        $(el).removeClass('mdl-js-textfield--dateNull');
      } else {
        $(el).addClass('mdl-js-textfield--dateNull');
      }
    };

    vm.focusedPrice = function (date, el){
      $(el).parent().addClass('is-invalid').removeClass('is-dirty');
      if (date || date==0 || date==undefined) {
        $(el).removeClass('mdl-js-textfield--priceNull');
        if(date){
          $(el).parent().removeClass('is-invalid').addClass('is-dirty');
          //$(el).val(date);
        }
      } else {
        $(el).addClass('mdl-js-textfield--priceNull');
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
