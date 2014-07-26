'use strict';

describe('Directive: cmsMaxlength', function () {

  // load the directive's module
  beforeEach(module('cmsApp'));

  var element,
    form,
    scope;

  beforeEach(inject(function ($rootScope, $compile) {
    element = angular.element('<form name="form">' +
              '<input type="text" name="title" ng-model="model.title" cms-maxlength="10" required />' +
            '</form>');
    scope = $rootScope;
    scope.model = {
      title: null
    };
    $compile(element)(scope);
    scope.$digest();
    form = scope.form;
  }));

  it('When field is valid', function(){
    var mockValue = 'Test';
    form.title.$setViewValue(mockValue);
    expect(form.title.$valid).toBe(true);
    expect(scope.model.title).toEqual(mockValue);
  });

  it('When field is invalid', function(){
    var mockValue = 'This is another test';
    form.title.$setViewValue(mockValue);
    expect(form.title.$valid).toBe(false);
    expect(scope.model.title).toEqual(mockValue);
  });

});
