'use strict';

angular.module('cmsApp')
  .directive('yearDrop', function () {
    var currentYear = new Date().getFullYear();
    return {
      link: function(scope,element,attrs){
        scope.years = [];
        for (var i = +attrs.offset; i < +attrs.range + 1; i++){
          scope.years.push(currentYear + i);
        }
        scope.selected = currentYear;
      },
      template: '<select ng-model="year" class="form-control" ng-options="y for y in years"></select>'
    };
  });
