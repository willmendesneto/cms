'use strict';

describe('Controller: PostCtrl', function () {

  // load the controller's module
  beforeEach(module('cmsApp'));

  var PostCtrl,
    scope,
    Post,
    PostBuilder = {},
    githubMock = {
    get: jasmine.createSpy().and.callFake(function () {
      return {
        done: jasmine.createSpy()
      };
    })
  };

  beforeEach(inject(function ($rootScope, $controller, _Post_) {
    scope = $rootScope.$new();
    Post = _Post_;
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

  describe('save/publish a post', function() {

    it('should save a post in draft', function() {
      scope.post = PostBuilder.buildAndLoadJekyllData();
      spyOn(scope, 'save');
      var url = scope.getDraftsRepositoryAddress(scope.prepareNameFile(scope.post));
      scope.draft(scope.post);
      expect(scope.save).toHaveBeenCalledWith(scope.post, url);
    });

    it('should publish a post', function() {
      scope.post = PostBuilder.buildAndLoadJekyllData();
      spyOn(scope, 'save');
      var url = scope.getPublishedRepositoryAddress(scope.prepareNameFile(scope.post));
      scope.publish(scope.post);
      expect(scope.save).toHaveBeenCalledWith(scope.post, url);
    });
  });


  describe('post status', function(){
    /*jshint camelcase: false */
    it('should be RASCUNHO when post is draft', function(){
      scope.post = PostBuilder.buildAndLoadJekyllData();
      scope.post.html_url = 'https://laskjdfl;sjdfl;ksja;lkfjsa/_drafts/l;sadjfl;sakjdflj';
      expect(scope.postStatus()).toBe('RASCUNHO');
    });

    it('should be PUBLICADO when post is published', function(){
      scope.post = PostBuilder.buildAndLoadJekyllData();
      scope.post.html_url = 'https://laskjdfl;sjdfl;ksja;lkfjsa/_posts/l;sadjfl;sakjdflj';
      expect(scope.postStatus()).toBe('PUBLICADO');
    });

    it('should be NOVO when post url is undefined', function(){
      scope.post = PostBuilder.buildAndLoadJekyllData();
      scope.post.html_url = undefined;
      expect(scope.postStatus()).toBe('NOVO');
    });

    it('should be empty when post is not published and not draft', function(){
      scope.post = PostBuilder.buildAndLoadJekyllData();
      scope.post.html_url = 'https://laskjdfl;sjdfl;ksja;lkfjsa/_xxxx/l;sadjfl;sakjdflj';
      expect(scope.postStatus()).toBe('');
    });
  });

  describe('should save a new post', function() {

    beforeEach(inject(function (DateUtil) {
      spyOn(DateUtil,'getTime').and.returnValue(new Date(2001,8,29,12,0));
    }));

    it('add year, month and day in file name', function() {

      var post = {
        content: {
          meta: {
            title: 'Olha lá o avião'
          }
        }
      };
      var fileName = scope.prepareNameFile(post);

      expect(fileName).toMatch(/2001-09-29/);
    });

    it('add title post to be file name', function() {
      var post = {
        content: {
          meta: {
            title: 'Olha lá o avião'
          }
        }
      };
      var fileName = scope.prepareNameFile(post);

      expect(fileName).toMatch(/olha-l-o-avio/);
    });

    it('should return the same file name when i have one', function() {
      var post = {
        name: '2014-10-10-algo-aqui',
        content: {
          meta: {
            title: 'Olha lá o avião'
          }
        }
      };
      var fileName = scope.prepareNameFile(post);

      expect(fileName).toMatch('2014-10-10-algo-aqui');
    });
  });
});
