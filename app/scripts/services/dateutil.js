'use strict';

angular.module('cmsApp')
  .factory('DateUtil', function () {
    return {
      getTime: function(){
          return new Date();
        },

      getTimestamp: function(date, time) {
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        return new Date(year, month, day, hours, minutes).getTime();
      }
    };

  });
