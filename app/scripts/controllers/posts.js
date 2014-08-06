'use strict';

angular.module('cmsApp')
  .controller('PostsCtrl', function ($scope, $rootScope, PostsSearchEngine) {

    $scope.year = (new Date()).getFullYear();
    $scope.month = (new Date()).getMonth();

    $scope.searchEngine = PostsSearchEngine.create();
    $scope.find = function(){
      $scope.searchEngine.find($scope.year, $scope.month);
    };
  });
