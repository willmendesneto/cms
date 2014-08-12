'use strict';

describe('Service: GenerateFilename', function () {

  beforeEach(module('cmsApp'));

  var GenerateFilenameService;
  beforeEach(inject(function (_GenerateFilename_) {
    GenerateFilenameService = _GenerateFilename_;
  }));

  describe('#create', function(){

    it('should return post name if it exists', function() {
      var post = {name: 'test post'};

      var filename = GenerateFilenameService.create(post);

      expect(filename).toBe(post.name);
    });

    it('should generate the filename for a new post', function() {
      var post = {
        createdTime: 'Tue Jul 15 2014 14:13:34 GMT-0300 (BRT)',
        metadata: {
          title: 'test titulo de post'
        }
      };

      var filename = GenerateFilenameService.create(post);

      expect(filename).toBe('2014-07-15-test-titulo-de-post.md');
    });

    it('should remove special chars from title to generate the filename', function() {

      var post = {
        createdTime: 'Tue Jul 15 2014 14:13:34 GMT-0300 (BRT)',
        metadata: {
          title: '%#\'test titulo de post^'
        }
      };

      var filename = GenerateFilenameService.create(post);

      expect(filename).toBe('2014-07-15-test-titulo-de-post.md');
    });

    it('should remove space before number from title to generate the filename', function() {

      var post = {
        createdTime: 'Tue Jul 15 2014 14:13:34 GMT-0300 (BRT)',
        metadata: {
          title: 'Olá 2012, como vai 3 de voces'
        }
      };

      var filename = GenerateFilenameService.create(post);

      expect(filename).toBe('2014-07-15-ol-2012-como-vai-3-de-voces.md');
    });
  });
});
