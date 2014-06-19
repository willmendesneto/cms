'use strict';

angular.module('cmsApp')
  .factory('GitRepository',['$rootScope', '$location', 'ENV', function($rootScope, $location, ENV){
  var GitRepository = {

    getDrafts: function() {
      if(!$rootScope.github){
        console.log('Github not defined.');
        return;
      }
      return $rootScope.githubGet('contents/_drafts');
    },


    getPost: function(sha) {
      if(!$rootScope.github){
        console.log('Github not defined.');
        return;
      }
      return $rootScope.githubGet('git/blobs/'+sha);
    },

    githubGet: function(url) {
      return $rootScope.github.get($rootScope.getRepositoryAddress(url));
    },

    getRepositoryAddress: function(url) {
      return '/repos/'+ ENV.repository + url;
    },

    getDraftsRepositoryAddress: function(url) {
      return $rootScope.getRepositoryAddress('contents/_drafts/'+url);
    },

    getPublishedRepositoryAddress: function(url) {
      return $rootScope.getRepositoryAddress('contents/_posts/'+url);
    }

  };

  return GitRepository;
}]);
