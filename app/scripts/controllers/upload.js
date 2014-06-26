'use strict';

angular.module('cmsApp')
  .controller('UploadCtrl', function ($scope, Image, $timeout) {

    function createImg(url){
      return {
        image : url,
        thumbnail: url,
        description: url
      };
    }

    $scope.images = [];
    var loadingImage = createImg('images/loading.gif');

    $scope.setCurrentImage = function (image) {
      $scope.currentImage = image;
      window.alert('Utilize CTRL+C/CMD+C para copiar o endereço da imagem.');
    };

    $scope.uploadImage = function() {
      var postedFiles = $scope.file;

      if (!!postedFiles) {
        var index = $scope.images.length;
        $scope.images[index] = loadingImage;

        Image.send(postedFiles).success(function(data) {
          $timeout(function(){
            $scope.images[index] = createImg(data);
          });
        });
      }
    };

  });
