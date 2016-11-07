(function () {
    'use strict';

    angular
        .module('select.plugin')
        .directive('selectPlugin', selectPlugin);

    selectPlugin.$inject = ['$timeout'];

    /* @ngInject */
    function selectPlugin($timeout) {
        var directive = {
            link: link,
            restrict: 'A',
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            $(function() {
                var options = scope.$eval(attrs.selectPlugin) || {};
                if(attrs.placeholder){
                    options.placeholder = attrs.placeholder;
                }
                $(element).select2(options);
                if (!attrs.multiple) {
                    scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                        $timeout(function() {
                            if (newValue != null &&
                                !(typeof newValue == 'string' &&
                                newValue.length == 0)) {
                                var isDisabled = $(element).is(':disabled');
                                if(isDisabled){
                                    $(element).prop('disabled', false);
                                    $(element).val(newValue).trigger('change');
                                    $(element).prop('disabled', true);
                                    return;
                                }
                                $(element).val(newValue).trigger('change');
                            }
                        });
                    });
                } else {
                    scope.$watchCollection(attrs.ngModel, function(newValue) {
                        $timeout(function() {
                            if (Array.isArray(newValue) && newValue.length != 0 &&
                                typeof newValue != 'undefined') {
                                if(options.tags){
                                    newValue = $.unique(newValue.sort());
                                    $(element).children('option').remove();
                                    $.each(newValue, function (key, value) {
                                        $(element).append($('<option></option>').val(value).html(value));
                                    });
                                    $(element).select2(options);
                                }
                                $(element).val(newValue).trigger('change');
                                $(element).val(newValue).trigger('change');
                            }
                        }, 200);
                    }, true);
                }



                $timeout(function() {
                    scope.$apply();
                });

                $(element).on('select2:select', function(e) {
                    if(!attrs.multiple){
                        ngModel.$setViewValue(e.params.data.id);
                    } else{
                        if(angular.isArray(ngModel.$modelValue)){
                            var clone = ngModel.$modelValue;
                        } else{
                            var clone = [];
                        }
                        if(options.tags){
                            clone = $.unique(clone.sort());
                        }
                        clone.push(e.params.data.id);
                        ngModel.$setViewValue(clone);
                    }
                    scope.$broadcast('select-change:' + attrs.name);
                });

                $(element).on('select2:unselect', function(e) {
                    if(!attrs.multiple){
                        ngModel.$setViewValue('');
                    } else{
                        if(angular.isArray(ngModel.$modelValue)){
                            var clone = ngModel.$modelValue;
                        } else{
                            return false;
                        }
                        clone.splice(clone.indexOf(e.params.data.id), 1);
                        ngModel.$setViewValue(clone);
                    }
                    scope.$broadcast('select-change:' + attrs.name);
                });

            });
        }
    }

})();