'use strict';

angular.module('cmsApp')
  .directive('warnsize', function () {
    return {
      restrict: 'A',
      scope: {
        maxLength: '=maxLength'
      },
      link: function(scope, el){
        el.bind('keyup', function(event){
          var element = event.target;
          if (element.value.length > scope.maxLength) {
            element.style['background-color'] = '#ffbbbb';
          } else {
            element.style['background-color'] = '';
          }
        });
      }
    };
  });
