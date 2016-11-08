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
        })
        .filter('cmdate', [
            '$filter', function($filter) {
                return function(input, format) {
                    return $filter('date')(new Date(input), format);
                };
            }
        ]);

    angular.module('maskMoney', [])
    .directive('maskMoney', function($timeout, $locale) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                model: '=ngModel',
                mmOptions: '=?',
                prefix: '=',
                suffix: '=',
                affixesStay: '@',
                thousands: '@',
                decimal: '@',
                precisoin: '@',
                allowZero: '@',
                allowNegative: '@'
            },
            link: function(scope, el, attr, ctrl) {
                function checkOptions() {
                    return scope.mmOptions;
                }

                function eventHandler() {
                    $timeout(function() {
                        scope.$apply(function() {
                            ctrl.$setViewValue($(el).val());
                        });
                    });
                }

                function init() {
                    $timeout(function() {
                        var elOptions = {
                            prefix: scope.prefix || '',
                            suffix: scope.suffix,
                            affixesStay: scope.affixesStay,
                            thousands: scope.thousands || $locale.NUMBER_FORMATS.GROUP_SEP,
                            decimal: scope.decimal || $locale.NUMBER_FORMATS.DECIMAL_SEP,
                            precision: scope.precision,
                            allowZero: scope.allowZero,
                            allowNegative: scope.allowNegative
                        };

                        if (!scope.mmOptions) {
                            scope.mmOptions = {};
                        }

                        for (var elOption in elOptions) {
                            if (elOptions[elOption]) {
                                scope.mmOptions[elOption] = elOptions[elOption];
                            }
                        }

                        $(el).maskMoney(scope.mmOptions);
                        $(el).maskMoney('mask');
                        eventHandler();

                    }, 0);

                    $timeout(function() {
                        scope.$apply(function() {
                            ctrl.$setViewValue($(el).val());
                        });
                    });
                }

                scope.$watch(checkOptions, init, true);

                scope.$watch(attr.ngModel, eventHandler, true);
                el.on('keyup', eventHandler); //change to $watch or $observe

                //this parser will unformat the string for the model behid the scenes
                function parser() {
                    return $(el).maskMoney('unmasked')[0];
                }
                ctrl.$parsers.push(parser);

                ctrl.$formatters.push(function(value) {
                    $timeout(function() {
                        init();
                    });
                    return parseFloat(value).toFixed(2);
                });
            }
        };
    });
}());