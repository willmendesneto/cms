'use strict';

angular.module('cmsApp')
  .factory('GitRepository',['$rootScope', '$location', 'ENV', function($rootScope, $location, ENV){

  function githubGet(url) {
    return $rootScope.github.get(getRepositoryAddress(url));
  }

  function getRepositoryAddress (url) {
    return '/repos/'+ ENV.repository + url;
  }

  var GitRepository = {

    getDrafts: function() {
      if(!$rootScope.github){
        console.log('Github not defined.');
        return;
      }
      return githubGet('contents/_drafts');
    },


    getPost: function(sha) {
      if(!$rootScope.github){
        console.log('Github not defined.');
        return;
      }
      return githubGet('git/blobs/'+sha);
    },

    getDraftsRepositoryAddress: function(fileName) {
      return getRepositoryAddress('contents/_drafts/'+fileName);
    },

    getPublishedRepositoryAddress: function(fileName) {
      return getRepositoryAddress('contents/_posts/'+fileName);
    }

  };

  return GitRepository;
}]);
