'use strict';

angular.module('cmsApp')
  .factory('GitRepository',['$rootScope', '$location', 'DateUtil', 'ENV', function($rootScope, $location, DateUtil, ENV){

  function getYearMonthFolder() {
    return DateUtil.applyFormat('yyyy/MM/');
  }

  function githubGet(year, month, filename) {
    var yearMonth = DateUtil.applyFormat('yyyy/MM', new Date(year,month));
    var url = getRepositoryAddress(yearMonth+filename);
    return $rootScope.github.get(url ,{
      cache: false
    });
  }

  function getRepositoryAddress (filename) {
    return '/repos/'+ ENV.repository + 'contents/_posts/' +filename;
  }

  var post = {
    find: function(year, month){
      return githubGet(year, month,'');
    },
    get: function(year, month, filename){
      return githubGet(year, month,'/'+filename);
    },
    save: function(filename, data){
      var yearMonthFolder = getYearMonthFolder();
      var url = getRepositoryAddress(yearMonthFolder+filename);
      return $rootScope.github.put(url, {
        data: data,
        cache: false
      });
    }
  };


  var GitRepository = {
    post: post,

    getUser: function() {
      return $rootScope.github.get('user');
    },

    getTeams: function(){
      return $rootScope.github.get('user/teams');
    },
  };

  return GitRepository;
}]);
