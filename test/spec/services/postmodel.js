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

  describe('should work with time', function(){
    var DateUtil;
    beforeEach(inject(function (_DateUtil_) {
      DateUtil = _DateUtil_;

      var mockDateUtil = {
        toMilliseconds: function() { return 1000; }
      };

      spyOn(DateUtil, 'getDate').and.returnValue(mockDateUtil);
    }));

    it('is a new post should have the actual datetime in milleseconds', function() {
      var post = PostModel.create();

      expect(post.createdTime).toBe(1000);
    });

    it('is a post from markdown should have the timestamp in millisenconds', function() {
      var data = '---\ncreated: 1404239760\n---Texto Qualquer';
      var post = PostModel.create().fromMarkDown(data);

      expect(post.createdTime).toBe(1404239760 * 1000);
    });

    it('is a post to markdown should have the timestamp without milliseconds', function() {
      var post = PostModel.create();
      post.createdTime = 5000;
      var markdown = post.toMarkDown();

      expect(markdown).toMatch(/created: 5/);
    });
  });
});
