(function() {
  'use strict';

  angular
    .module('travelplusManager')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope) {

    //$log.debug('runBlock end');

    $rootScope.$on('$viewContentLoaded', function(event, next) {
        componentHandler.upgradeAllRegistered();
    });

  }

})();
