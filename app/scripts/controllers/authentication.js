'use strict';

angular.module('cmsApp')
  .controller('AuthenticationCtrl', function AuthenticationCtrl($scope, $rootScope, $location, oauth) {
    $scope.authenticate = function() {
      oauth.popup('github', function(err, res) {
        if(err){
          return window.alert(err);
        }
        $rootScope.github = res;
        $location.path('/posts');
        $scope.$apply();
      });
    };
  });
