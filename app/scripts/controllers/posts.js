'use strict';

angular.module('cmsApp')
  .controller('PostsCtrl', function ($scope, $rootScope, _, Post, $filter, GitRepository, $timeout) {

  GitRepository.getDrafts().success(function(data){
    $timeout(function(){
      $rootScope.posts = _.map(data, Post.makePost);

      $scope.currentPage = 0;

      $scope.pageSize = 10;

      $scope.numberOfPages = function(){
        return Math.ceil($rootScope.posts.length/$scope.pageSize);
      };

      $scope.nextPage = function(){
        $scope.currentPage=$scope.currentPage+1;
      };

      $scope.previousPage = function(){
        $scope.currentPage=$scope.currentPage-1;
      };
    }, 0);
  });

});
