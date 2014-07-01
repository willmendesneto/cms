'use strict';

angular.module('cmsApp')
  .controller('PostCtrl', function ($scope, $rootScope, $routeParams, Post, _, DateUtil, $timeout, GitRepository, $modal) {
    var fileName = $routeParams.fileName;

    function newPost(){
      return Post.makePost();
    }

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
      var month = ('0' + (today.getMonth() + 1)).slice(-2);

      date = today.getFullYear() + '-' + month + '-' + today.getDate();
      fileName = post.content.meta.title.toLowerCase()
                        .replace(/[^\w\s]/gi, '')
                        .replace(/[ ]([a-zA-Z])/g, function (m, w) { return '-'+w; });

      return date+'-'+fileName+'.md';
    }

    function loadPostFromData(data){
      $scope.post = Post.makePost(data);
      $scope.post.loadContentFromJekyllData(atob(data.content));
      $scope.contentLoaded = true;

      $timeout(function(){
        $scope.menuTag = $scope.post.getMenuItem();
        $scope.section = findLabelByValue($scope.sectionOptions, $scope.post.getSection());
        $scope.label = findLabelByValue($scope.labelOptions, $scope.post.getLabel());
        $scope.imagesHD = $scope.post.getImagesHD();
      },0);
    }

    $scope.menuTagOptions = [
      'agricultura camponesa',
      'agronegócio',
      'direitos humanos',
      'educação, cultura e comunicação',
      'lutas e mobilizações',
      'solidariedade internacional',
      'meio ambiente',
      'projeto popular',
      'reforma agrária',
      'transgênicos'
    ];

    $scope.sectionOptions = [
      {label: 'Destaque', value: 'featured-news'},
      {label: 'Debate', value: 'debate'},
      {label: 'Capa', value: 'cover'},
      {label: 'MST TV', value: 'tv'}
    ];

    $scope.labelOptions = [
      {label: 'Artigo', value: 'articles'},
      {label: 'Entrevista', value: 'interviews'},
      {label: 'Reportagens Especiais', value: 'special-stories'}
    ];

    $scope.$watch('label', function (newval) {
      $scope.post.setLabel(newval);
    });

    $scope.$watch('menuTag', function (newval) {
      $scope.post.setMenuItem(newval);
    });

    $scope.$watch('section', function (newval) {
      $scope.post.setSection(newval);
    });

    $scope.$watch('imagesHD', function (newval) {
      $scope.post.setImagesHD(newval);
    });

    $scope.post = newPost();

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
              return '/_drafts/';
            }
          }
        });
      }
      else{
        $scope.post.create();
        $scope.contentLoaded = true;
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

    $scope.publish = function(post) {
      var url = GitRepository.getPublishedRepositoryAddress($scope.prepareNameFile(post));
      $scope.save(post, url);
    };

    $scope.draft = function(post) {
      var url = GitRepository.getDraftsRepositoryAddress($scope.prepareNameFile(post));
      $scope.save(post, url);
    };

    $scope.prepareNameFile =  function(post){
      return prepareNameFile(post);
    };

    $scope.postStatus = function(){
      var draftExpression = new RegExp('^https?://.*?/_drafts/?');
      var publishedExpression = new RegExp('^https?://.*?/_posts/?');
      /*jshint camelcase: false */
      if (typeof $scope.post.html_url === 'undefined') {
        return 'NOVO';
      }
      else if (draftExpression.exec($scope.post.html_url)) {
        return 'RASCUNHO';
      }
      else if (publishedExpression.exec($scope.post.html_url)) {
        return 'PUBLICADO';
      }

      return '';
    };

  });
