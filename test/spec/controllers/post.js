'use strict';

describe('Controller: PostCtrl', function () {

  beforeEach(module('cmsApp'));

  var PostCtrl, scope, PostModel, GitRepository,

  githubMock = {
    get: jasmine.createSpy().and.callFake(function () {
      return {
        done: jasmine.createSpy()
      };
    }),
    put: jasmine.createSpy().and.callFake(function () {
      return {
        done: jasmine.createSpy()
      };
    })
  };

  beforeEach(inject(function ($rootScope, $controller, _PostModel_, _GitRepository_, $routeParams) {
    scope = $rootScope.$new();

    PostModel = _PostModel_;
    GitRepository = _GitRepository_;
    $routeParams.fileName = 'test post';
    $rootScope.posts = [];
    $rootScope.github = githubMock;

    PostCtrl = $controller('PostCtrl', {
      $scope: scope
    });

    scope.post = PostModel;

    var mockResult = {
      success: function(onsuccess){
        onsuccess({
          status: 200,
          responseJSON: {
            message: '',
          }
        });
        return this;
      },
      error: function(onerror){
        onerror({
          status: 200,
          responseJSON: {
            message: '',
          }
        });
        return this;
      }
    };

    spyOn(GitRepository.post,'save').and.returnValue(mockResult);
    spyOn(GitRepository.post,'get').and.returnValue(mockResult);

  }));

  describe('#updatePost', function(){
    var postForm = {
      $valid: true,
      $submitted: false
    };

    it('should save a post', function() {
      spyOn(scope, 'save');

      scope.updatePost(scope.post, postForm);

      expect(scope.save).toHaveBeenCalledWith(scope.post);
      expect(postForm.$submitted).toBe(true);
    });

  });

  describe('PostViewOptionsService method:', function() {

    var PostViewOptionsService, testArray;
    beforeEach(inject(function ($controller, _PostViewOptions_) {
      PostViewOptionsService = _PostViewOptions_;

      testArray = ['test'];
      spyOn(PostViewOptionsService,'getMenuTagOptions').and.returnValue(testArray);
      spyOn(PostViewOptionsService,'getLabelOptions').and.returnValue(testArray);
      spyOn(PostViewOptionsService,'getSectionOptions').and.returnValue(testArray);

      PostCtrl = $controller('PostCtrl', {
        $scope: scope
      });
    }));

    it('#getMenuTagOptions should be called',function(){
      expect(scope.menuTagOptions).toEqual(testArray);
    });

    it('#getLabelOptions should be called',function(){
      expect(scope.labelOptions).toEqual(testArray);
    });

    it('#getSectionOptions should be called',function(){
      expect(scope.sectionOptions).toEqual(testArray);
    });
  });

});
