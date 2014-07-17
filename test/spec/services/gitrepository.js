'use strict';

describe('Service: GitRepository', function () {

  beforeEach(module('cmsApp'));

  var GitRepositoryService, rootScope, repositoryURL;
  beforeEach(inject(function (_GitRepository_, $rootScope) {
    GitRepositoryService = _GitRepository_;
    rootScope = $rootScope;
    rootScope.github = {
      get: function(value) {
        return value;
      },

      put: function(url, data) {
        return data;
      }
    };

    spyOn(rootScope.github, 'get');
    repositoryURL = 'mst-test-user/test/';
  }));

  it('#getUser should call github with user', function() {
    GitRepositoryService.getUser();

    expect(rootScope.github.get).toHaveBeenCalledWith('user');
  });

  it('#getTeams should call github with user/teams', function() {
    GitRepositoryService.getTeams();

    expect(rootScope.github.get).toHaveBeenCalledWith('user/teams');
  });

  it('#save should call github with url and data', function() {
    spyOn(rootScope.github, 'put');

    var filename = 'test post';
    var data = 'some random string';
    GitRepositoryService.save(filename, data);

    var url = '/repos/'+ repositoryURL +'contents/_posts/'+filename;
    var processedData = { data : 'some random string', cache : false };
    expect(rootScope.github.put).toHaveBeenCalledWith(url, processedData);
  });

  it('#getPosts should call github with git url and options', function() {
    GitRepositoryService.getPosts();

    var gitUrl = '/repos/'+ repositoryURL +'contents/_posts';
    var option = { cache : false };
    expect(rootScope.github.get).toHaveBeenCalledWith(gitUrl, option);
  });

  it('#getPost should call github with git url and filename', function() {
    var filename = '2014-16-04-the-name-of-the-file';
    GitRepositoryService.getPost(filename);

    var gitUrl = '/repos/'+ repositoryURL +'contents/_posts/'+filename;
    var option = { cache : false };
    expect(rootScope.github.get).toHaveBeenCalledWith(gitUrl, option);
  });

});
