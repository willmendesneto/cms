'use strict';

angular.module('cmsApp')
  .controller('PostCtrl', function ($scope, $routeParams, Post, _, DateUtil, $timeout, GitRepository, $modal, PostViewOptions) {
    var fileName = $routeParams.fileName;

    function findLabelByValue(list, value) {
      var listLength = list.length;
      for (var index = 0; index < listLength; index++) {
        if (list[index].value === value) {
          return list[index];
        }
      }
    }

    function prepareNameFile(post){
      if(!!post.name){
        return post.name;
      }
      var fileName, date = '';
      var today = DateUtil.getTime();
      var day = ('0' + (today.getDate())).slice(-2);
      var month = ('0' + (today.getMonth() + 1)).slice(-2);

      date = today.getFullYear() + '-' + month + '-' + day;
      fileName = post.content.meta.title.toLowerCase()
                        .replace(/[^\w\s]/gi, '')
                        .replace(/[ ]([a-zA-Z])/g, function (m, w) { return '-'+w; });

      return date+'-'+fileName+'.md';
    }

    function loadPostFromData(data) {
      $scope.post = Post.makePost(data);
      $scope.post.loadContentFromJekyllData(atob(data.content));

      $scope.contentLoaded = true;

      $timeout(function(){
        $scope.$broadcast('postLoaded', $scope.post);
        $scope.menuTag = $scope.post.getMenuItem();
        $scope.section = findLabelByValue($scope.sectionOptions, $scope.post.getSection());
        $scope.label = findLabelByValue($scope.labelOptions, $scope.post.getLabel());
        $scope.imagesHD = $scope.post.getImagesHD();
      },0);

      $scope.$broadcast('filesLoaded', $scope.post.files);
    }

    $scope.updatePost = function (post, postForm) {
      if (postForm.$valid) {

        var url = GitRepository.getPublishedRepositoryAddress($scope.prepareNameFile(post));
        post.setSection($scope.section);
        post.setLabel($scope.label);
        post.setMenuItem($scope.menuTag);
        post.setImagesHD($scope.imagesHD);
        $scope.save(post, url);
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
        $modal.open({
          templateUrl: 'views/loadingmodal.html',
          controller: 'LoadingModalCtrl',
          backdrop: 'static',
          resolve: {
            fileName: function(){
              return fileName;
            },
            loadPost: function(){
              return loadPostFromData;
            },
            url: function(){
              return '/_posts/';
            }
          }
        });
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

    $scope.save = function(post, url) {
      $modal.open({
        templateUrl: 'views/savemodal.html',
        controller: 'SaveModalCtrl',
        backdrop: 'static',
        resolve: {
          url: function(){
            return url;
          },
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

    $scope.draft = function(post) {
      var url = GitRepository.getDraftsRepositoryAddress($scope.prepareNameFile(post));
      $scope.save(post, url);
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
