'use strict';

angular.module('cmsApp')
  .factory('GitRepository',['$rootScope', 'PostCollection', function($rootScope, PostCollection){
  var GitRepository = {
    post: PostCollection,

    getUser: function() {
      return $rootScope.github.get('user');
    },

    getTeams: function(){
      return $rootScope.github.get('user/teams');
    },
  };

  return GitRepository;
}]);
