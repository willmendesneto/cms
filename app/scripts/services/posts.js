'use strict';

angular.module('cmsApp')
  .factory('Posts', function ($rootScope) {

  var Posts = $rootScope.github.get('/repos/movimento-sem-terra/site-novo/contents/_drafts');

  return Posts;
});
