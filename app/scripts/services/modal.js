'use strict';

angular.module('cmsApp')
  .service('Modal',['$modal', function($modal) {

    var modalService = {
      open: function (templateUrl, controller, backdrop, filename, loadPost){

        $modal.open({
          templateUrl: templateUrl,
          controller: controller,
          backdrop: backdrop,
          resolve: {
            fileName: function(){
              return filename;
            },
            loadPost: function(){
              return loadPost;
            },
          }
        });

      }
    };

    return modalService;

  }]);
