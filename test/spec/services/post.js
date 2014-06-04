/* globals jsyaml, _ */
'use strict';

var data = '---\n' +
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
    'post content';

describe('Service: Post', function () {
  var dummyMeta = {foo: 'bar'};

  // load the service's module
  beforeEach(module('cmsApp'));

  // instantiate service
  var Post;
  beforeEach(inject(function (_Post_) {
    Post = _Post_;
    spyOn(jsyaml, 'load').and.returnValue(dummyMeta);
    spyOn(jsyaml, 'dump').and.returnValue('metadata');
  }));

  it('should load content from jekyll data', function() {
    var post = Post.makePost();

    post.loadContentFromJekyllData(data);

    expect(post.content.text).toBe('post content');
    expect(post.content.meta).toBe(dummyMeta);
  });

  it('should convert content to jekyll data', function () {
    var post = Post.makePost();

    post.loadContentFromJekyllData(data);
    var result = post.convertContentToJekyllData();

    expect(jsyaml.dump).toHaveBeenCalledWith(post.content.meta);
    expect(result).toBe('---\nmetadata\n---\npost content');
  });

  it('should return empty jekyll data when post has no content', function () {
    var post = Post.makePost();
    var result = post.convertContentToJekyllData();

    expect(result).toBe('');
  });

  it('should generate commit data from a post', function () {
    var post = Post.makePost({sha: 'aaaaa'});
    post.loadContentFromJekyllData(data);

    var commitData = post.commitData();

    expect(commitData.sha).toBe('aaaaa');
    expect(commitData.content).toBe(btoa('---\nmetadata\n---\npost content'));
    expect(commitData.message).toBe('commit from cms');
  });

  describe('setting menu items', function () {
    it('should add a new menu: tag to posts without any', function () {
      var post = Post.makePost();
      post.loadContentFromJekyllData(data);
      post.content.meta.tags = [];

      post.setMenuItem('agronegocios');

      expect(post.content.meta.tags).toContain('menu:agronegocios');
    });

    it('should replace menu: tag in posts that already have one', function () {
      var post = Post.makePost();
      post.loadContentFromJekyllData(data);
      post.content.meta.tags = ['menu:agronegocios'];

      post.setMenuItem('meio ambiente');

      expect(post.content.meta.tags).not.toContain('menu:agronegocios');
      expect(post.content.meta.tags).toContain('menu:meio ambiente');
    });

    it('should remove menu: tag when setting it to undefined', function () {
      var post = Post.makePost();
      post.loadContentFromJekyllData(data);
      post.content.meta.tags = ['menu:agronegocios'];

      post.setMenuItem(undefined);

      _.each(post.content.meta.tags, function(tag) {
        expect(tag).not.toMatch(/^menu:*/);
      });
    });

    it('should not throw error when trying to set a menu: tag to posts with no content', function () {
      var post = Post.makePost();

      expect(function() {
        post.setMenuItem('agronegocios');
      }).not.toThrow();
    });
  });

  describe('setting the section', function() {
    it('should set the section', function() {
      var post = Post.makePost();
      post.loadContentFromJekyllData(data);

      post.setSection({label: 'Destaques', value: 'featured-news'});

      expect(post.content.meta.section).toBe('featured-news');
    });

    it('should change the section', function() {
      var post = Post.makePost();
      post.loadContentFromJekyllData(data);

      post.content.meta.section = 'featured-news';

      post.setSection({label: 'Carrosel', value: 'carousel'});

      expect(post.content.meta.section).toBe('carousel');
    });

    it('should clear section when passing undefined as section', function() {
      var post = Post.makePost();
      post.loadContentFromJekyllData(data);

      post.content.meta.section = 'carousel';

      post.setSection(undefined);

      expect(post.content.meta.section).toBe('');
    });

    it('should not throw error when there is no content', function() {
      var post = Post.makePost();

      expect(function() {
        post.setSection({label: 'Destaques', value: 'featured-news'});
      }).not.toThrow();
    });
  });

  describe('manage tags', function () {
    it('should add a new tag', function () {
      var post = Post.makePost();
      post.loadContentFromJekyllData(data);
      post.content.meta.tags = [];

      post.addNewTag('newTag');
      expect(post.content.meta.tags).toContain('personalizada:newTag');
    });
  });

  describe('setting the label', function() {
    it('should set the label', function() {
      var post = Post.makePost();
      post.loadContentFromJekyllData(data);

      post.setLabel({label: 'Artigo', value: 'article'});

      expect(post.content.meta.label).toBe('article');
    });

    it('should change the label', function() {
      var post = Post.makePost();
      post.loadContentFromJekyllData(data);

      post.content.meta.label = 'article';

      post.setLabel({label: 'Artigo', value: 'article'});

      expect(post.content.meta.label).toBe('article');
    });

    it('should clear label when passing undefined as label', function() {
      var post = Post.makePost();
      post.loadContentFromJekyllData(data);

      post.content.meta.label = 'article';

      post.setLabel(undefined);

      expect(post.content.meta.label).toBe('');
    });

    it('should not throw error when there is no content', function() {
      var post = Post.makePost();

      expect(function() {
        post.setLabel({label: 'Artigo', value: 'article'});
      }).not.toThrow();
    });
  });
});
