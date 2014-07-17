'use strict';

angular.module('cmsApp')
  .service('User', function User($q, GitRepositoryNew, ENV, _) {

    function getJournalistId(data){
      var  teamJournalist = _.find(data, function(element){
        return element.id === ENV.repo.jornalist;
      });
      return teamJournalist;
    }

    var user = {
      userInfo: function() {
        var deferred = $q.defer();
        GitRepositoryNew.getUser().then(function(data){
            deferred.resolve(data);
          });
        return deferred.promise;
      },

      authenticate: function() {
        var deferred = $q.defer();

        GitRepositoryNew.getTeams().then(function(data) {
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
