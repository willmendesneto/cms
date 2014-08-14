'use strict';


describe('Service: New Post Model', function(){
  //  load the service's module
  beforeEach(module('cmsApp'));

  var PostModel;
  beforeEach(inject(function (_PostModel_) {
    PostModel = _PostModel_;
  }));


  describe('should create a new post', function(){
    it('with default data', function() {
      var post = PostModel.create();

      expect(post.body).toBe('');
    });

    it('with metadata from file', function() {
      var data = '---\ntitle: Rodrigo\n---Texto Qualquer';
      var post = PostModel.create();

      var metadata = post.fromMarkDown(data).metadata;

      expect(post.body).toBe('Texto Qualquer');
      expect(metadata.title).toBe('Rodrigo');
    });
  });
  describe('should change to markdown', function(){
    it('with metadata from file', function() {
      var data = '---\ntitle: Rodrigo\n---Texto Qualquer';
      var post = PostModel.create();

      post.fromMarkDown(data);

      var markdown = post.toMarkDown();

      expect(markdown).toMatch(/title: Rodrigo/);
    });
  });

  describe('should get video id', function(){
    it('is get a id from url to youtube video', function() {
      var post = PostModel.create();
/* jshint camelcase: false */
      post.metadata.youtube_link = 'https://www.youtube.com/watch?v=VHxuvaIyiXo';

      var markdown = post.toMarkDown();

      expect(markdown).toMatch(/video: VHxuvaIyiXo/);

    });
  });

  describe('should work with time', function(){
    var DateUtil;
    beforeEach(inject(function (_DateUtil_) {
      DateUtil = _DateUtil_;
    }));

    it('is a new post should have the actual datetime in milleseconds', function() {
      var post = PostModel.create();

      expect(post.createdTime).not.toBeNull();
    });

    it('is a post from markdown should have the timestamp', function() {
      var data = '---\ndate: "2014-08-13T13:30:55-03:00"\n---Texto Qualquer';
      var post = PostModel.create().fromMarkDown(data);

      expect(post.createdTime).toBe(1407947455 * 1000);
    });

    it('is a post to markdown should have the date', function() {
      var post = PostModel.create();
      var creationDate = new Date(2014,7,13,13,30,55);
      post.createdTime = DateUtil.getDate(creationDate).toMilliseconds();
      var markdown = post.toMarkDown();


      expect(markdown).toMatch(/date: "2014-08-13T13:30:55-03:00"/);
    });

    it('is a post to markdown if it is have a date i can change the date', function() {
      var post = PostModel.create();
      var creationDate = new Date(2012,7,13,13,30,55);
      post.createdTime = DateUtil.getDate(creationDate).toMilliseconds();
      post.metadata.date = '2014-08-13T13:30:55-03:00';
      var markdown = post.toMarkDown();

      expect(markdown).not.toMatch(/date: \"2014-08-13T13:30:55-03:00\"/);
    });

  });
});
