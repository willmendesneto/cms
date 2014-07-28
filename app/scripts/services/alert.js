'use strict';

angular.module('cmsApp')
  .factory('Alert',['$alert', function($alert) {
    var alertService = {
      showError: function(title, content){
        $alert({title: title,
               content: content,
               type: 'danger',
               show: true,
               dissmissable: false,
               container: '#alerts-container'});
      },
      showInfo: function(title, content){
        $alert({title: title,
               content: content,
               type: 'info',
               show: true,
               duration: 5,
               dissmissable: true,
               container: '#alerts-container'});
      }
    };
    return alertService;
  }]);
