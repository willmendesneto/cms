'use strict';

var app = angular.module('cmsApp', ['ngRoute', 'firebase']);

app.constant('FIREBASE_URL', 'https://mst-cms.firebaseio.com');
app.constant('IMAGE_SERVICE_URL', 'http://mst-image-service.herokuapp.com/upload');
app.config(function ($routeProvider) {
  $routeProvider
    .when('/auth', {
      templateUrl: 'views/auth.html',
      controller: 'AuthCtrl'
    })
    .when('/posts', {
      templateUrl: 'views/posts.html',
      controller: 'PostsCtrl'
    })
    .when('/posts/:sha', {
      templateUrl: 'views/post.html',
      controller: 'PostCtrl'
    })
    .otherwise({
      redirectTo: '/auth'
    });
});

app.config(function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});


