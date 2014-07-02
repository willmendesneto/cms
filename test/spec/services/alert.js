'use strict';

describe('Service: Alert', function () {

  // load the service's module
  beforeEach(module('cmsApp'));

  // instantiate service
  var Alertservice;
  beforeEach(inject(function (_Alert_) {
    Alertservice = _Alert_;
  }));

  it('should do something', function () {
    expect(!!Alertservice).toBe(true);
  });

});
