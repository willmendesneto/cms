'use strict';

describe('Controller: DatePickerCtrl', function () {

  beforeEach(module('cmsApp'));

  var DatePickerCtrl, scope;

  beforeEach(inject(function ( $rootScope, $controller) {
    scope = $rootScope.$new();
    DatePickerCtrl = $controller('DatePickerCtrl', {
      $scope: scope
    });

  }));

  it('#updateDate should set post created attribute', function(){
    var post = {content:{ meta: {created: 0}}};
    scope.$broadcast('postLoaded', post);
    scope.selectedDate = new Date('June 14 2014 17:41:08 GMT-0300 (BRT)');
    scope.selectedTime = new Date('June 14 2014 6:41:08 GMT-0300 (BRT)');

    scope.updateDate();
    expect(post.content.meta.created).toBe(1402738860000);
  });

  it('should set selectedDate to the date of  post created value', function(){
    var post = {content:{ meta: {created: 1402738860000}}};
    scope.$broadcast('postLoaded', post);

    expect(scope.selectedDate.getTime()).toBe(1402738860000);
  });

  it('should set selectedTime to the date of  post created value', function(){
    var post = {content:{ meta: {created: 1402738860000}}};
    scope.$broadcast('postLoaded', post);

    expect(scope.selectedTime.getTime()).toBe(1402738860000);
  });

});
