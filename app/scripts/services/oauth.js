'use strict';

angular.module('cmsApp')
  .factory('oauth', function () {

    var OAuth = window.OAuth;
    OAuth.initialize('gRrK6us96AdRhG6vAGfQtbdUnY4');
    return OAuth;

  });
