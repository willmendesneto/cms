'use strict';

var app = angular.module('cmsApp', ['ngRoute', 'firebase']);

app.constant('IMAGE_SERVICE_URL', 'http://mst-image-service.herokuapp.com/upload');
app.constant('FIREBASE_REF', new Firebase('https://mst-cms.firebaseio.com/customtags'));
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
    .when('/post/:sha', {
      templateUrl: 'views/post.html',
      controller: 'PostCtrl'
    })
    .when('/post', {
      templateUrl: 'views/post.html',
      controller: 'PostCtrl'
    })
    .otherwise({
      redirectTo: '/auth'
    });
});

app.config(function ($httpProvider, $logProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $logProvider.debugEnabled(true);
});


