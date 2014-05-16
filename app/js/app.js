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
    console.log(OAuthData);
    OAuthData.result.get('/user').done(function(data) {
      $rootScope.username = data.login;
      $rootScope.oauthdata = data;
      $rootScope.$apply();
    });
   });
}]);
