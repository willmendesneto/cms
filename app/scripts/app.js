'use strict';

angular.module('cmsApp', [
  'ngRoute',
  'config',
  'ngTagsInput',
  'ui.bootstrap.progressbar',
  'ui.bootstrap.tpls',
  'mgcrea.ngStrap.popover',
  'dcbImgFallback',
  'mgcrea.ngStrap.datepicker',
  'mgcrea.ngStrap.tooltip',
  'mgcrea.ngStrap.helpers.dateParser',
  'mgcrea.ngStrap.timepicker'
])

  .constant('IMAGE_SERVICE_URL', 'http://mst-image-service.herokuapp.com/upload')
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
  .run(['$rootScope', '$location', 'ENV', function ($rootScope, $location, ENV) {
    $rootScope.$on('$locationChangeStart', function () {
      $rootScope.error = null;
      if (!$rootScope.github) {
        $location.path('/auth').replace();
        return false;
      }
    });
    $rootScope.basepath = ENV.basepath;
  }]);

