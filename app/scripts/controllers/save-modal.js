'use strict';

angular.module('cmsApp')
.controller('SaveModalCtrl', function ($rootScope, $scope, $timeout, $modalInstance, GitRepository, post, fileName, loadPost) {
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

  function onprogress(){
    updateProgress(2,'warning','Enviando os dados');
  }

  function onerror(error, status){
    var detail = error;
    if(status === 409){
      detail = 'Ei, uma outra pessoa já fez alteração nesse texto.\n\n'+
        'O melhor a se fazer agora é salvar o seus dados em sua maquina e tenta novamente\n\n'+
        'Desculpas pelo transtorno :\/';

    }
    updateProgress(5,'danger','Ops, um problema aconteceu!',true);

    $timeout(function(){
      $scope.problem = true;
      $scope.detail = detail;
    },0);
  }

  function onsuccess(){
    updateProgress(4,'info','Carregando dados do servidor');

    GitRepository.getPost(fileName).success(function(data){
      loadPost(data);
      updateProgress(5,'success','Salvo com sucesso',true);
    }).error(function(error, status){
      onerror(error, status);
    });
  }

  updateProgress(1,'info','Preparando dados');

  GitRepository.save(fileName, JSON.stringify(post.commitData())).progress(function(){
    onprogress();
  }).success(function(){
    onsuccess();
  }).error(function(error, status){
    onerror(error, status);
  });

  $scope.ok = function () {
    $modalInstance.close();
  };
});
