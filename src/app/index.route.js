(function() {
  'use strict';

  angular
    .module('travelplusManager')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('ofertas', {
        url: '/ofertas',
        templateUrl: 'app/ofertas/ofertas.html',
        controller: 'OfertasController',
        controllerAs: 'ofertas'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
