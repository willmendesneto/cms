'use strict';

angular.module('cmsApp')
  .controller('PostsCtrl', function ($scope, $rootScope, _, Post, $filter, GitRepository, $timeout) {

    function filterPostByDate(data){
      var date;
      data.filter(function(item){
        date = item.name.substring(0, 10).split('-');
        item.reverseDate = date.join('');
        item.publishDate = date.reverse().join('/');
      });
      return data;
    }

    GitRepository.getDrafts().success(function(data){
      $timeout(function(){

        data = filterPostByDate(data);

        $scope.posts = _.map(data, Post.makePost);

        $scope.reverse = true;

        $scope.predicate = 'reverseDate';

        $scope.currentPage = 0;

        $scope.pageSize = 10;

        $scope.numberOfPages = function(){
          return Math.ceil($scope.filteredData.length/$scope.pageSize);
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
