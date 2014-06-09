'use strict';

app.controller('PostsCtrl', function ($scope, $rootScope, _, Post) {
    $rootScope.github.get('/repos/movimento-sem-terra/site-novo/contents/_drafts').done(function(data) {
      $rootScope.posts = _.map(data, Post.makePost);
      $scope.$apply();
    });
  });
