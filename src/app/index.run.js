(function() {
  'use strict';

  angular
    .module('travelplusManager')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $window) {

    $rootScope.$on('$viewContentLoaded', function() {
      $window.componentHandler.upgradeAllRegistered();
    });
  }

  angular.module('travelplusManager').
  directive('activeLink', ['$location', function (location) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        var clazz = attrs.activeLink;
        var path = attrs.href;
        path = path.substring(1); //hack because path does not return including hashbang
        scope.location = location;
        scope.$watch('location.path()', function (newPath) {
          if (path === newPath) {
            element.addClass(clazz);
          } else {
            element.removeClass(clazz);
          }
        });
      }
    };
  }]);

})();
