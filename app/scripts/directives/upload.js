'use strict';

angular.module('cmsApp')
  .directive('upload', function () {
    return {
      restrict: 'A',
      controller: 'UploadCtrl',
      scope: {},
      link: function(scope, el){
        el.bind('change', function(event){
          var files = event.target.files;
          scope.$parent.file = files[0];
          scope.$parent.uploadImage();
          event.target.value = '';
        });
      }
    };
  });
