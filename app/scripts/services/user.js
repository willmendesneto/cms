'use strict';

angular.module('cmsApp')
  .service('User', function User($q, GitRepository, ENV) {
    var user = {
      userInfo: function() {
        var deferred = $q.defer();
        GitRepository.getUser({
          success: function(data){
            deferred.resolve(data);
          }
        });
        return deferred.promise;
      },

      authenticate: function() {
        var deferred = $q.defer();

        GitRepository.getTeams({
          success: function(data) {
            var teamJornalist = data.filter(function(element){
              return element.id === ENV.repo.jornalist;
            });

            var team = { id: undefined };
            team = angular.extend(team, teamJornalist[0]);

            deferred.resolve(team);
          }
        });
        return deferred.promise;
      }
    };

    return user;
  });
