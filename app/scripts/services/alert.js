'use strict';

/**
 * @ngdoc service
 * @name cmsApp.Alertservice
 * @description
 * # Alertservice
 * Service in the cmsApp.
 */
angular.module('cmsApp')
  .factory('Alert',['$rootScope', function($rootScope) {
    var alertService;
    $rootScope.alerts = [];
    return alertService = {
      add: function(type, msg, details) {
        return $rootScope.alerts.push({
          type: type,
          msg: msg,
          details: details,
          detail: function(){
            window.alert(alertService.details);
          },
          close: function() {
            return alertService.closeAlert(this);
          }
        });
      },
      closeAlert: function(alert) {
        return this.closeAlertIdx($rootScope.alerts.indexOf(alert));
      },
      closeAlertIdx: function(index) {
        return $rootScope.alerts.splice(index, 1);
      },
      clear: function(){
        $rootScope.alerts = [];
      }
    }
  }]);
