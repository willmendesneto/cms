'use strict';
angular.module('cmsApp').
  factory('LoadModal', function($modal){
    var LoadModal = {
      show: function(fileName, loadPostFromData){
        return $modal.open({
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
          }
        });
      }
    };

    return LoadModal;
  });
