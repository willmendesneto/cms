'use strict';

angular.module('cmsApp')
  .factory('DateUtil', function ($filter) {

    function truncate(n) {
      return Math[n > 0 ? 'floor' : 'ceil'](n);
    }

    function pad(num) {
      var norm = Math.abs(Math.floor(num));
      return (norm < 10 ? '0' : '') + norm;
    }

    function toISO8601(local) {
      var tzo = -local.getTimezoneOffset();
      var sign = tzo >= 0 ? '+' : '-';
      return local.getFullYear() +
        '-' + pad(local.getMonth()+1) +
        '-' + pad(local.getDate()) +
        'T' + pad(local.getHours()) +
        ':' + pad(local.getMinutes()) +
        ':' + pad(local.getSeconds()) +
        sign + pad(tzo / 60) +
        ':' + pad(tzo % 60);
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
      fromMilliseconds: function(milliseconds){
        return {
          toISO8601: function(){
            return toISO8601(new Date(milliseconds));
          }
        };
      },
      fromISO8601: function(dateISO){
        return {
          toMilliseconds: function(){
            return new Date(dateISO).getTime();
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
