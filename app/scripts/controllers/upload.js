'use strict';

angular.module('cmsApp')
  .controller('UploadCtrl', function (_, $scope, Image, $timeout, Alert) {

    $scope.images = [];

    $scope.$on('filesLoaded', function(event, args) {
      $scope.images = args;
    });

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

        Image.send(postedFiles)
        .success(function(data) {
          data.thumbnail = data.thumbnail || 'images/pdf_placeholder.jpg';

          $timeout(function(){
            $scope.images[index] = createImg(data);
            $scope.$emit('newFile', $scope.images);
          },0);
        }).error(function(error, status) {
          $timeout(function(){
            $scope.images = _.omit($scope.images, function(image){
              return image.thumbnail === undefined;
            });
          },0);

          Alert.add('danger',
                    'Ei, algo deu errado com a imagem.',
                    'Status: '+status+'\nErro: '+error);
        });
      }
    };

  });
