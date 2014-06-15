'use strict';

describe('Controller: UploadCtrl', function () {

  // load the controller's module
  beforeEach(module('cmsApp'));

  var UploadCtrl, Image, scope;

  describe('image upload', function(){

    beforeEach(inject(function ($rootScope, $controller, _Image_) {
      Image = _Image_;
      scope = $rootScope.$new();
      UploadCtrl = $controller('UploadCtrl', {$scope: scope});
    }));

    it('should add loading img before send image to upload', function(){
      spyOn(Image,'send').and.returnValue('aa');
      scope.file = {file:'file'};
      scope.uploadImage();

      expect(scope.images[0].image).toEqual('img/loading.gif');
    });

    it('should replace loading gif to true image after send to upload', function(){
      spyOn(Image,'send').and.returnValue('aa');
      scope.file = {file:'file'};
      var index = scope.uploadImage();

      scope.addImage(index, 'http://true_image.jpg');

      expect(scope.images[index].image).toEqual('http://true_image.jpg');
    });

  });
});
