describe('PostController', function() {
  var controller;
  var scope;
  var githubMock = {
    get: jasmine.createSpy().and.callFake(function () {
      return {
        done: jasmine.createSpy()
      };
    })
  };


  beforeEach(function () {
    module('cms');
  });

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();

    $rootScope.posts = [];
    $rootScope.github = githubMock;

    controller = $controller('PostController', {$scope: scope});
  }));


  it('should set the menu item of a post', function() {
    scope.post = PostBuilder.buildAndLoadJekyllData();
    spyOn(scope.post, 'setMenuItem');

    scope.$apply(function () {
      scope.menuTag = "agronegócios";
    });

    expect(scope.post.setMenuItem).toHaveBeenCalledWith("agronegócios");
  });

  it('should set the section of a post', function() {
    scope.post = PostBuilder.buildAndLoadJekyllData();
    spyOn(scope.post, 'setSection');

    scope.$apply(function () {
      scope.section = {label: "Destaques", value: "featured-news"};
    });

    expect(scope.post.setSection).toHaveBeenCalledWith(scope.section);
  });
});
