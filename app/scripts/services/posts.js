'use strict';

angular.module('cmsApp')
  .factory('Posts', function ($rootScope) {

  var Posts = $rootScope.getDrafts();

  return Posts;
});
