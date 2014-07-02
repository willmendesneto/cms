'use strict';

angular.module('cmsApp')
  .factory('Alert',['$rootScope', function($rootScope) {

    function getAlert(index) {
      $rootScope.alerts.splice(index, 1);
    }

    function closeAlert(alert) {
      getAlert($rootScope.alerts.indexOf(alert));
    }

    $rootScope.alerts = [];

    var alertService = {
      add: function(type, msg, details) {
        return $rootScope.alerts.push({
          type: type,
          msg: msg,
          details: details,
          detail: function(){
            window.alert(details);
          },
          close: function() {
            return closeAlert(this);
          }
        });
      }
    };
    return alertService;
  }]);
