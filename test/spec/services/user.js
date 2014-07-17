'use strict';

describe('Service: User', function () {


  beforeEach(module('cmsApp'));


  var UserService, rootScope, $q, GitRepositoryNewService, objectDefer;
  var user = { name: 'Rodrigo' };
  var teamId = 12;
  var teams = [ {id: teamId } ];


  beforeEach(module(function ($provide) {
    var enviromentMock = { repo: {jornalist: teamId } };

    $provide.constant('ENV', enviromentMock);
  }));

  beforeEach(inject(function ($rootScope,_User_, _$q_, _GitRepositoryNew_) {
    UserService = _User_;
    rootScope = $rootScope;

    $q = _$q_;
    objectDefer = $q.defer();

    GitRepositoryNewService = _GitRepositoryNew_;

    spyOn(GitRepositoryNewService, 'getUser').and.returnValue(objectDefer.promise);
    spyOn(GitRepositoryNewService, 'getTeams').and.returnValue(objectDefer.promise);
  }));


  it('should return the user name', function () {
    var deferedPromise = UserService.userInfo();
    var result;
    deferedPromise.then(function(data){
      result = data;
    });

    objectDefer.resolve(user);

    rootScope.$apply();
    expect(GitRepositoryNewService.getUser).toHaveBeenCalled();
    expect(result).toEqual(user);
  });

  it('should return the team', function () {
    var deferedPromise = UserService.authenticate();
    var result;

    deferedPromise.then(function(data){
      result = data;
    });

    objectDefer.resolve(teams);

    rootScope.$apply();
    expect(result.id).toBe(teamId);
  });
});
