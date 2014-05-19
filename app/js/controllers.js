'use strict';

angular.module('cms.controllers', [])
  .controller('MyCtrl1', ['$scope', function($scope) {

  }])
  .controller('MyCtrl2', ['$scope', function($scope) {
  
  }])
  .controller('LoginCtrl', ['$scope', '$rootScope', 'OAuth', 'GithubClient', function($scope, $rootScope, OAuth, GithubClient) {
    $scope.login = function() {
      OAuth.popup('github');
    };

    $scope.isLogged = function() {
      return GithubClient.isLogged();
    };

    $scope.showPost = function(post) {
      GithubClient.fetchPostContent(post, $scope);
    };

    $scope.savePost = function(post) {
      $rootScope.oauthDataConnection.put('/repos/movimento-sem-terra/site-novo/contents/_drafts/' + post.name, {
        data: '{"message": "comitando do cms!!!","sha": "'+post.sha+'","content": "'+
        btoa(document.getElementById("first-draft").value)+'"}'
      }).done(function(data) {
        console.log("Commit done", data);
      }).fail(function(data) {
        console.log('Exception saving post => ', data);
      });
    };
  }]);
