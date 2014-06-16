'use strict';

angular.module('cmsApp')
  .factory('oauth', function () {

    var OAuth = window.OAuth;
    OAuth.initialize('S2shWzj2Cp87Mg4estazc6DFGQc');
    return OAuth;

  });
