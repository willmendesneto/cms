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

    $scope.requestReadmeContent = function() {
      GithubClient.requestReadmeContent();
    };

    $scope.requestPosts = function() {
      GithubClient.requestPosts(); 
    };

    $scope.savePost = function() {
      var post_name = data[0].name;
      $rootScope.oauthDataConnection.put('/repos/movimento-sem-terra/site-novo/contents/_drafts/' + post_name, {
        data: '{"message": "comitando do cms!!!","sha": "'+post.sha+'","content": "'+
        btoa(document.getElementById("first-draft").value)+'"}'
      }).done(function(data) {
        console.log("Commit done", data);
      }).fail(function(data) {
        console.log('Exception saving post => ', data);
      });
    }

  }]);
