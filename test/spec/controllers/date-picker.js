'use strict';

describe('Controller: DatePickerCtrl', function () {

  beforeEach(module('cmsApp'));

  var DatePickerCtrl, scope, timestampRuby, timestampJavaScript, DateUtil;

  beforeEach(inject(function ( $rootScope, $controller, _DateUtil_) {
    scope = $rootScope.$new();
    DateUtil = _DateUtil_;
    timestampJavaScript = 1402738860000;
    timestampRuby = timestampJavaScript/1000;

    DatePickerCtrl = $controller('DatePickerCtrl', {
      $scope: scope
    });

  }));

  it('#updateDate should set post created attribute', function(){
    var post = {metadata: {created: 0}};
    scope.$broadcast('postLoaded', post);
    scope.selectedDate = new Date('June 14 2014 17:41:08 GMT-0300 (BRT)');
    scope.selectedTime = new Date('June 14 2014 6:41:08 GMT-0300 (BRT)');

    spyOn(DateUtil,'getTimestamp').and.returnValue(timestampRuby);

    scope.updateDate();
    expect(post.metadata.created).toBe(timestampRuby);
  });

  describe('when post created is defined', function(){
    it('should set selectedDate to the date of  post created value', function(){
      var post = {metadata: {created: timestampRuby}};
      scope.$broadcast('postLoaded', post);

      expect(scope.selectedDate.getTime()).toBe(timestampJavaScript);
    });

    it('should set selectedTime to the date of  post created value', function(){
      var post = {metadata: {created: timestampRuby}};
      scope.$broadcast('postLoaded', post);

      expect(scope.selectedTime.getTime()).toBe(timestampJavaScript);
    });
  });

});
