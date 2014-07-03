'use strict'

angular.module('cmsApp')
  .factory('GithubClient',['$rootScope', '$location', 'ENV', function($rootScope, $location, ENV){

  	var base_url = 'https://api.github.com/';
	var xmlhttp = new XMLHttpRequest();

  	var GithubClient = {
	  	get: function(path, callback, access_token) {
	  		xmlhttp.onload = callback;
		    xmlhttp.open("GET", base_url + path + "?access_token=" + access_token,true);
		    xmlhttp.send();
	  	}
  	};

  	return GithubClient;
  }
]);