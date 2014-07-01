'use strict';

angular.module('cmsApp')
.controller('SaveModalCtrl', function ($rootScope, $scope, $timeout, $modalInstance, GitRepository, url, post, fileName, loadPost) {
  $scope.max = 5;
  $scope.problem = false;
  $scope.isCollapse = false;
  $scope.finish = false;

  function updateProgress(step, type, statusMessage, finish){
    $timeout(function(){
      $scope.dynamic = step;
      $scope.type = type;
      $scope.status = statusMessage;
      $scope.finish = finish;
    },0);
  }

  updateProgress(1,'info','Preparando dados');
  var postToCommit = JSON.stringify(post.commitData());

  $rootScope.github.put(url, {
    data: postToCommit,
    cache: false,
    statusCode: {
      409: function(){
        var detail = 'Ei, uma outra pessoa já fez alteração nesse texto.\n\n'+
          'O melhor a se fazer agora é salvar o seus dados em sua maquina e tenta novamente\n\n'+
          'Desculpas pelo transtorno :\/';
        $timeout(function(){
          $scope.problem = true;
          $scope.detail = detail;
        },0);
      }
    }
  }).progress(function(){
    updateProgress(2,'warning','Enviando os dados');
  }).success(function(){
    updateProgress(4,'info','Carregando dados do servidor');

    GitRepository.getPost(url, fileName).done(function(data) {
      loadPost(data);
      updateProgress(5,'success','Salvo com sucesso',true);
    });

  }).error(function(error){
    updateProgress(5,'danger','Ops, um problema aconteceu!',true);
    $timeout(function(){
      $scope.error = error;
    },0);
  });

  $scope.ok = function () {
    $modalInstance.close();
  };
});
