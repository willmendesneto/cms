'use strict';
/* jshint undef:false */

angular.module('cmsApp')
  .directive('ckEditor', function () {
    return {
      require : '?ngModel',
      link : function($scope, elm, attr, ngModel) {
        var ck = window.CKEDITOR.replace(elm[0]);

        CKEDITOR.plugins.addExternal('youtube','/cms/ckeditor-plugins/youtube/', 'plugin.js');

        ck.config.extraPlugins = 'youtube';
        ck.config.height = '100%';
        ck.config.language = 'pt-BR';

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
