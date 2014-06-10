'use strict';

app.factory('Image', function($http, $rootScope, IMAGE_SERVICE_URL){
	var Image = {
		send: function(file) {
			var formData = new FormData();
			formData.append('myfile', file);
			/*jshint camelcase: false */
			formData.append('token',$rootScope.github.access_token);
			var promise = '';
			$http.post(IMAGE_SERVICE_URL, formData).success(function(data,status,headers, config){
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
