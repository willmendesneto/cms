'use strict';

angular.module('cmsApp')
  .controller('PostCtrl', function ($scope, $routeParams, Post, _, DateUtil, $timeout, $modal, Modal, PostViewOptions, GenerateFilename) {
    var fileName = $routeParams.fileName;

    function prepareNameFile(post){
      return GenerateFilename.create(post);
    }

    function loadPostFromData(data) {
      $scope.post = Post.makePost(data);
      $scope.post.loadContentFromJekyllData(atob(data.content));

      $scope.contentLoaded = true;

      $timeout(function(){
        $scope.$broadcast('postLoaded', $scope.post);
        $scope.menuTag = $scope.post.getMenuItem();
        $scope.section = $scope.post.getSectionLabel($scope.sectionOptions);
        $scope.label = $scope.post.getLabel($scope.labelOptions);
        $scope.imagesHD = $scope.post.getImagesHD();
      },0);

      $scope.$broadcast('filesLoaded', $scope.post.files);
    }

    $scope.updatePost = function (post, postForm) {
      if (postForm.$valid) {

        post.setSection($scope.section);
        post.setLabel($scope.label);
        post.setMenuItem($scope.menuTag);
        post.setImagesHD($scope.imagesHD);
        $scope.save(post);
      }
      postForm.$submitted = true;
    };

    $scope.$on('newFile', function(event, args) {
      $scope.post.files = args;
    });

    $scope.menuTagOptions = PostViewOptions.getMenuTagOptions();

    $scope.sectionOptions = PostViewOptions.getSectionOptions();

    $scope.labelOptions = PostViewOptions.getLabelOptions();

    $scope.init = function(){
      if(fileName){
        // $modal.open({
        //   templateUrl: 'views/loadingmodal.html',
        //   controller: 'LoadingModalCtrl',
        //   backdrop: 'static',
        //   resolve: {
        //     fileName: function(){
        //       return fileName;
        //     },
        //     loadPost: function(){
        //       return loadPostFromData;
        //     },
        //   }
        // });
        Modal.open('views/loadingmodal.html', 'LoadingModalCtrl', 'static', fileName, loadPostFromData);
      }
      else{
        $scope.post = Post.makePost();
        $scope.post.create();
        $scope.contentLoaded = true;

        $timeout(function(){
          $scope.$broadcast('postLoaded', $scope.post);
        });
      }
    };

    $scope.save = function(post) {
      $modal.open({
        templateUrl: 'views/savemodal.html',
        controller: 'SaveModalCtrl',
        backdrop: 'static',
        resolve: {
          post: function(){
            return post;
          },
          fileName: function(){
            return ($routeParams.fileName || prepareNameFile(post));
          },
          loadPost: function(){
            return loadPostFromData;
          }
        }
      });
    };

    $scope.prepareNameFile =  function(post){
      return prepareNameFile(post);
    };


    $scope.fileNameChaged = function(element)
    {
      $scope.$apply(function(){
        $scope.imagesHD = element.value;
      });
    };
  });
