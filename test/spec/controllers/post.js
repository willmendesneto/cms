'use strict';

describe('Controller: PostCtrl', function () {

  // load the controller's module
  beforeEach(module('cmsApp'));

  var PostCtrl,
    scope,
    Post,
    GitRepository,
    PostBuilder = {},
    githubMock = {
    get: jasmine.createSpy().and.callFake(function () {
      return {
        done: jasmine.createSpy()
      };
    })
  };

  beforeEach(inject(function ($rootScope, $controller, _Post_, _GitRepository_) {
    scope = $rootScope.$new();
    Post = _Post_;
    GitRepository = _GitRepository_;
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
        'files:\n' +
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

  describe('save/publish a post', function() {

    var postForm = {
      $valid: true,
      $submitted: false
    };

    it('should save a post in draft', function() {
      scope.post = PostBuilder.buildAndLoadJekyllData();
      spyOn(scope, 'save');
      var url = GitRepository.getDraftsRepositoryAddress(scope.prepareNameFile(scope.post));
      scope.draft(scope.post);
      expect(scope.save).toHaveBeenCalledWith(scope.post, url);
    });

    it('should publish a post', function() {
      scope.post = PostBuilder.buildAndLoadJekyllData();
      spyOn(scope, 'save');
      var url = GitRepository.getPublishedRepositoryAddress(scope.prepareNameFile(scope.post));
      scope.updatePost(scope.post, postForm);
      expect(scope.save).toHaveBeenCalledWith(scope.post, url);
      expect(postForm.$submitted).toBe(true);
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
      spyOn(DateUtil,'getTime').and.returnValue(new Date(2001,8,9,12,0));
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

      expect(fileName).toMatch(/2001-09-09/);
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
