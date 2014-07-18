'use strict';

describe('Controller: PostCtrl', function () {

  beforeEach(module('cmsApp'));

  var PostCtrl,scope,Post, GitRepository, SaveModalService, LoadModalService,

  githubMock = {
    get: jasmine.createSpy().and.callFake(function () {
      return {
        done: jasmine.createSpy()
      };
    })
  };

  beforeEach(inject(function ($rootScope, $controller, _Post_, _GitRepository_, _SaveModal_, $routeParams, _LoadModal_) {
    scope = $rootScope.$new();
    Post = _Post_;
    GitRepository = _GitRepository_;
    SaveModalService = _SaveModal_;
    LoadModalService = _LoadModal_;
    $routeParams.fileName = 'test post';
    $rootScope.posts = [];
    $rootScope.github = githubMock;

    PostCtrl = $controller('PostCtrl', {
      $scope: scope
    });

    scope.post = Post.makePost();
    scope.post.create();

  }));

  describe('#updatePost', function(){
    var postForm = {
      $valid: true,
      $submitted: false
    };
    it('should set the menu item of a post', function() {
      spyOn(scope.post, 'setMenuItem');

      scope.updatePost(scope.post, postForm);

      expect(scope.post.setMenuItem).toHaveBeenCalledWith(scope.menuTag);
    });

    it('should set the section of a post', function() {
      spyOn(scope.post, 'setSection');

      scope.updatePost(scope.post, postForm);

      expect(scope.post.setSection).toHaveBeenCalledWith(scope.section);
    });

    it('should set the label of a post', function() {
      spyOn(scope.post, 'setLabel');

      scope.updatePost(scope.post, postForm);

      expect(scope.post.setLabel).toHaveBeenCalledWith(scope.label);
    });

    it('should set cover image url', function() {
      spyOn(scope.post, 'setImagesHD');

      scope.updatePost(scope.post, postForm);

      expect(scope.post.setImagesHD).toHaveBeenCalledWith(scope.imagesHD);
    });

    it('should save a post', function() {
      spyOn(scope, 'save');

      scope.updatePost(scope.post, postForm);

      expect(scope.save).toHaveBeenCalledWith(scope.post);
      expect(postForm.$submitted).toBe(true);
    });

  });

  describe('#save', function(){
    it('calls save modal service', function(){
      spyOn(SaveModalService, 'show');

      scope.save(scope.post);

      expect(SaveModalService.show).toHaveBeenCalled();
    });
  });

  describe('#init', function(){
    it('calls load modal service when editing a post', function(){
      spyOn(LoadModalService, 'show');

      scope.init();

      expect(LoadModalService.show).toHaveBeenCalled();
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
