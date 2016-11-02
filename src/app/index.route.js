(function() {
  'use strict';

  angular
    .module('travelplusManager')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('ofertas', {
        url: '/ofertas',
        templateUrl: 'app/ofertas/listagem.html',
        controller: 'OfertasController',
        controllerAs: 'ofertas'
      })
      .state('ofertas/ativas', {
        url: '/ofertas/ativas',
        templateUrl: 'app/ofertas/ativas/listagem.html',
        controller: 'OfertasAtivasController',
        controllerAs: 'ofertasAtivas'
      })
      .state('ofertas/nova', {
        url: '/ofertas/nova',
        templateUrl: 'app/ofertas/nova.html',
        controller: 'NovaController',
        controllerAs: 'nova'
      })
      .state('ofertas/expiradas', {
        url: '/ofertas/expiradas',
        templateUrl: 'app/ofertas/expiradas/listagem.html',
        controller: 'OfertasExpiradasController',
        controllerAs: 'ofertasExpiradas'
      })
      .state('ofertas/rascunhos', {
        url: '/ofertas/rascunhos',
        templateUrl: 'app/ofertas/rascunhos/listagem.html',
        controller: 'OfertasRascunhosController',
        controllerAs: 'ofertasRascunhos'
      });

    $urlRouterProvider.otherwise('/login');
  }

})();
