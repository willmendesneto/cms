'use strict';

angular.module('cmsApp')
  .controller('PostsCtrl', function ($scope, $rootScope, _, $filter, GitRepository, $timeout, Alert) {

    $scope.year = (new Date()).getFullYear();
    $scope.month = (new Date()).getMonth();
    $scope.searchDone = true;

    $scope.find = function(){
      $scope.searchDone = false;
      $scope.posts = [];
      GitRepository.getPosts($scope.year, $scope.month)
      .success(function(data){
        $timeout(function(){
          $scope.posts = _.map(data, function(data){
            return {
              sha: data.sha,
              name: data.name,
              path: data.path,
              year: $scope.year,
              month: $scope.month,
            };
          });

        }, 0);
      }).error(function(error){
        if(error.status == 404){
          Alert.showInfo('Vixe, a pesquisa não encontrou nada, tente com outras opções.');
        }else{
          Alert.showError(error.status, error.responseText);
        }
      }).complete(function(){
        $scope.searchDone = true;
      });
    };
  });
