/*'use strict';
describe('Controller: PostsCtrl', function () {

  // load the controller's module
  beforeEach(module('cmsApp'));

  var PostsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    scope.posts = [
      {
        'name': '2012-07-25-3-mitos-sobre-a-agroecologia.md',
        'path': '_drafts/2012-07-25-3-mitos-sobre-a-agroecologia.md',
        'sha': '2a2a2066e2b94c910856608aa17a7e145620c05a',
        'size': 593,
        'url': 'https://api.github.com/repos/movimento-sem-terra/site-novo/contents/_drafts/2012-07-25-3-mitos-sobre-a-agroecologia.md?ref=master',
        'html_url': 'https://github.com/movimento-sem-terra/site-novo/blob/master/_drafts/2012-07-25-3-mitos-sobre-a-agroecologia.md',
        'git_url': 'https://api.github.com/repos/movimento-sem-terra/site-novo/git/blobs/2a2a2066e2b94c910856608aa17a7e145620c05a',
        'type': 'file',
        '_links': {
          'self': 'https://api.github.com/repos/movimento-sem-terra/site-novo/contents/_drafts/2012-07-25-3-mitos-sobre-a-agroecologia.md?ref=master',
          'git': 'https://api.github.com/repos/movimento-sem-terra/site-novo/git/blobs/2a2a2066e2b94c910856608aa17a7e145620c05a',
          'html': 'https://github.com/movimento-sem-terra/site-novo/blob/master/_drafts/2012-07-25-3-mitos-sobre-a-agroecologia.md'
        }
      }
    ];
    PostsCtrl = $controller('PostsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.posts.length).toBe(1);
  });
});
*/
