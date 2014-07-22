'use strict';

angular.module('cmsApp')
  .controller('DatePickerCtrl', function ($scope, DateUtil) {

  $scope.$on('postLoaded', function(event, post) {
    var dateCreated = post.metadata.created * 1000;
    if (!dateCreated){
      $scope.selectedDate = new Date();
      $scope.selectedTime = new Date();
    }
    else {
      $scope.selectedDate = new Date(dateCreated);
      $scope.selectedTime = new Date(dateCreated);
    }

    $scope.updateDate = function() {
      post.metadata.created = DateUtil.getTimestamp($scope.selectedDate, $scope.selectedTime);
    };

  });

});
