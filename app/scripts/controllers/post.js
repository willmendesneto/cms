'use strict';

angular.module('cmsApp')
  .controller('PostCtrl', function ($scope, $routeParams, PostModel, _, DateUtil, $timeout, PostViewOptions,
                                    ProgressBarUtil,
                                    GenerateFilename, $location, GitRepository) {

    var fileName = $routeParams.fileName;
    var postYear = $routeParams.year;
    var postMonth = $routeParams.month;

    $scope.progressbar = new ProgressBarUtil($scope);

    function loadPostFromData(data) {
      $scope.post = PostModel.create(data);
      $scope.$broadcast('filesLoaded', $scope.post.metadata.files);

      $scope.progressbar.close();
    }

    $scope.updatePost = function (post, postForm) {
      if (postForm.$valid) {
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
        $scope.progressbar.show();

        GitRepository.getPost(postYear, postMonth, fileName).success(function(data){
          loadPostFromData(data);
          $scope.progressbar.close();
        }).error(function(error){
          $scope.progressbar.error(error);
        });
      }
      else{
        $scope.post = PostModel.create();
      }
    };

    $scope.save = function(post) {
      var filename = $routeParams.fileName || GenerateFilename.create(post);

      $scope.progressbar.success();

      GitRepository.save(filename, JSON.stringify(post.toCommit()))
      .success(function() {
        $timeout(function(){
          $location.path('/posts');
        },0);
      }).error(function(error) {
        $scope.progressbar.error(error);
      });
    };
  });
