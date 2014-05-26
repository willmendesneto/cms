angular.module('cmsApp')
  .controller('PostsCtrl', function PostsCtrl($scope, $rootScope) {
    $rootScope.github.get('/repos/movimento-sem-terra/site-novo/contents/_drafts').done(function(data) {
      $rootScope.posts = _.map(data, makePost);
      $scope.$apply();
    });
  });
