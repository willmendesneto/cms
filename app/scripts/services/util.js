'use strict';

angular.module('cmsApp')
  .factory('DateUtil', function () {
    return {
      getTime: function(){
          return new Date();
        },
    };
  });
