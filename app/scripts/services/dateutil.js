'use strict';

angular.module('cmsApp')
  .factory('DateUtil', function () {
    return {
      //TODO: this function should be removed. it has no meaning.
      getTime: function(){
          return new Date();
        },

      getTimestamp: function(date, time) {
        try {
          var year = date.getFullYear();
          var month = date.getMonth();
          var day = date.getDate();
          var hours = time.getHours();
          var minutes = time.getMinutes();
          var dateCreated = new Date(year, month, day, hours, minutes).getTime();
          return dateCreated/1000;
        } catch (err) {
          return 0;
        }
      }
    };

  });
