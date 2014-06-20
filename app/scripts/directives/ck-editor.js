'use strict';

angular.module('cmsApp')
  .directive('ckEditor', function () {
    return {
      require : '?ngModel',
      link : function($scope, elm, attr, ngModel) {
        var ck = window.CKEDITOR.replace(elm[0]);
        ck.config.customConfig = '/scripts/ck-editor-plugins/config.js';

        if(!ngModel) {
          return;
        }

        ck.on('pasteState', function() {
          $scope.$apply(function() {
            ngModel.$setViewValue(ck.getData());
          });
        });

        ngModel.$render = function() {
          ck.setData(ngModel.$viewValue);
        };
      }
    };
  });
