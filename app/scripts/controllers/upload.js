'use strict';

angular.module('cmsApp')
  .controller('UploadCtrl', function ($scope, Image, $timeout) {

    $scope.images = [];
    var loadingImage = 'images/loading.gif';

    function createImg(data){
      return {
        link : data.link,
        thumbnail: data.thumbnail
      };
    }

    $scope.setCurrentImage = function (image) {
      $scope.currentImage = image;
    };

    $scope.uploadImage = function() {
      var postedFiles = $scope.file;

      if (!!postedFiles) {
        var index = $scope.images.length;
        $scope.images[index] = createImg('');

        Image.send(postedFiles).success(function(data) {
          $timeout(function(){
            $scope.images[index] = createImg(data);
          },0);
        });
      }
    };

  });
