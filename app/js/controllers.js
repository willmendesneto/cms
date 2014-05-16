'use strict';

angular.module('cms.controllers', [])
  .controller('MyCtrl1', ['$scope', function($scope) {

  }])
  .controller('MyCtrl2', ['$scope', function($scope) {
  
  }])
  .controller('LoginCtrl', ['$scope', '$rootScope', 'OAuth', function($scope, $rootScope, OAuth) {
    $scope.login = function() {
      OAuth.popup('github');
    };
  }]);
