'use strict';

describe('Controller: PostCtrl', function () {

  // load the controller's module
  beforeEach(module('cmsApp'));

  var PostCtrl,
    scope,
    Post,
    DRAFT_URL,
    PUBLISH_URL,
    PostBuilder = {},
    githubMock = {
    get: jasmine.createSpy().and.callFake(function () {
      return {
        done: jasmine.createSpy()
      };
    })
  };

  beforeEach(inject(function ($rootScope, $controller, _Post_, _DRAFT_URL_, _PUBLISH_URL_) {
    scope = $rootScope.$new();
    Post = _Post_;
    DRAFT_URL = _DRAFT_URL_;
    PUBLISH_URL = _PUBLISH_URL_;
    $rootScope.posts = [];
    $rootScope.github = githubMock;

    PostCtrl = $controller('PostCtrl', {
      $scope: scope
    });

    PostBuilder =  {
      jekyllData: '---\n' +
        'layout: post\n' +
        'title: \'Post Title\'\n' +
        'created: 1323977240\n' +
        'images: []\n' +
        'video:\n' +
        'tags:\n' +
        'section:\n' +
        'label:\n' +
        '- menu:menuitem\n' +
        '---\n' +
        'post content',
      build: function () {
        return Post.makePost();
      },
      buildAndLoadJekyllData: function () {
        var post = this.build();
        post.loadContentFromJekyllData(this.jekyllData);
        return post;
      }
    };

  }));


  it('should set the menu item of a post', function() {
    scope.post = PostBuilder.buildAndLoadJekyllData();
    spyOn(scope.post, 'setMenuItem');

    scope.$apply(function () {
      scope.menuTag = 'agronegócios';
    });

    expect(scope.post.setMenuItem).toHaveBeenCalledWith('agronegócios');
  });

  it('should set the section of a post', function() {
    scope.post = PostBuilder.buildAndLoadJekyllData();
    spyOn(scope.post, 'setSection');

    scope.$apply(function () {
      scope.section = {label: 'Destaques', value: 'featured-news'};
    });

    expect(scope.post.setSection).toHaveBeenCalledWith(scope.section);
  });

  it('should set the label of a post', function() {
    scope.post = PostBuilder.buildAndLoadJekyllData();
    spyOn(scope.post, 'setLabel');

    scope.$apply(function () {
      scope.label = {label: 'Artigo', value: 'article'};
    });

    expect(scope.post.setLabel).toHaveBeenCalledWith(scope.label);
  });

  describe('processTag', function(){

    it('should call addNewTag', function(){
      scope.post = PostBuilder.buildAndLoadJekyllData();
      spyOn(scope.post, 'addNewTag');
      scope.tag = 'newtag';
      scope.processTag();

      expect(scope.post.addNewTag).toHaveBeenCalledWith('newtag');
    });

    it('should add new tag', function(){
      scope.post = PostBuilder.buildAndLoadJekyllData();
      expect(scope.tagsPersonalizadas.length).toBe(0);
      scope.tag ='newtag';
      scope.processTag();
      expect(scope.tagsPersonalizadas.length).toBe(1);
    });

    it('should not add the same tag twice', function(){
      scope.post = PostBuilder.buildAndLoadJekyllData();
      scope.tagsPersonalizadas = ['newtag'];
      expect(scope.tagsPersonalizadas.length).toBe(1);
      scope.tag ='newtag';
      scope.processTag();
      expect(scope.tagsPersonalizadas.length).toBe(1);
    });
  });

  describe('removeTag', function(){

    it('should call deleteTag', function(){
      scope.post = PostBuilder.buildAndLoadJekyllData();
      spyOn(scope.post, 'deleteTag');
      scope.tagsPersonalizadas = ['newtag'];
      scope.removeTag(0);

      expect(scope.post.deleteTag).toHaveBeenCalledWith('newtag');
    });

    it('should delete tag', function(){
      scope.post = PostBuilder.buildAndLoadJekyllData();
      scope.tag ='newtag';
      scope.processTag();
      expect(scope.tagsPersonalizadas.length).toBe(1);
      scope.removeTag(0);
      expect(scope.tagsPersonalizadas.length).toBe(0);
    });
  });

  describe('save/publish a post ', function() {

    it('should save a post in draft', function() {
      scope.post = PostBuilder.buildAndLoadJekyllData();
      spyOn(scope, 'save');
      var url = DRAFT_URL + scope.post.name;
      scope.draft(scope.post);
      expect(scope.save).toHaveBeenCalledWith(scope.post, url);
    });

    it('should publish a post', function() {
      scope.post = PostBuilder.buildAndLoadJekyllData();
      spyOn(scope, 'save');
      var url = PUBLISH_URL + scope.post.name;
      scope.publish(scope.post);
      expect(scope.save).toHaveBeenCalledWith(scope.post, url);
    });
  });

});

