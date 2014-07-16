'use strict';

angular.module('cmsApp')
  .factory('GitRepositoryNew',['$rootScope', '$location', 'ENV', function($rootScope, $location, ENV){

  function githubGet(filename) {
    var url = getRepositoryAddress(filename);
    return $rootScope.github.get(url ,{
      cache: false
    });
  }

  function getRepositoryAddress (filename) {
    return '/repos/'+ ENV.repository + 'contents/_posts' + filename;
  }

  var GitRepository = {

    getUser: function() {
      return $rootScope.github.get('user');
    },

    getTeams: function(){
      return $rootScope.github.get('user/teams');
    },

    save: function(filename, data){
      var url = getRepositoryAddress('/'+filename);
      return $rootScope.github.put(url, {
        data: data,
        cache: false
      });
    },

    getPosts: function() {
      return githubGet('');
    },

    getPost: function(filename) {
      return githubGet('/'+filename);
    }
  };

  return GitRepository;
}]);
