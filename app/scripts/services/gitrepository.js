'use strict';

angular.module('cmsApp')
  .factory('GitRepository',['$rootScope', '$location', 'ENV', function($rootScope, $location, ENV){

  function githubGet(url) {
    return $rootScope.github.get(getRepositoryAddress(url),{
      cache: false
    });
  }

  function getRepositoryAddress (url) {
    return '/repos/'+ ENV.repository + url;
  }

  function getFrom(url) {
    var retorno;
    var draftExp = new RegExp('\/_drafts\/');
    var postsExp = new RegExp('\/_posts\/');

    if(draftExp.exec(url)){
      retorno = '_drafts';
    }
    else if(postsExp.exec(url)){
      retorno = '_posts';
    }

    return retorno;
  }

  var GitRepository = {

    getDrafts: function() {
      if(!$rootScope.github){
        console.log('Github not defined.');
        return;
      }
      return githubGet('contents/_drafts');
    },

    getPosts: function() {
      if(!$rootScope.github){
        console.log('Github not defined.');
        return;
      }
      return githubGet('contents/_posts');
    },

    getPost: function(url, fileName) {
      if(!$rootScope.github){
        console.log('Github not defined.');
        return;
      }
      return githubGet('contents/'+getFrom(url)+'/'+fileName);
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
