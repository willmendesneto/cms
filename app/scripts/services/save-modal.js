'use strict';
angular.module('cmsApp').
  factory('SaveModal', function($modal){
    var SaveModal = {
      show: function(fileName, loadPostFromData, post){
        return $modal.open({
          templateUrl: 'views/savemodal.html',
          controller: 'SaveModalCtrl',
          backdrop: 'static',
          resolve: {
            post: function(){
              return post;
            },
            fileName: function(){
              return fileName;
            },
            loadPost: function(){
              return loadPostFromData;
            }
          }
        });
      }
    };

    return SaveModal;
  });
