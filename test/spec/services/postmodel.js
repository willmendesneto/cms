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
});
