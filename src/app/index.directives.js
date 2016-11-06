(function (){
    'use strict';

    angular
        .module('travelplusManager')
        .directive('validFile', function () {
            return {
                require: 'ngModel',
                link: function (scope, el, attrs, ngModel) {
                    el.bind('change', function (changeEvent) {
                        var reader = new FileReader();

                        reader.onload = function (loadEvent) {
                            ngModel.$render = function () {
                                ngModel.$setViewValue(loadEvent.target.result);
                            };
                            scope.$apply(function () {
                                ngModel.$render();
                            });
                        };
                        reader.readAsDataURL(changeEvent.target.files[0]);

                    });
                }
            };
        });
}());