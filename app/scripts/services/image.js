'use strict';

app.factory('Image', function($http, $rootScope, IMAGE_SERVICE_URL, FormDataObject){
  var Image = {
    send: function(file, image_index, success) {
      /*jshint camelcase: false */
      $http({
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
      }).success(function(data,status,headers, config){
        success(image_index,data);
      }).error(function(data,status,headers){
        console.log('error');
        console.log(data);
        console.log(status);
        console.log(headers);
      });
    }
  };

  return Image;
});

