'use strict';

angular.module('cmsApp')
  .directive('selectOnFocus', function () {
    return {
      restrict: 'A',
      link: function (scope, element) {
        element.on('focus', function () {
          this.select();
        });
      }
    };
  });
