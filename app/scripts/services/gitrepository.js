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
    opts : {
      progress: function(){},
      save: function(){},
      error: function(){}
    },

    getUser: function(options){
      options = angular.extend(this.opts, options);

      $rootScope.github.get('user')
      .success(function(data){
        options.success(data);
      });
    },

    getTeams: function(options){
      options = angular.extend(this.opts, options);

      $rootScope.github.get('user/teams')
      .success(function(data){
        options.success(data);
      });
    },

    save: function(url, options){
      options = angular.extend(this.opts, options);

      $rootScope.github.put(url, {
        data: options.data,
        cache: false,
      }).progress(function(){
        options.progress();
      }).success(function(){
        options.success();
      }).error(function(error, status){
        options.error(error, status);
      });
    },

    getDrafts: function() {
      return githubGet('contents/_drafts');
    },

    getPosts: function() {
      return githubGet('contents/_posts');
    },

    getPost: function(url, fileName, options) {
      options = angular.extend(this.opts, options);

      githubGet('contents/'+getFrom(url)+'/'+fileName)
      .success(function(data){
        options.success(data);
      })
      .error(function(error, status){
        options.error(error, status);
      });
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
