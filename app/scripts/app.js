'use strict';

angular.module('cmsApp', [
  'ngRoute',
  'firebase'
])

  .constant('IMAGE_SERVICE_URL', 'http://mst-image-service.herokuapp.com/upload')
  .constant('FIREBASE_REF', new Firebase('https://mst-cms.firebaseio.com/customtags'))
  .constant('DRAFT_URL', '/repos/movimento-sem-terra/site-novo/contents/_drafts/')
  .constant('PUBLISH_URL', '/repos/movimento-sem-terra/site-novo/contents/_posts/')

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
  .run(['$rootScope', '$location', function ($rootScope, $location) {
    $rootScope.getDrafts = function(){
      if(!$rootScope.github){
        console.log('Github not defined.');
        return;
      }
      return $rootScope.github.get('/repos/movimento-sem-terra/site-novo/contents/_drafts');
    };

    $rootScope.getPost = function(sha){
      if(!$rootScope.github){
        console.log('Github not defined.');
        return;
      }
      return $rootScope.github.get('/repos/movimento-sem-terra/site-novo/git/blobs/'+sha);
    };

    $rootScope.$on('$locationChangeStart', function () {
      $rootScope.error = null;
      if (!$rootScope.github) {
        $location.path('/auth').replace();
        return false;
      }
    });
  }]);

