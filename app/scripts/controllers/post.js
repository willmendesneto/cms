/* globals alert */
'use strict';

angular.module('cmsApp')
.controller('PostCtrl', function ($scope, $rootScope, $routeParams) {

  function findPost(sha) {
    return $rootScope.posts.filter(function(post) {
      return post.sha === sha;
    }).shift(0);
  }

  function contentPath(sha) {
    return 'https://api.github.com/repos/movimento-sem-terra/site-novo/git/blobs/'+sha;
  }

  var sha = $routeParams.sha;
  $scope.post = findPost(sha);

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

  $rootScope.github.get(contentPath(sha)).done(function(data) {
    $scope.post.loadContentFromJekyllData(atob(data.content));
    $scope.$apply();
  });

  $scope.save = function(post) {
    $scope.post.setImagesHD($scope.uploadImage());
    $rootScope.github.put(filePath(post.name), {
      data: JSON.stringify(post.commitData())
    }).done(function() {
      alert('Post salvo com sucesso!');
    }).fail(function(data) {
      console.log('error data:', data);
    });
  };

  $scope.uploadImage = function() {
    var xhr = new XMLHttpRequest();
    var form = new FormData();

    var postedFiles = document.getElementById('imgFile');
    if (postedFiles.files.length > 0) {
      var imgFile = postedFiles.files[0];
      form.append('myfile', imgFile);
      form.append('token',$rootScope.github.access_token);
      xhr.open('POST', 'http://mst-image-service.herokuapp.com/upload', false);
      xhr.send(form);
      return xhr.response;
    } else {
      return '';
    }
  };

  function filePath(name) {
    return '/repos/movimento-sem-terra/site-novo/contents/_drafts/'+name;
  }
});
