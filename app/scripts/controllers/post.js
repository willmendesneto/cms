/* globals alert */
'use strict';

app.controller('PostCtrl', function ($scope, $rootScope, $routeParams, Image, Post, _) {

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
	  for (var index = 0; index < list.length; index++) {
		  if (list[index].value === value) {
			  return list[index];
		  }
	  }
  }

  function fillContent(post){
    $scope.menuTag = post.getMenuItem();
    $scope.section = findLabelByValue($scope.sectionOptions, post.getSection());
    $scope.label = findLabelByValue($scope.labelOptions, post.getLabel());
    $scope.tag = post.tags;
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
    fillContent($scope.post);
  }
  $scope.processTag = function(){
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
		  Image.send(file, $scope.addImage);
	  }
  };

  $scope.images = [];

  $scope.currentImage = $scope.images[0];

  $scope.setCurrentImage = function (image) {
	  $scope.currentImage = image;
	  window.alert('Utilize CTRL+C/CMD+C para copiar o endereço da imagem.');
  };

  $scope.addImage = function (url) {
	  var image = {image : url, thumbnail: url, description: url};
	  $scope.images.push(image);
  };

  function filePath(name) {
    return '/repos/movimento-sem-terra/site-novo/contents/_drafts/'+name;
  }
});
