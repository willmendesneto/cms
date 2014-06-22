'use strict';

angular.module('cmsApp', [
  'ngRoute',
  'firebase',
  'config',
  'monospaced.elastic',
  'ngTagsInput'
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
      .when('/post/:fileName', {
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
  .run(['$rootScope', '$location', function ($rootScope, $location) {
    $rootScope.$on('$locationChangeStart', function () {
      $rootScope.error = null;
      if (!$rootScope.github) {
        $location.path('/auth').replace();
        return false;
      }
    });
  }]);

