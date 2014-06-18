'use strict';

angular.module('cmsApp', [
  'ngRoute',
  'firebase',
  'config'
])

  .constant('IMAGE_SERVICE_URL', 'http://mst-image-service.herokuapp.com/upload')
  .constant('FIREBASE_REF', new Firebase('https://mst-cms.firebaseio.com/customtags'))
  .config(function ($routeProvider, $httpProvider, $logProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $logProvider.debugEnabled(true);

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
  })
  .run(['$rootScope', '$location', 'ENV', function ($rootScope, $location, ENV) {
    $rootScope.getDrafts = function(){
      if(!$rootScope.github){
        console.log('Github not defined.');
        return;
      }
      return $rootScope.githubGet('contents/_drafts');
    };

    $rootScope.getPost = function(sha){
      if(!$rootScope.github){
        console.log('Github not defined.');
        return;
      }
      return $rootScope.githubGet('git/blobs/'+sha);
    };

    $rootScope.githubGet = function(url) {
      return $rootScope.github.get($rootScope.getRepositoryAddress(url));
    };

    $rootScope.getRepositoryAddress = function(url) {
      return '/repos/'+ ENV.repository + url;
    };

    $rootScope.getDraftsRepositoryAddress = function(url) {
      return $rootScope.getRepositoryAddress('contents/_drafts/'+url);
    };

    $rootScope.getPublishedRepositoryAddress = function(url) {
      return $rootScope.getRepositoryAddress('contents/_posts/'+url);
    };

    $rootScope.$on('$locationChangeStart', function () {
      $rootScope.error = null;
      if (!$rootScope.github) {
        $location.path('/auth').replace();
        return false;
      }
    });
  }]);

