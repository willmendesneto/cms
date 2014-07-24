'use strict';

angular.module('cmsApp')
  .factory('DateUtil', function ($filter) {

    function truncate(n) {
      return Math[n > 0 ? 'floor' : 'ceil'](n);
    }

    var DateUtil = {
      //TODO: this function should be removed. it has no meaning.
      getTime: function(){
        return new Date();
      },

      getDate: function(date){
        date = date || new Date();
        return {
          toMilliseconds: function(){
            return date.getTime();
          }
        };
      },

      applyFormat: function(format, date){
        date = date || new Date();

        return $filter('date')(date, format);
      },

      toJavaScriptTimeStamp: function(valueInTimeStamp) {
        return valueInTimeStamp * 1000;
      },

      toRubyTimeStamp: function(valueInTimeStamp) {
        return truncate(valueInTimeStamp / 1000);
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

    return DateUtil;

  });
