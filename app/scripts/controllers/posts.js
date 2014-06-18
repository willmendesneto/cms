'use strict';

angular.module('cmsApp')
  .controller('PostsCtrl', function ($scope, $rootScope, _, Post, $filter, Posts) {

  Posts.success(function(data){
    $scope.$apply(function() {
      $rootScope.posts = _.map(data, Post.makePost);

      $scope.currentPage = 0;

      $scope.pageSize = 10;

      $scope.numberOfPages = function(){
        return Math.ceil($rootScope.posts.length/$scope.pageSize);
      };

      $scope.tableOrderBy = function(expression, reverse){
        $scope.posts = $filter('orderBy')($rootScope.posts, expression, reverse);
      };

      $scope.nextPage = function(){
        $scope.currentPage=$scope.currentPage+1;
      };

      $scope.previousPage = function(){
        $scope.currentPage=$scope.currentPage-1;
      };
    });
  });

});
