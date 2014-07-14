'use strict';

angular.module('cmsApp')
  .controller('DatePickerCtrl', function ($scope, DateUtil) {

  $scope.$on('postLoaded', function(event, post) {
    $scope.selectedDate = new Date(post.content.meta.created);
    $scope.selectedTime = new Date(post.content.meta.created);

    $scope.updateDate = function(){
      post.content.meta.created = DateUtil.getTimestamp($scope.selectedDate, $scope.selectedTime);
    };

  });

});
