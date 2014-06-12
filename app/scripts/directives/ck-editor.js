'use strict';

app.directive('ckEditor', function () {
    return {
      require : '?ngModel',
      link : function($scope, elm, attr, ngModel) {
        var ck = window.CKEDITOR.replace(elm[0]);

        ck.on('instanceReady', function() {
          ck.setData(ngModel.$viewValue);
        });

        ck.on('pasteState', function() {
          $scope.$apply(function() {
            ngModel.$setViewValue(ck.getData());
          });
        });

        ngModel.$render = function() {
          ck.setData(ngModel.$modelValue);
        };
      }
    };
  });