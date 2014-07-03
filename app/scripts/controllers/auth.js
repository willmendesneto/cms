/* globals alert */
'use strict';

angular.module('cmsApp')
  .controller('AuthCtrl', function ($scope, $rootScope, $location, oauth, GithubClient) {
    $scope.authenticate = function() {
      oauth.popup('github', function(err, res) {
        if(err) {
          return alert(err);
        }
        $rootScope.github = res;
        var isJournalist = false;
        
        res.get('user/teams').success(function(data){
          for (var i=0; i<data.length; i++) {
            var team = data[i].name;
            if (team == 'Jornalistas') {
              isJournalist = true;
              break;             
            }
          }
        }).
        done(function(){
          if (isJournalist) {
            $scope.$apply();
            $location.path('/posts');
          }
        });        
      });
    };
  });
