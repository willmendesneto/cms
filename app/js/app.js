'use strict';

angular.module('cms', [
  'ngRoute',
  'cms.services',
  'cms.controllers',
  'oauth.io'
]).
config(['$routeProvider', 'OAuthProvider', function($routeProvider, OAuthProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
  $routeProvider.otherwise({redirectTo: '/login'});
  OAuthProvider.setPublicKey('nOLmdocECLWfvTKz_ftqQWWVgUc');

  OAuthProvider.setHandler('github', function (OAuthData, $rootScope) {
    $rootScope.oauthDataConnection = OAuthData.result;
    
    OAuthData.result.get('/user').done(function(data) {
      $rootScope.username = data.login;
      $rootScope.$apply();
    });

    OAuthData.result.get('/repos/movimento-sem-terra/site-novo/contents/_drafts').done(function(data) {
      $rootScope.posts = data;
      $rootScope.$apply();
    });
   });
}]);
