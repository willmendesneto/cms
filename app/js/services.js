'use strict';

angular.
 module('cms.services', [])
 .service('GithubClient', ['$rootScope', function($rootScope) {
    this.isLogged = function() {
      return $rootScope.oauthDataConnection;
    };

    this.fetchPostContent = function(post, scope) {
      $rootScope.oauthDataConnection.get(post.git_url)
      .done(function(data) {
        post.content = atob(data.content);
        scope.currentPost = post;
        scope.$apply();
      });
    };

    this.requestPosts = function(scope) {
      var draftsTitles = "";
      var titles = [];
      $rootScope.oauthDataConnection.get('/repos/movimento-sem-terra/site-novo/contents/_drafts')
        .done(function(data) {
          for(var i in data) {
            draftsTitles += data[i].name + "\n";
            titles.push(data[i].name);
          }
          scope.titles = titles;
          scope.draftsTitles = draftsTitles;
          scope.$apply();
          $rootScope.oauthDataConnection.get(data[0].git_url)
            .done(function(data) {
              scope.firstDraft = atob(data.content);
              scope.$apply();
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