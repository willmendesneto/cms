'use strict';

describe('Service: GenerateFilename', function () {

  beforeEach(module('cmsApp'));

  var GenerateFilenameService, DateUtilService;
  beforeEach(inject(function (_GenerateFilename_, _DateUtil_) {
    GenerateFilenameService = _GenerateFilename_;
    DateUtilService = _DateUtil_;
  }));

  describe('#create', function(){

    it('should return post name if it exists', function() {
      var post = {name: 'test post'};

      var filename = GenerateFilenameService.create(post);
      
      expect(filename).toBe(post.name);
    });

    it('should generate the filename for a new post', function() {

      var post = {content: { meta: {title: 'test titulo de post'}}};
      spyOn(DateUtilService, 'getTime').and.returnValue(new Date('Tue Jul 15 2014 14:13:34 GMT-0300 (BRT)'));

      var filename = GenerateFilenameService.create(post);

      expect(filename).toBe('2014-07-15-test-titulo-de-post.md');
    });

    it('should remove special chars from title to generate the filename', function() {

      var post = {content: { meta: {title: '%#\'test titulo de post^'}}};
      spyOn(DateUtilService, 'getTime').and.returnValue(new Date('Tue Jul 15 2014 14:13:34 GMT-0300 (BRT)'));

      var filename = GenerateFilenameService.create(post);

      expect(filename).toBe('2014-07-15-test-titulo-de-post.md');
    });

  });

});
