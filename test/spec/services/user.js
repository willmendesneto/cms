'use strict';

describe('Service: User', function () {

  // load the service's module
  beforeEach(module('cmsApp'));

  // instantiate service
  var User, rootScope;
  var user = { name: 'Rodrigo' };
  var teams = [{id: 12}];

  beforeEach(module(function ($provide) {
    var gitRepositoryMock = {
      getUser: function (options) {
        options.success(user);
      },
      getTeams: function(options){
        options.success(teams);
      }
    };

    $provide.value('GitRepository', gitRepositoryMock);
  }));

  beforeEach(inject(function ($rootScope,_User_) {
    User = _User_;
    rootScope = $rootScope;
  }));

  it('should return the user name', function () {
    var defered = User.userInfo();
    var result = '';

    defered.then(function(userName){
      result = userName;
    });

    rootScope.$apply();
    expect(result).toBe(user.name);
  });

  it('should return the team', function () {
    var defered = User.authenticate();
    var result = '';

    defered.then(function(jornalist){
      result = jornalist;
    });

    rootScope.$apply();
    expect(result.id).toBe(teams.id);
  });
});
