'use strict';

angular.module('cmsApp')
  .controller('DatePickerCtrl', function ($scope, DateUtil) {

  $scope.$on('postLoaded', function(event, post) {
    var dateCreated = post.content.meta.created * 1000;
    $scope.selectedDate = new Date(dateCreated);
    $scope.selectedTime = new Date(dateCreated);

    $scope.updateDate = function() {
      post.content.meta.created = DateUtil.getTimestamp($scope.selectedDate, $scope.selectedTime);
    };

  });

});
