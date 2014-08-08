'use strict';

describe('Service: GitRepository', function () {

  beforeEach(module('cmsApp'));

  var GitRepositoryService, rootScope, repositoryURL, DateUtil;

  beforeEach(module(function ($provide) {
    repositoryURL = 'mst-test-user/test/';
    var enviromentMock = { repository: repositoryURL };

    $provide.constant('ENV', enviromentMock);
  }));

  beforeEach(inject(function (_GitRepository_, $rootScope, _DateUtil_) {
    GitRepositoryService = _GitRepository_;
    rootScope = $rootScope;
    DateUtil = _DateUtil_;
    rootScope.github = {
      get: function(value) {
        return value;
      },

      put: function(url, data) {
        return data;
      }
    };

    spyOn(rootScope.github, 'get');
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
    GitRepositoryService.post.save(filename, data);

    var yearFolder = DateUtil.applyFormat('yyyy/MM/');
    var url = '/repos/'+ repositoryURL +'contents/_posts/'+yearFolder+filename;

    var processedData = { data : 'some random string', cache : false };
    expect(rootScope.github.put).toHaveBeenCalledWith(url, processedData);
  });

  it('#getPosts should call github with git url and options', function() {
    GitRepositoryService.post.find(2014,6);

    var gitUrl = '/repos/'+ repositoryURL +'contents/_posts/2014/07';
    var option = { cache : false };
    expect(rootScope.github.get).toHaveBeenCalledWith(gitUrl, option);
  });

  it('#getPost should call github with git url and filename', function() {
    var filename = '2014-16-04-the-name-of-the-file';
    GitRepositoryService.post.get(2014,3,filename);

    var gitUrl = '/repos/'+ repositoryURL +'contents/_posts/2014/04/'+filename;
    var option = { cache : false };
    expect(rootScope.github.get).toHaveBeenCalledWith(gitUrl, option);
  });

});
