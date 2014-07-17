'use strict';

angular.module('cmsApp')
.controller('LoadingModalCtrl', function ($rootScope, $scope, $timeout, $modalInstance, GitRepositoryNew, fileName, loadPost) {
  $scope.max = 2;
  $scope.problem = false;
  $scope.isCollapse = false;
  $scope.finish = false;

  function updateProgress(step, type, statusMensage, finish){
    $timeout(function(){
      $scope.dynamic = step;
      $scope.type = type;
      $scope.status = statusMensage;
      $scope.finish = finish;
    },0);
  }

  function onerror(error){
    updateProgress(2,'danger','Ops, um problema aconteceu!',true);
    $timeout(function(){
      $scope.error = error;
    },0);
  }

  function onsuccess(data) {
    loadPost(data);
    updateProgress(2,'success','Ok, tudo pronto!',true);
    $modalInstance.close();
  }


  $timeout(function(){
    updateProgress(1,'info','Carregando dados');

    GitRepositoryNew.getPost(fileName).success( function(data) {
      onsuccess(data);
    }).error(function(error){
      onerror(error);
    });
  },2);

});
