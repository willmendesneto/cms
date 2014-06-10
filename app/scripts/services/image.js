'use strict';

app.factory('Image', function($http, $rootScope, IMAGE_SERVICE_URL, FormDataObject){
  var Image = {
    send: function(file) {
      /*jshint camelcase: false */
      var promise = '';
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
        console.log('success');
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
        promise = data;

      }).
      error(function(data,status,headers, config){
        console.log('error');
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
        promise = data;
      });
    }
  };

  return Image;
});

