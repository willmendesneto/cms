'use strict';

angular.module('cmsApp')
  .service('User', function User($q, GitRepository, ENV) {

    function getJournalistId(data){
      return data.filter(function(element){
        return element.id === ENV.repo.jornalist;
      })[0];
    }

    var user = {
      userInfo: function() {
        var deferred = $q.defer();
        GitRepository.getUser().then(function(data){
            deferred.resolve(data);
          });
        return deferred.promise;
      },

      authenticate: function() {
        var deferred = $q.defer();

        GitRepository.getTeams().then(function(data) {
          var journalistId = getJournalistId(data);
          var team = { id2: undefined };

          //TODO: replace angular extend with more easy to understand code
          team = angular.extend(team, journalistId);
          deferred.resolve(team);
        });

        return deferred.promise;
      }
    };

    return user;
  });
