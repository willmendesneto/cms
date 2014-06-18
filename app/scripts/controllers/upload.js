'use strict';

angular.module('cmsApp')
  .controller('UploadCtrl', function ($scope, Image) {

    $scope.uploadImage = function() {
      var postedFiles = $scope.file;
      var index = -1;

      if (!!postedFiles) {
        var file = postedFiles;
        index = ( $scope.images.push(createImg('images/loading.gif')) - 1);
        Image.send(file, index, $scope.addImage);
      }
      return index;
    };

    $scope.images = [];

    $scope.currentImage = $scope.images[0];

    $scope.setCurrentImage = function (image) {
      $scope.currentImage = image;
      window.alert('Utilize CTRL+C/CMD+C para copiar o endereço da imagem.');
    };

    $scope.addImage = function (index,url) {
      $scope.images[index] = createImg(url);
    };

    function createImg(url){
      return {
        image : url,
        thumbnail: url,
        description: url
      };
    }

  });
