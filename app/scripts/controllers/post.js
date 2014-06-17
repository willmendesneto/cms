/* globals alert */
'use strict';

angular.module('cmsApp')
  .controller('PostCtrl', function ($scope, $rootScope, $routeParams, Post, _, DRAFT_URL, PUBLISH_URL, DateUtil) {

    function findPost(sha) {
      return $rootScope.posts.filter(function(post) {
        return post.sha === sha;
      }).shift(0);
    }

    function newPost(){
      return Post.makePost();
    }

    function contentPath(sha) {
      return 'https://api.github.com/repos/movimento-sem-terra/site-novo/git/blobs/'+sha;
    }

    var sha = $routeParams.sha;
    $scope.post = (sha) ? findPost(sha) : newPost();

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

    $scope.menuTag = undefined;
    $scope.section = undefined;
    $scope.label = undefined;
    $scope.tag = '';
    $scope.tagsPersonalizadas = [];

    $scope.imagesHD = undefined;

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

    function findLabelByValue(list, value) {
      var listLength = list.length;
      for (var index = 0; index < listLength; index++) {
        if (list[index].value === value) {
          return list[index];
        }
      }
    }

    function fillContent(post){
      $scope.menuTag = post.getMenuItem();
      $scope.section = findLabelByValue($scope.sectionOptions, post.getSection());
      $scope.label = findLabelByValue($scope.labelOptions, post.getLabel());
      $scope.imagesHD = post.getImagesHD();
      $scope.$apply();
    }

    if(sha){
      $rootScope.github.get(contentPath(sha)).done(function(data) {
        $scope.post.loadContentFromJekyllData(atob(data.content));
        fillContent($scope.post);
      });
    }else{
      $scope.post.create();
    }

    $scope.processTag = function(){
      if(!$scope.tag){
        return;
      }
      if(!_.contains($scope.tagsPersonalizadas, $scope.tag)){
        $scope.post.addNewTag($scope.tag);
        $scope.tagsPersonalizadas.push($scope.tag);
      }
      $scope.tag = '';
    };

    $scope.removeTag = function(index){
      var customTag = $scope.tagsPersonalizadas[index];
      $scope.post.deleteTag(customTag);
      $scope.tagsPersonalizadas.splice(index,1);
    };

    $scope.save = function(post, url) {
      $rootScope.github.put(url, {
        data: JSON.stringify(post.commitData())
      }).done(function() {
        alert('Post salvo com sucesso!');
      }).fail(function(data) {
        console.log('error data:', data);
      });
    };

    $scope.publish = function(post) {
      var url = PUBLISH_URL + $scope.prepareNameFile(post);
      $scope.save(post, url);
    };

    $scope.draft = function(post) {
      var url = DRAFT_URL + $scope.prepareNameFile(post);
      $scope.save(post, url);
    };

    $scope.prepareNameFile =  function(post){
      return prepareNameFile(post);
    };

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

  });
