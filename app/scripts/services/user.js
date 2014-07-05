'use strict';

angular.module('cmsApp')
  .service('User', function User($q, GitRepository, ENV) {
    var user = {
      userInfo: function() {
        var deferred = $q.defer();
        GitRepository.getUser({
          success: function(data){
            deferred.resolve(data.name);
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

            deferred.resolve(teamJornalist);
          }
        });
        return deferred.promise;
      }
    };

    return user;
  });
