'use strict';

angular.module('cmsApp')
  .controller('PostCtrl', function ($scope, $routeParams, Post, _, DateUtil, $timeout, PostViewOptions, GenerateFilename, $location, GitRepository, $alert) {

    var fileName = $routeParams.fileName;

    function catchError(error){
      progressBarStatus(true,'danger');
      var message = 'Error: '+error.status+', '+error.statusText;
      var content = error.responseJSON.message;
      showError(message, content);
    }

    function showError(title, content){
      $alert({title: title,
             content: content,
             type: 'danger',
             show: true,
             dissmissable: false,
             container: '#alerts-container'});
    }

    function progressBarStatus(show, type){
      $timeout(function(){
        $scope.type = type;
        $scope.showProgress = show;
      },0);
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
      $scope.showProgress = false;
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
        progressBarStatus(true,'info');

        GitRepository.getPost(fileName).success(function(data){
          loadPostFromData(data);
          progressBarStatus(false);
        }).error(function(error){
          catchError(error);
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

    $scope.save = function(post) {
      var filename = $routeParams.fileName || GenerateFilename.create(post);

      progressBarStatus(true,'success');

      GitRepository.save(filename, JSON.stringify(post.commitData()))
      .success(function() {
        $timeout(function(){
          $location.path('/posts');
        },0);
      }).error(function(error) {
        catchError(error);
      });
    };
  });
