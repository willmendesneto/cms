'use strict';

angular.
 module('cms.services', [])
 .service('GithubClient', ['$rootScope', function($rootScope) {
    this.isLogged = function() {
      return $rootScope.oauthDataConnection;
    };

    this.requestReadmeContent = function() {
      $rootScope.oauthDataConnection.get('/repos/movimento-sem-terra/site-novo/readme').done(function(data) {
        document.getElementById('editor').value = atob(data.content);
      });
    };

    this.requestPosts = function() {
      var draftsTitles = "";
      $rootScope.oauthDataConnection.get('/repos/movimento-sem-terra/site-novo/contents/_drafts').done(function(data) {
        for(var i in data) {
          draftsTitles += data[i].name + "\n";
        }
        document.getElementById('drafts-textarea').value = draftsTitles;

        $rootScope.oauthDataConnection.get(data[0].git_url).done(function(data) {
          document.getElementById('first-draft').value = atob(data.content);
        });
      });       
    };

    /*
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
    */

 }]);