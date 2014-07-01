'use strict';

angular.module('cmsApp')
  .controller('UploadCtrl', function (_, $scope, Image, $timeout) {

    $scope.images = [];

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
        }).error(function(data, status) {
          $timeout(function(){
            $scope.images = _.omit($scope.images, function(image){
              return image.thumbnail === undefined;
            });
          },0);
          window.alert('Sua imagem não pode ser enviada.\n\n' + 'Detalhes: data: ' + data + ' status: ' + status);
        });
      }
    };

  });
