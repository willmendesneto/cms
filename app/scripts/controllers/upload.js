'use strict';

angular.module('cmsApp')
  .controller('UploadCtrl', function (_, $scope, Image, $timeout, Alert) {

    $scope.images = [];

    function createImg(data){
      return {
        link : data.link,
        thumbnail: data.thumbnail,
        title: data.title
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
            if (data.thumbnail === null){
              $scope.images[index] = {link: data.link, thumbnail: 'images/pdf_placeholder.jpg', title: data.title};
            }
            else {
              $scope.images[index] = createImg(data);
            }
            $scope.$emit('newFile', $scope.images);
          },0);
        }).error(function(error, status) {
          $timeout(function(){
            $scope.images = _.omit($scope.images, function(image){
              return image.thumbnail === undefined;
            });
          },0);

          Alert.add('danger','Ei, algo deu errado com a imagem.', 'Status: '+status+'\nErro: '+error);
        });
      }
    };

  });
