/* globals alert */
'use strict';

app.controller('UploadCtrl', function ($scope, Image) {

  $scope.uploadImage = function() {
	  var postedFiles = $scope.file;

	  if (!!postedFiles) {
		  var file = postedFiles;
		  Image.send(file, $scope.addImage);
	  }
  };

  $scope.images = [];

  $scope.currentImage = $scope.images[0];

  $scope.setCurrentImage = function (image) {
	  $scope.currentImage = image;
	  window.alert('Utilize CTRL+C/CMD+C para copiar o endereço da imagem.');
  };

  $scope.addImage = function (url) {
	  var image = {image : url, thumbnail: url, description: url};
	  $scope.images.push(image);
  };

});
