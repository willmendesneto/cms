'use strict';

angular.module('cmsApp')
  .directive('cmsMaxlength', function() {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        var maxlength = Number(attrs.cmsMaxlength);
        function fromUser(text) {
          if (angular.isUndefined(text)) {
            return false;
          }
          ngModelCtrl.$setValidity('unique', text.length <= maxlength);
          return text;
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  });
