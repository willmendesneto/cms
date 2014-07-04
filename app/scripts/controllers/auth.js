/* globals alert */
'use strict';

angular.module('cmsApp')
  .controller('AuthCtrl', function ($scope, $rootScope, $location, oauth, GithubClient, $q) {
    $scope.authenticate = function() {
      oauth.popup('github', function(err, res) {
        if(err) {
          return alert(err);
        }
        $rootScope.github = res;        
        
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
        
        var promise = authenticate();
        promise.then(function(isJournalist) {
          if (isJournalist) {
            $scope.$apply();
            $location.path('/posts');
          } else {
            alert('Acesso negado!');
          }
        });                
      });
    };
  });
