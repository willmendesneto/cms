'use strict';

app.directive('upload', function () {
    return {
      restrict: 'A',
      controller: 'UploadCtrl',
      scope: {
        file: '='
      },
      link: function(scope, el, attrs){
        el.bind('change', function(event){
          var files = event.target.files;
          scope.file = files[0];
          scope.$apply();
        });
      }
    };
});
