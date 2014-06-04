/*'use strict';

describe('Controller: AuthCtrl', function () {

  // load the controller's module
  beforeEach(module('cmsApp'));

  var AuthCtrl,
    scope,
    location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location) {
    scope = $rootScope.$new();
    location = $location;
    $rootScope.github = [
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
    AuthCtrl = $controller('AuthCtrl', {
      $scope: scope
    });
  }));

  it('should set the github list informations', function() {
    expect(scope.github.length > 0).toBe(true);
  });
});
*/
