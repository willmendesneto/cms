'use strict';

angular.module('cmsApp')
  .controller('PostsCtrl', function ($scope, $rootScope, _, Post, $filter, Posts) {

  // $rootScope.posts = [];
  Posts.success(function(data){
    $rootScope.posts = _.map(data, Post.makePost);
  });

  $scope.currentPage = 0;

  $scope.pageSize = 10;

  /**
   * Returns the number page based in params
   * @return {[type]} [description]
   */
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
