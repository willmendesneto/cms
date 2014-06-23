'use strict';

angular.module('cmsApp')
  .controller('PostCtrl', function ($scope, $rootScope, $routeParams, Post, _, DateUtil, $timeout, GitRepository, $modal) {

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

    var fileName = $routeParams.fileName;
    $scope.post = newPost();
    if(fileName){
      GitRepository.getPost(fileName).done(function(data) {
        $scope.post = Post.makePost(data);
        $scope.post.loadContentFromJekyllData(atob(data.content));

        $timeout(function(){
          $scope.menuTag = $scope.post.getMenuItem();
          $scope.section = findLabelByValue($scope.sectionOptions, $scope.post.getSection());
          $scope.label = findLabelByValue($scope.labelOptions, $scope.post.getLabel());
          $scope.imagesHD = $scope.post.getImagesHD();
        },0);
      });
    }
    else{
      $scope.post.create();
    }

    $scope.save = function(post, url) {
      console.log($rootScope.github);
      $modal.open({
        templateUrl: 'myModalContent.html',
        controller: ModalInstanceCtrl,
        resolve: {
          url: url,
          data: JSON.stringify(post.commitData())
        }
      });
/*      $rootScope.github.put(url, {
        data: JSON.stringify(post.commitData())
      }).progress(function(){
        console.log('Teste');
      }).done(function() {
        window.alert('Post salvo com sucesso!');
      }).fail(function(data) {
        console.log('error data:', data);
      });
*/
    };

    var ModalInstanceCtrl = function ($rootScope, $scope, $modalInstance, url, data) {
      $rootScope.github.put(url, { data: data } )
        .sucess(function(){
        }).fail(function(data){
        });

      $scope.ok = function () {
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
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
