'use strict';

describe('Directive: ckEditor', function () {

  // load the directive's module
  beforeEach(module('cmsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    scope.post = {
      content: {
        text: 'This is a text'
      }
    };
    element = angular.element('<textarea ck-editor ng-model="post.content.text"></textarea>');
    element = $compile(element)(scope);
  }));

  describe('simple use on textarea element', function() {
    it('should be defined in DOM', function () {
      expect(element).toBeDefined();
    });
  });
});
