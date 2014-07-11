'use strict';

angular.module('cmsApp')
  .controller('DatePickerCtrl', function ($scope) {

  $scope.$on( ('postLoaded'), function() {
    if(!$scope.post.content.meta.title) {
      $scope.date = new Date();
      $scope.time = new Date();
    }
    else {
      $scope.date = new Date($scope.post.content.meta.created);
      $scope.time = new Date($scope.post.content.meta.created);
    }

    $scope.hstep = 1;
    $scope.mstep = 1;

    $scope.ismeridian = false;

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.format = 'dd-MMMM-yyyy';

  });

});
