/* globals alert */
'use strict';

angular.module('cmsApp')
  .controller('AuthCtrl', function ($scope, $rootScope, $location, oauth, $q, $timeout) {
    $scope.authenticate = function() {
      oauth.popup('github', function(err, res) {
        if(err) {
          return alert(err);
        }
        $rootScope.github = res;        
        var userInfo = function() {
          var deferred = $q.defer();
          res.get('user').success(function(data){            
            var userName = data.name;            
            deferred.resolve(userName);
          });
          return deferred.promise;
        };

        var authenticate = function() {
          var deferred = $q.defer();
          res.get('user/teams').success(function(data){            
            var isJournalist = false;

            for (var i=0; i<data.length; i++) {
              var team = data[i].name;
              
              if (team == 'Jornalistas') {              
                isJournalist = true;                
                break;             
              }
            }
            deferred.resolve(isJournalist);
          });
          return deferred.promise;
        };
        
        var userPromise = userInfo();
        userPromise.then(function(userName) {                              
          $rootScope.loggedUser = userName;
        });

        var authPromise = authenticate();
        authPromise.then(function(isJournalist) {
          if (isJournalist) {
            $location.path('/posts');
          } else {
            alert('Acesso negado!');
          }
        });
      });
    };
  });
