'use strict';

angular.module('cmsApp')
  .factory('PostCollection',['$rootScope','DateUtil','ENV', function($rootScope, DateUtil, ENV) {

    function githubGet(year, month, filename) {
      var yearMonth = DateUtil.applyFormat('yyyy/MM', new Date(year,month));
      var url = getRepositoryAddress(yearMonth,filename);

      return $rootScope.github.get(url ,{
        cache: false
      });
    }

    function getRepositoryAddress(yearMonth,filename) {
      return ENV.repository.posts+yearMonth+filename;
    }

    var factory = {
      find: function(year, month){
        return githubGet(year, month,'');
      },
      get: function(year, month, filename){
        return githubGet(year, month,'/'+filename);
      },
      save: function(filename, data){
        var yearMonthFolder = DateUtil.applyFormat('yyyy/MM/');
        var url = getRepositoryAddress(yearMonthFolder,filename);

        return $rootScope.github.put(url, {
          data: data,
          cache: false
        });
      }
    };

    return factory;
  }]);
