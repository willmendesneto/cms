/* globals alert */
'use strict';

app.controller('PostCtrl', function ($scope, $rootScope, $routeParams, Image) {

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
    $rootScope.github.put(filePath(post.name), {
      data: JSON.stringify(post.commitData())
    }).done(function() {
      alert('Post salvo com sucesso!');
    }).fail(function(data) {
      console.log('error data:', data);
    });
  };

  $scope.uploadImage = function() {
	  var postedFiles = document.getElementById('imgFile');
	  if (postedFiles.files.length > 0) {
		  var file = postedFiles.files[0];
		  Image.send(file);
		  window.alert(Image);
	  }
  };

  $scope.images = [
    {image : 'https://farm4.staticflickr.com/3911/14389454462_6e748234db_b.jpg', thumbnail : 'https://farm4.staticflickr.com/3911/14389454462_6e748234db_b.jpg', description : 'Test 1'},
    {image : 'https://farm4.staticflickr.com/3836/14168485908_5527ba07fc_b.jpg', thumbnail : 'https://farm4.staticflickr.com/3836/14168485908_5527ba07fc_b.jpg', description : 'Test 2'},
    {image : 'https://farm4.staticflickr.com/3911/14389454462_6e748234db_b.jpg', thumbnail : 'https://farm4.staticflickr.com/3911/14389454462_6e748234db_b.jpg', description : 'Test 3'},
  ];

  $scope.currentImage = $scope.images[0];

  $scope.setCurrentImage = function (image) {
	  $scope.currentImage = image;
  };

  function filePath(name) {
    return '/repos/movimento-sem-terra/site-novo/contents/_drafts/'+name;
  }
});
