/* globals alert */
'use strict';

angular.module('cmsApp')
  .controller('AuthCtrl', function ($scope, $rootScope, $location, oauth, User, ENV) {
    $scope.authenticate = function() {
      oauth.popup('github', function(err, res) {
        if(err) {
          return alert(err);
        }
        $rootScope.github = res;
        
        var userPromise = User.userInfo();
        userPromise.then(function(userName) {
          $rootScope.loggedUser = userName;
        });

        var authPromise = User.authenticate();
        authPromise.then(function(journalist) {
          if (!ENV.checkTeams || journalist.id) {
            $location.path('/posts');
          } else {
            alert('Acesso negado!');
          }
        });
      });
    };
  });
