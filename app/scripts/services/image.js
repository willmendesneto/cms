'use strict';

angular.module('cmsApp')
  .factory('Image', function($http, $rootScope, IMAGE_SERVICE_URL, FormDataObject){
    var Image = {
      send: function(file) {
        /*jshint camelcase: false */
        return $http({
          url: IMAGE_SERVICE_URL,
          method: 'POST',
          transformRequest: FormDataObject,
          headers: {
            'Content-Type': undefined
          },
          data : {
            'token': $rootScope.github.access_token,
            'myfile': file
          }
        });
      }
    };

    return Image;
  });

